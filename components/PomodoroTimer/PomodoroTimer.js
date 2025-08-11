import React, { memo, useState } from 'react';
import useTimer from 'react-timer-hook';

function PomodoroTimer() {
    const [isWorking, setIsWorking] = useState(true);
    const [time, setTime] = useState(1500); // 25 minutes in seconds
    const [lastTotalSeconds, setLastTotalSeconds] = useState(0); // 25 minutes in seconds
    const { seconds, minutes, start, pause, totalSeconds, isRunning, restart, resume } = useTimer({
        expiryTimestamp: Date.now() + time * 1000,
        onExpire: () => {
            setIsWorking(!isWorking);
            setTime(isWorking ? 300 : 1500); // 5 minutes or 25 minutes
        },
        autoStart: false, // Set the timer to start as paused
    });

    const handleStartPause = () => {
        if (isRunning) {
            pause();
        }
        else if (totalSeconds === 0) {
            start();
        }
        else {
            resume();
        }
    };

    const handleReset = () => {
        const t = new Date();
        t.setSeconds(minutes * 60 + seconds + 60);
        restart(t)
    };

    return (
        <div className="text-center">
            <div className="text-2xl font-black mb-3">Promidot Timer</div>
            <div className="text-5xl font-extrabold w-48 h-48 mx-auto flex justify-center items-center mb-4 glassmorphism rounded-full border-4 border-black">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>

            <div className='flex flex-col justify-center'>
                <button onClick={handleStartPause} className="bg-yellow-400 text-lg text-black px-10 py-2 mt-2 rounded-md">
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={handleReset} className="glassmorphism text-lg text-black px-10 py-2 mt-2 rounded-md">
                    + 1
                </button>
            </div>
        </div>
    );
}

export default memo(PomodoroTimer);
