export function Prompt()
{
    const prompts = ["Springtime", "Fortnite", "Bloodbath", "Friendship", "Grief", "Quagmire", "Star Wars"];
    return prompts[Math.floor(Math.random() * prompts.length)];
}