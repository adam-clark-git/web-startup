import React from "react";
export async function getOtherUserImages(date) 
{
    const res = await fetch(`/api/artpieces/date/${encodeURIComponent(date)}`);
    return await res.json();
}