import { create } from 'zustand';

interface TIMER {
    studyTime: number;
    breakTime: number;
    timer: number;
    isStudy: boolean;
    isRunning: boolean;
    timeChanged: boolean;
    setStudyTime: (time: number) => void;
    setBreakTime: (time: number) => void;
    setTimer: (time: number) => void;
    setIsStudy: (study: boolean) => void;
    setIsRunning: (running: boolean) => void;
    setTimeChanged: (changed: boolean) => void;
  }

const useTimerStore = create<TIMER>((set) => {
    const studyTime = 25;
    const timer = studyTime * 60; // sec으로 변환
    return {
        studyTime: 25,
        breakTime: 5,
        timer: timer,
        isStudy: true,
        isRunning: false,
        timeChanged: false,
        setStudyTime: (time: number) => set({ studyTime: time, timer: time * 60}),
        setBreakTime: (time: number) => set({ breakTime: time }),
        setTimer: (newTimer: number) => set({ timer: newTimer }),
        setIsStudy: (study: boolean) => set({ isStudy: study }),
        setIsRunning: (running: boolean) => set({ isRunning: running }),
        setTimeChanged: (changed: boolean) => set({ timeChanged: changed }),
    };
});

export default useTimerStore;