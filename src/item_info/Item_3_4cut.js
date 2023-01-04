
// 4분할 해서 순서 섞기
import React, { useEffect, useState, useRef } from 'react';
import "./Item.css";


const ItemThreeCut = ({videoRef, canvasRef}) => {
  const [videoSrc, setVideoSrc] = useState();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }).catch(error => {
      console.error('Error accessing webcam:', error);
    });
  }, []);

  useEffect(() => {
    videoRef.current.addEventListener('play', () => {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      function drawFrame() {
        if (!videoRef.current.paused && !videoRef.current.ended) { 
          const ctx = canvasRef.current.getContext('2d');
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1,1);
          ctx.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, 0, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2);
          ctx.drawImage(videoRef.current, videoRef.current.videoWidth / 2, 0, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, 0, 0, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2);
          ctx.drawImage(videoRef.current, 0, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2);
          ctx.drawImage(videoRef.current, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2, videoRef.current.videoWidth / 2, 0, videoRef.current.videoWidth / 2, videoRef.current.videoHeight / 2);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          console.log("세번째 아이템 작동합니다.")
          setTimeout(drawFrame, 50);
        }
      }
      drawFrame();
    });
    if (videoRef.current.style.display === 'none') {
      videoRef.current.play();
    }
  }, [videoRef]);

  return (
    <div>
      <video style={{ display: 'none' }} autoPlay ref={videoRef} src={videoSrc} />
      <canvas style={{ display: 'block' }} ref={canvasRef} className="Video_myturn"/>
    </div>
  );
};

export default ItemThreeCut;