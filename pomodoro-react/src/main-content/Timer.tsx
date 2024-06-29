import { useEffect } from 'react';
import useTimerStore from '../stores/timer';
import './Timer.css';

function Timer() {

    const { studyTime, setStudyTime, breakTime, setBreakTime,
        timer, setTimer, isStudy, setIsStudy, isRunning,
        timeChanged, setTimeChanged, toggleTimer
      } = useTimerStore();

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
        
    }, [setIsStudy, isRunning, studyTime, timeChanged, timer, isStudy, breakTime, setTimeChanged, setTimer]);

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
            {isRunning && !isStudy && <span className='comment'>Time to Break😪😪</span>}

            <button className='btn-running' onClick={toggleTimer}>{isRunning ? 'STOP' : 'START!'}</button>
        </div>
    );
}

export default Timer;