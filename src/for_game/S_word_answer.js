import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';

function S_words() {
    let [show, setShow] = useState([ '제시어1', '제시어2', '제시어3', '제시어4', '제시어5', '제시어6', '제시어7', '제시어8', '제시어9', '제시어10']);
    let [storyteller, setStoryteller] = useState([true, false, false, false, false, false])
    let [storytellerIDX, setStorytellerIDX] = useState(0);
    let [show_name, setShow_name] = useState('게임을 시작하겠습니다.');
    const [answer, setAnswer] = useState('');
    let [correct, setCorrect] = useState(['정답입니다.', '틀렸습니다.']);

    useEffect(() => {
    let timer;
        timer = setTimeout(() => {
            setShow_name(show[0]);
        }, 2000)
        return ()=>{clearTimeout(timer)};
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setInputVisible(true);
        }, 2000);
    }, []);


    // Add a state variable to control the visibility of the input and button elements
    const [inputVisible, setInputVisible] = useState(false);
    const [showIndex, setShowIndex] = useState(0);

    const nextShow = ()=>{
        setShowIndex(showIndex +1);
        setShow_name(show[showIndex+1]);
    }

    return (
        <>
            {storyteller[storytellerIDX] === true ? <div>{show_name}</div> : null}
            {inputVisible && (
                <>
                    <input onChange={(e) => { setAnswer(e.target.value) }} />
                    <Button type="submit" onClick={() => {
                        if (show_name === answer){
                            setCorrect(0);
                            if (showIndex < show.length -1){
                                nextShow();
                            }
                        } else{
                            setCorrect(1);
                        }
                    }}>제출</Button>
                </>
            )}
            {correct == 0 ?
                 <div> 정답입니다. </div> :
                correct == 1 ? <div> 틀렸습니다. </div> : null}
        </>
    );
}

export default S_words;