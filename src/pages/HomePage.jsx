import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { speechToText, getGptResponse } from "../hooks/api";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(""); // 상태 추가

  const handleButtonClick = (type) => {
    if (type === "word") {
      navigate("/word");navigate("/word", { state: { searchText } }); // 입력 내용 전달
    } else if (!user) {
      navigate("/login");
    } else {
      navigate(`/${type}`);
    }
  };

  // const handleAudioCatured = async (audioBlob) => {
  //   try {
  //     //1. stt
  //     const speechText = await speechToText(audioBlob);
  //     setWord(speechText);
  //     //2. gpt
  //     handlechatGpt(speechText);
  //     setInput_type(2);
  //   } catch (error) {
  //     console.log("오류 발생:", error);
  //   }
  // };

  // const handlechatGpt = async (word) => {
  //   try {
  //     // gpt
  //     const gptResponse = await getGptResponse(word);
  //     setDes(gptResponse);
  //     setC_id(null);
  //     setMemo("");
  //   } catch (error) {
  //     console.log("chatGpt 오류 발생", error);
  //   }
  // };

  return (
    <div className="homepage-container">
      <input type="text" placeholder="Search..." className="search-box" 
      value={searchText} // 상태와 연결
      onChange={(e) => setSearchText(e.target.value)} // 상태 업데이트
      />
      {/* <Grid size={1}>
        <AudioRecorder onAudioCaptured={handleAudioCatured}></AudioRecorder>
      </Grid>
      <Grid size={3}>
        <Stack spacing={2} direction="row">
          <Button
            onClick={(e) => {
              handlechatGpt(word);
            }}
            variant="contained"
            sx={{ width: "150px" }} //backgroundColor: "primary.main"
          >
            chatGpt 조회
          </Button>
          </Stack>
      </Grid> */}
      <div className="button-group">
        <button onClick={() => handleButtonClick("word")}>말입력</button>
        <button onClick={() => handleButtonClick("challenge")}>암기</button>
        <button onClick={() => handleButtonClick("dictionary")}>사전</button>
      </div>
    </div>
  );
};

export default HomePage;
