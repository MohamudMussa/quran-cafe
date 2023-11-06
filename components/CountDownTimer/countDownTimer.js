import React, { useState } from 'react';
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
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(totalSeconds + 60);
        restart(time)
    };

    return (
        <div className="text-center absolute top-10 right-10">
            <div className="text-3xl font-bold mb-4">Promidot Timer</div>
            <div className="text-6xl font-bold w-48 h-48 flex justify-center items-center mb-5 glassmorphism rounded-full border-4 border-black">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>

            <div className='flex flex-col justify-center'>
                <button onClick={handleStartPause} className="bg-yellow-400 text-lg text-black px-10 py-2 mt-4">
                    {
                        isRunning ? "Pause" : "Start"
                    }
                </button>
                <button onClick={handleReset} className="glassmorphism text-lg text-white px-10 py-2 mt-4">
                    + 1
                </button>
            </div>
        </div>
    );
}

export default PomodoroTimer;
