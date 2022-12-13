import React, {useState,useEffect } from "react"
import {HiArrowSmDown, HiArrowSmUp} from 'react-icons/hi'
import padStart from "./getPadTime"
function App() {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, setTimeLeft] = useState(25*60)
  const [isCounting, setIsCounting] = useState(false)
  const [timerName, setTimerName] = useState(true)
  const minutes = getPadTime(Math.floor(timeLeft/60))
  const seconds = getPadTime(Math.floor(timeLeft-minutes*60))

  function getPadTime(time) {
    return (
      time.toString().padStart(2,"0")
    )
  }
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
          <HiArrowSmDown className="arrow" id="break-decrement"
          onClick={decreaseBreak}
          style={{marginRight:"15px", cursor:"pointer"}}/>
            <div id="break-length">{breakLength}</div>
            <HiArrowSmUp className="arrow" onClick={increaseBreak} 
            id="break-increment"
            style={{marginLeft:"15px", cursor:"pointer"}}/>
          </div>
        </div>
        <div className="session-container">
          <div id="session-label">Session Length</div>
          <div className="session-buttons">
            <HiArrowSmDown className="arrow" onClick={decreaseSession}
            id="session-decrement"
            style={{marginRight:"15px", cursor:"pointer"}}
            />
            <div id="session-length">{sessionLength}</div>
            <HiArrowSmUp className="arrow" onClick={increaseSession}
            id="session-increment"
            style={{marginLeft:"15px", cursor:"pointer"}}/>            
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
