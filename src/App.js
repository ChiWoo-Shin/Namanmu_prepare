import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
import Main_timer from "./for_game/main_timer"; // Timer

import S_words from "./for_game/S_word_answer"; //About Answers(textbox, button etc)

//Item list
import ItemOneBlur from "./item_info/Item_1_blur";
import ItemTwoDecal from "./item_info/Item_2_decalco";
import ItemThreeCut from "./item_info/Item_3_4cut";

const getWebcam = (callBack) => {
  try {
    const constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(callBack);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

function App() {
  const [playing, setPlaying] = useState(undefined);
  const canvasRef = useRef(null);

  const [timer, setTimer] = useState(undefined);

  const videoRef = useRef(null);

  const [target, setTarget] = useState(null);
  let state = useSelector((state) => {
    return state;
  });
  console.log(state.S_words_Q);
  let dispatch = useDispatch();
  let [i, setI] = useState(0);

  useEffect(() => {
    // Set the srcObject of the video element when the videoRef is updated
    if (videoRef.current) {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
        // videoRef.current.style.transform = "scaleX(-1)";
      });
      startOrStop_2();
    }
  }, [videoRef]);

  const drawToCanvas = () => {
    try {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      if (ctx && ctx !== null) {
        if (videoRef.current) {
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startOrStop_2 = () => {
    if (!timer) {
      const t = setInterval(() => drawToCanvas(), 0);
      setTimer(t);
    } else {
      setTimer(undefined);
    }
  };

  const renderCam = () => {
    const clearElement = () => {
      document.getElementById("my-element").innerHTML = "";
    };
    ReactDOM.render(
      <ItemOneBlur className="Video_myturn" videoRef={videoRef} />,
      document.getElementById("main_screen")
    );
  };

  const renderCam2 = () => {
    const clearElement = () => {
      document.getElementById("my-element").innerHTML = "";
    };
    ReactDOM.render(
      <ItemTwoDecal className="Video_myturn" videoRef={videoRef} />,
      document.getElementById("main_screen")
    );
  };
  const renderCam3 = () => {
    const clearElement = () => {
      document.getElementById("my-element").innerHTML = "";
    };
    ReactDOM.render(
      <ItemThreeCut className="Video_myturn" videoRef={videoRef} />,
      document.getElementById("main_screen")
    );
  };
  const renderCam4 = () => {
    const clearElement = () => {
      document.getElementById("my-element").innerHTML = "";
    };
    ReactDOM.render(
      <canvas ref={canvasRef} autoPlay className="Video_myturn" />,
      document.getElementById("main_screen")
    );
  };
  return (
    <div className="wide-frame">
      {/* A팀 프레임 */}
      <div className="a-screen">
        <div className="score_box">
          <div className="box">
            <div className="Score" id="A_currentScore">
              현재 라운드 점수
            </div>
          </div>
          <div className="box">
            <div className="Score" id="A_totalScore">
              총 점수
            </div>
          </div>
        </div>
        <div className="video_box">
          <div id="1" className="video_frame">
            <video ref={videoRef} autoPlay className="Video_myturn" />
          </div>
        </div>
        <div id="2" className="video_box">
          <div className="video_frame"></div>
        </div>
        <div id="3" className="video_box">
          <div className="video_frame">
            {/* <ItemOneBlur className="Video_myturn" videoRef={videoRef} />{" "} */}
          </div>
        </div>
      </div>

      {/* 중앙 freame */}
      <div className="mid-screen">
        <div className="team_box">
          <div className="team_turn">
            <h1>
              {/* <center>  */}
              <Main_timer />
              {/* </center> */}
            </h1>
          </div>
        </div>
        <div className="main_video_box">
          <div className="main_video_frame" id="main_screen">
            <canvas ref={canvasRef} autoPlay className="Video_myturn" />
          </div>
        </div>
        <div>
          <div className="team_box">
            <div className="team_turn">
              <Button onClick={renderCam4}>원본</Button>
              <Button onClick={renderCam}>blur</Button>
              <Button onClick={renderCam2}>좌좌우우</Button>
              <Button onClick={renderCam3}>퍼즐(4)</Button>
            </div>
          </div>
          {/* {state.S_words_Q[i]} */}
          <div>
            <S_words />
          </div>
        </div>
      </div>
      {/* B팀 프레임 */}
      <div className="b-screen">
        <div className="box">
          <div className="Score" id="A_currentScore">
            현재 라운드 점수
          </div>
        </div>
        <div className="box">
          <div className="Score" id="A_totalScore">
            총 점수
          </div>
        </div>
        <div id="4" className="video_box">
          <div className="video_frame"></div>
        </div>
        <div id="5" className="video_box">
          <div className="video_frame">
            {/* <ItemThreeCut className="Video_myturn" videoRef={videoRef} /> */}
          </div>
        </div>
        <div id="6" className="video_box">
          <div className="video_frame"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
