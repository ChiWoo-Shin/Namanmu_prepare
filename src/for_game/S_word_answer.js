import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import useSound from "use-sound";

import good_sound from "../audio/good.mp3";
import bad_sound from "../audio/bad.mp3";
var contentlist = [
  "공룡",
  "용가리",
  "몰?루?",
  "핀토스",
  "무한도전",
  "그것이알고싶다",
  "토토가",
  "나는가수다",
  " 제시어9",
  "제시어10",
];

function S_words() {
  let [show, setShow] = useState(contentlist);
  let [storyteller, setStoryteller] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);
  let [storytellerIDX, setStorytellerIDX] = useState(0);
  let [show_name, setShow_name] = useState("게임을 시작하겠습니다.");
  const [answer, setAnswer] = useState("");
  let [correct, setCorrect] = useState("2");
  let [passCount, setPassCount] = useState("2");
  let [correct_cnt, setCorrect_cnt] = useState(0);

  const [good] = useSound(good_sound);
  const [bad] = useSound(bad_sound);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setShow_name(show[0]);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setInputVisible(true);
    }, 2000);
  }, []);

  // Add a state variable to control the visibility of the input and button elements
  const [inputVisible, setInputVisible] = useState(false);
  const [showIndex, setShowIndex] = useState(0);

  const nextShow = () => {
    setShowIndex(showIndex + 1);
    setShow_name(show[showIndex + 1]);
  };

  const onReset = (e) => {
    setAnswer("");
  };

  const good_audio = () => {
    good();
    console.log("소리 나오니?");
  };
  const bad_audio = () => {
    bad();
    console.log("소리 나오니?");
  };

  const checkAnser = (e) => {
    if (show_name === answer) {
      good();
      setCorrect(0);
      setCorrect_cnt(correct_cnt + 1);
      onReset(e);
      if (showIndex < show.length - 1) {
        nextShow();
      }
    } else {
      bad();
      setCorrect(1);
      onReset(e);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      checkAnser();
    }
  };

  return (
    <>
      {storyteller[storytellerIDX] === true ? <div>{show_name}</div> : null}
      {inputVisible && (
        <>
          <input
            id="Answer_input"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyPress(e);
            }}
          />
          <Button
            id="Answer_Sibmit"
            type="submit"
            onClick={(e) => {
              checkAnser(e);
            }}
          >
            제출
          </Button>
          <Button
            id="passButton"
            onClick={() => {
              if (showIndex < show.length - 1 && passCount !== 0) {
                nextShow();
                setPassCount(passCount - 1);
              }
            }}
          >
            Pass({passCount})
          </Button>
          <div>{correct_cnt}</div>
        </>
      )}
    </>
  );
}

export default S_words;
