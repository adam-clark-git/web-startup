import React from "react";
export async function saveData(key,data) {
    localStorage.setItem(key,data);
};


export async function loadData(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};