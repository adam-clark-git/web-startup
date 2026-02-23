import React from "react"
import { useState, useEffect } from "react";
export function Timer({startFrom = 130, onComplete}) {
    const [timeLeft, setTimeLeft] = useState(startFrom);
    useEffect(() => {
        if (timeLeft === 0) {
            onComplete?.()
            return;
        } 
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer)
    }, [timeLeft])
    return (
        <div className="timer"> {timeLeft}</div>
    );
}