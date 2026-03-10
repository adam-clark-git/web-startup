import React from "react";
export async function getOtherUserImages() 
{
    const res = await fetch('/api/artpieces');
    return await res.json();
}