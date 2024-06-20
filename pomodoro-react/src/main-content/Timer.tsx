import { useState, useEffect } from 'react';
import './Timer.css';

function Timer() {
    const [studyTime, setStudyTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [timer, setTimer] = useState(studyTime * 60);
    const [isStudy, setIsStudy] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [timeChanged, setTimeChanged] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if (!isRunning && timeChanged) {
            setTimeChanged(false);
            setTimer(studyTime * 60);
            setIsStudy(true);
        }
        if (timer === 0) {
            setIsStudy(!isStudy);
            setTimer((isStudy ? breakTime : studyTime) * 60);
        }
        
    }, [isRunning, studyTime, timeChanged, timer, isStudy, breakTime]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    return (
        <div className="timer-area">
            <div className='total-time'>
                {formatTime(timer)}
            </div>
            {!isRunning && <div className='time-zone'>
                <span className='study-time'>Study Time: {studyTime} minutes </span>
                <button className='increase' onClick={() => {setStudyTime(Math.min(90, studyTime + 5)); setTimeChanged(true); }} disabled={isRunning}>+</button> &nbsp;&nbsp;
                <button className='decrease' onClick={() => {setStudyTime(Math.max(25, studyTime - 5)); setTimeChanged(true); }} disabled={isRunning}>-</button>
                <br />
                <span className='break-time'>Break Time: {breakTime} minutes </span>
                <button className='increase' onClick={() => {setBreakTime(Math.min(20, breakTime + 5)); setTimeChanged(true); }} disabled={isRunning}>+</button> &nbsp;&nbsp;
                <button className='decrease' onClick={() => {setBreakTime(Math.max(5, breakTime - 5)); setTimeChanged(true); }} disabled={isRunning}>-</button>
            </div>}

            {isRunning && isStudy && <span className='comment'>WORK HARD :)</span>}
            {isRunning && !isStudy && <span className='comment'>😪😪</span>}

            <button className='btn-running' onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'STOP' : 'START!'}</button>
        </div>
    );
}

export default Timer;