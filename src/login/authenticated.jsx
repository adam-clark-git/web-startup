import React from 'react';
import Button from 'react-bootstrap/Button';

export function Authenticated({ userName, onLogout }) {
    function logout() {
        localStorage.removeItem('userName');
        if (onLogout) onLogout();
    }
    return (
        <div>
            <p> Signed in as: {userName || 'sample@gmail.com'}</p>
            <Button type="button" variant="outline-primary" onClick={logout}> Log Out</Button>
        </div>
    )
}