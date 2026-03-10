export async function Prompt() {
    const res = await fetch('/api/daily-prompt');
    const data = await res.json();
    return data.prompt;
}