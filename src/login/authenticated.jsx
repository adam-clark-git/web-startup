import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from './auth';

export function Authenticated({}) {
    const {userName, logout } = useContext(AuthContext);
    return (
        <div>
            <p> Signed in as: {userName || 'sample@gmail.com'}</p>
            <Button type="button" variant="outline-primary" onClick={logout}> Log Out</Button>
        </div>
    )
}