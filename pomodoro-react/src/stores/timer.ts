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
    startTimer: () => void;
    stopTimer: () => void;
    toggleTimer: () => void;
  }

const useTimerStore = create<TIMER>((set, get) => {
    const studyTime = 25;
    const timer = studyTime * 60; // sec으로 변환

    let interval: NodeJS.Timeout | null = null;

    const startTimer = () => {
        if (interval) return; // 이미 실행 중이면 리턴
        interval = setInterval(() => {
            const { timer } = get();
            if (timer > 0) {
                set((state) => ({ timer: state.timer - 1 }));
            } else {
                stopTimer();
            }
        }, 1000);
    };

    const stopTimer = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

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
        toggleTimer: () => {
            const { isRunning } = get();
            if (isRunning) {
                stopTimer();
                set({ isRunning: false });
            } else {
                startTimer();
                set({ isRunning: true });
            }
        },
        startTimer,
        stopTimer,
    };
});

export default useTimerStore;