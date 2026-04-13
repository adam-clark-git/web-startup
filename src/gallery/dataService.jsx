export async function saveData(artPiece) {
    const res = await fetch('/api/artpiece', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artPiece),
    });
    return await res.json();
};

export async function loadData() {
    const res = await fetch('/api/artpieces/mine');
    return await res.json();
};