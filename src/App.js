import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import ReactDOM from "react-dom";
import { Button } from "react-bootstrap";
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

function TestOverlay() {
  const [playing, setPlaying] = useState(undefined);
  const canvasRef = useRef(null); // 상하 반전

  const [timer, setTimer] = useState(undefined);

  const videoRef = useRef(null); // 좌우 반전

  const canvasRef_2 = useRef(null); // 상하 반전

  useEffect(() => {
    // Set the srcObject of the video element when the videoRef is updated
    if (videoRef.current) {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
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

  const drawToCanvas_2 = () => {
    try {
      const ctx = canvasRef_2.current.getContext("2d");
      canvasRef_2.current.width = videoRef.current.videoWidth;
      canvasRef_2.current.height = videoRef.current.videoHeight;
      let a = parseInt(canvasRef_2.current.width);
      let b = parseInt(canvasRef_2.current.height);

      if (ctx && ctx !== null) {
        if (videoRef.current) {
          ctx.translate(canvasRef_2.current.width, 0); // translate(x축, y축) < -- 축정보가 들어감 (시작지점 x)
          ctx.rotate((Math.PI / 180) * 180); // 축을 기점으로 얼마나 회전시키는 것인지에 대한 정보
          ctx.translate(a, -b);
          ctx.scale(-1, 1); // 축을 기점으로 pixel의 크기를 최소 -1배에서 최대 1배까지 사용가능 --> -1배를 하면 화면이 축을 기준으로 반전됨
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef_2.current.width,
            canvasRef_2.current.height
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
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
          <div className="video_frame">
            <video ref={videoRef} autoPlay className="Video_myturn" />
          </div>
        </div>
        <div className="video_box">
          <div className="video_frame"></div>
        </div>
        <div className="video_box">
          <div className="video_frame">
            {/* <ItemOneBlur className="Video_myturn" videoRef={videoRef} />{" "} */}
          </div>
        </div>
      </div>

      {/* 중앙 freame */}
      <div className="mid-screen">
        <div className="team_box">
          <div className="team_turn"></div>
        </div>
        <div className="main_video_box">
          <div className="main_video_frame" id="main_screen">
            <ItemOneBlur className="Video_myturn" videoRef={videoRef} />
          </div>
        </div>
        <div>
          <div className="team_box">
            <div className="team_turn">
              <button onClick={() => startOrStop()}>
                {playing ? "Stop" : "Start"}
              </button>
              <Button onClick={renderCam}>blur</Button>
              <Button onClick={renderCam2}>좌좌우우</Button>
              <Button onClick={renderCam3}>퍼즐(4)</Button>
            </div>
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
        <div className="video_box">
          <div className="video_frame"></div>
        </div>
        <div className="video_box">
          <div className="video_frame">
            {/* <ItemThreeCut className="Video_myturn" videoRef={videoRef} /> */}
          </div>
        </div>
        <div className="video_box">
          <div className="video_frame"></div>
        </div>
      </div>
    </div>
  );
}

export default TestOverlay;
