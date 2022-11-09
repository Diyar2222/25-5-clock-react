import React, {useState,useEffect } from "react"
import Arrow from "react-arrow"
import padStart from "./getPadTime"
function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25*60)
  const [isCounting, setIsCounting] = useState(false)
  const [timerName, setTimerName] = useState(true)
  const minutes = padStart(Math.floor(timeLeft/60))
  const seconds = padStart(Math.floor(timeLeft-minutes*60))

  useEffect(() => {
    const interval = setInterval(() => {
        isCounting && setTimeLeft((time) => time-1)
    },1000)
    return ()=> {clearInterval(interval)}
  },[isCounting])

  useEffect(()=>{
    if(timeLeft===0){
      if(!timerName){
        setTimeLeft(sessionLength*60)
        setTimerName(true)
      } else {
        setTimeLeft(breakLength*60)
        setTimerName(false)
      }
      playSound()
    }
  },[timeLeft])

  useEffect(()=>{
    if(isCounting===false){
      setTimeLeft(sessionLength*60)
    }
  },[sessionLength])

  function decreaseBreak(){
    if(breakLength > 1){
      setBreakLength(prev => prev-1)
    } else {
      setBreakLength(1)
    }
  }

  function decreaseSession(){
    if(sessionLength >1){
      setSessionLength(prev => prev-1)
    } else {
      setSessionLength(1)
    }
  }
  function increaseBreak(){
    if(breakLength <60){
      setBreakLength(prev => prev+1)
    } else {
      setBreakLength(60)
    }
  }
  function increaseSession(){
    if(sessionLength <60){
      setSessionLength(prev => prev+1)
    } else {
      setSessionLength(60)
    }
  }
  function handleStart(){
    setIsCounting(prev => !prev)
  }
  function handleReset(){
    setIsCounting(false)
    setTimeLeft(25*60)
    setSessionLength(25)
    setBreakLength(5)
  }
  function playSound(){
    const audio = document.getElementById("beep")
    audio.play()
  }
  return (
    <div className="body">
      <div style={{marginTop:"150px", fontSize:"45px"}}>25 + 5 Clock</div>
      <div className="break-session-container">
        <div className="break-container">
          <div id="break-label">Break Length</div>
          <div className="break-buttons">
            <Arrow
            id="break-decrement"
            style={{marginRight:"15px", cursor:"pointer"}}
            direction = "down"
            shaftWidth={10}
            shaftLength={15}
            headWidth={25}
            headLength={10}
            fill="white"
            strokeWidth={2}
            onClick={decreaseBreak}
            />
            <div id="break-length">{breakLength}</div>
            <Arrow
            id="break-increment"
            style={{marginLeft:"15px", cursor:"pointer"}}
            direction = "up"
            shaftWidth={10}
            shaftLength={15}
            headWidth={25}
            headLength={10}
            fill="white"
            strokeWidth={2}
            onClick={increaseBreak}
            />
          </div>
        </div>
        <div className="session-container">
          <div id="session-label">Session Length</div>
          <div className="session-buttons">
          <Arrow
            id="session-decrement"
            style={{marginRight:"15px", cursor:"pointer"}}
            direction = "down"
            shaftWidth={10}
            shaftLength={15}
            headWidth={25}
            headLength={10}
            fill="white"
            strokeWidth={2}
            onClick={decreaseSession}
            />
            <div id="session-length">{sessionLength}</div>
            <Arrow
            id="session-increment"
            style={{marginLeft:"15px", cursor:"pointer"}}
            direction = "up"
            shaftWidth={10}
            shaftLength={15}
            headWidth={25}
            headLength={10}
            fill="white"
            strokeWidth={2}
            onClick={increaseSession}
            />
          </div>
        </div>
      </div>
      <div className="timer-container">
        <div id="timer-label">{timerName ? "Session" : "Break"}</div>
        <div id="time-left" className="timer">{minutes}:{seconds}</div>
      </div>
      <div className="start-restart-container">
        <div onClick={handleStart} id="start_stop" className="start-stop">Start/Stop</div>
        <div onClick={handleReset} id="reset" className="restart">Restart</div>
        <div onClick={playSound}><audio src="http://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3" id="beep"></audio></div>
       
      </div>
    </div>
  );
}

export default App;
