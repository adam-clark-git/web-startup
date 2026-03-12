import React, { useEffect, useState } from 'react';
export function FactOfTheDay() {
    const [fact, setFact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    async function fetchFact() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today", {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch");
            }
            const data = await res.json();
            setFact(data);
        } catch (err) {
            setError("Could not load today's fact. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchFact();
    }, []);
    if (loading) return <p> Loading today's fact...</p>;
    if (error) return <p> Fact Not Loaded</p>;
    return (
        <div className="funfact">
            <span> Fun Fact! </span>
            <p> {fact.text}</p>
        </div>
    )
}
