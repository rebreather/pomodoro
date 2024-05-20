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
            <div>
                <button onClick={() => {setStudyTime(Math.min(90, studyTime + 5)); setTimeChanged(true); }} disabled={isRunning}>Increase Study Time</button>
                <button onClick={() => {setStudyTime(Math.max(25, studyTime - 5)); setTimeChanged(true); }} disabled={isRunning}>Decrease Study Time</button>
            </div>
            <div>
                <button onClick={() => {setBreakTime(Math.min(20, breakTime + 5)); setTimeChanged(true); }} disabled={isRunning}>Increase Break Time</button>
                <button onClick={() => {setBreakTime(Math.max(5, breakTime - 5)); setTimeChanged(true); }} disabled={isRunning}>Decrease Break Time</button>
            </div>
            <div>
                <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? 'Stop' : 'Start'}</button>
            </div>
            {!isRunning && <div>
                Study Time: {studyTime} minutes
                Break Time: {breakTime} minutes
            </div>}
            <div>
    {isStudy ? 'Study Time' : 'Break Time'}
</div>
            <div>
    {formatTime(timer)}
</div>
        </div>
    );
}

export default Timer;