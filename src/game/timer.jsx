import React from "react"
import { useState, useEffect } from "react";
export function Timer({startFrom, onComplete, paused}) {
    const [timeLeft, setTimeLeft] = useState(startFrom);
    useEffect(() => {
        if (paused) return;
        if (timeLeft === 0) {
            onComplete?.()
            return;
        } 
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
            
        }, 1000);
        return () => clearInterval(timer)
    }, [timeLeft, paused])
    return (
        <div className="timer"> {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</div>
    );
}