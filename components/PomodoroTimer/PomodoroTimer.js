import React, { memo, useEffect, useMemo, useState } from 'react';
import useTimer from 'react-timer-hook';

function PomodoroTimer() {
    const [isWorking, setIsWorking] = useState(true);
    const [sessionSeconds, setSessionSeconds] = useState(1500); // default 25m
    const { seconds, minutes, hours, start, pause, totalSeconds, isRunning, restart, resume } = useTimer({
        expiryTimestamp: Date.now() + sessionSeconds * 1000,
        onExpire: () => {
            setIsWorking(!isWorking);
            const next = isWorking ? 300 : 1500; // 5 minutes or 25 minutes
            setSessionSeconds(next);
        },
        autoStart: false,
    });

    // Presets (seconds)
    const PRESETS = [300, 600, 900, 1500, 2700, 3600];

    const restartWithSeconds = (sec, autoStart = true) => {
        const clamped = Math.max(10, Math.floor(sec));
        setSessionSeconds(clamped);
        const base = new Date();
        base.setSeconds(base.getSeconds() + clamped);
        restart(base, autoStart);
    };

    useEffect(() => {
        const handler = (e) => {
            const sec = Math.max(1, Math.floor(e?.detail?.seconds || 0));
            restartWithSeconds(sec, true);
        };
        window.addEventListener('focus-until-salah', handler);
        return () => window.removeEventListener('focus-until-salah', handler);
    }, [restart]);

    const handleStartPause = () => {
        if (isRunning) pause();
        else if (totalSeconds === 0) start();
        else resume();
    };

    const handleReset = () => restartWithSeconds(minutes * 60 + seconds + hours * 3600 + 60, true);

    const remaining = hours * 3600 + minutes * 60 + seconds;
    const duration = sessionSeconds; // total session length
    const progress = Math.min(1, Math.max(0, 1 - remaining / Math.max(1, duration)));

    const size = 192; // 48*4 = matches w-48 h-48
    const stroke = 10;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = useMemo(() => circumference * (1 - progress), [circumference, progress]);

    const two = (n) => String(n).padStart(2, '0');
    const display = `${two(hours)}:${two(minutes)}:${two(seconds)}`;

    const adjust = (deltaSec) => restartWithSeconds(remaining + deltaSec, false);

    return (
        <div className="text-center" style={{ width: 320 }}>
            <div className="text-2xl font-black mb-2">Pomodoro Timer</div>

            {/* Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
                {PRESETS.map((sec) => (
                    <button
                        key={sec}
                        onClick={() => restartWithSeconds(sec, true)}
                        className="px-2 py-1 text-xs font-bold border border-black rounded"
                        style={{ backgroundColor: '#ffa700', color: '#000' }}
                    >
                        {Math.round(sec / 60)}m
                    </button>
                ))}
            </div>

            <div className="relative mx-auto mb-2" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="absolute top-0 left-0">
                    <circle cx={size/2} cy={size/2} r={radius} stroke="#000" strokeWidth={stroke} fill="transparent" />
                    <circle
                        cx={size/2}
                        cy={size/2}
                        r={radius}
                        stroke="#ffa700"
                        strokeWidth={stroke}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform={`rotate(-90 ${size/2} ${size/2})`}
                    />
                </svg>
                <div className="text-3xl md:text-5xl font-extrabold w-48 h-48 mx-auto flex justify-center items-center glassmorphism rounded-full">
                    {display}
                </div>
            </div>

            {/* Controls */}
            <div className='flex flex-wrap justify-center gap-2'>
                <button onClick={() => adjust(-60)} className="px-2 py-1 text-xs font-bold border border-black rounded bg-white text-black">- 1m</button>
                <button onClick={handleStartPause} className="px-3 py-1 text-sm font-bold rounded" style={{ backgroundColor: '#ffa700', color: '#000' }}>
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={() => adjust(60)} className="px-2 py-1 text-xs font-bold border border-black rounded bg-white text-black">+ 1m</button>
            </div>
        </div>
    );
}

export default memo(PomodoroTimer);
