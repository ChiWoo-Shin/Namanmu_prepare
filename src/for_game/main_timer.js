import React, { useEffect, useState, useRef } from "react";

function Main_timer() {
  // const [min, setMin] = useState(3);
  const [sec, setSec] = useState(6000);
  const [msec, setMsec] = useState(0);
  const time = useRef(6000);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setSec(parseInt(time.current / 100));
      if ((time.current % 60).toString().length === 1) {
        setMsec("0" + (time.current % 60).toString());
      } else {
        setMsec(time.current % 60);
      }
      time.current -= 1;
    }, 10);

    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (time.current < 0) {
      console.log(" Time over ");
      clearInterval(timer.current);
    }
  }, [msec]);
  return (
    <center>
      Timer : {sec}.{msec}
    </center>
  );
}

export default Main_timer;
