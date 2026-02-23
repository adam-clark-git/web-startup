import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { AuthContext } from './auth';

export function Unauthenticated() {
    const {userName, login, create} = useContext(AuthContext);
    const [tempUserName, setTempUserName] = React.useState(userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);
    const handleLogin = async() => {
        await login(tempUserName);
    }
    const handleCreate = async() => {
        await create(tempUserName);
    }
    return (
        <form>
            <p> Log in to store and share your art with others! </p>
            <ul>
                <li>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" value={userName} onChange={(e) => setTempUserName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </li>
            </ul>
            <Button type="button" variant="outline-primary" onClick={handleLogin} className="my-button"> Log In </Button>
            
            <Button type="button" variant="outline-primary" onClick={handleCreate} className="my-button"> Sign Up </Button>
        </form>
    )
}
/*
<p> Don't have an account?</p>
            <ul>
                <li>
                    <label for="text">Username:</label>
                    <input type="text" id="name" name="varName"/>
                </li>
                <li>
                    <label for="text">Email:</label>
                    <input type="email" id="email" name="varEmail"/>
                </li>
                <li>
                    <label for="text">Password:</label>
                    <input type="password" id="password" name="varPassword"/>
                </li>
            </ul>
*/