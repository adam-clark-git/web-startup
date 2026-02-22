import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function loginUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    async function createUser() {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }
    return (
        <form>
            <p> Log in to store and share your art with others! </p>
            <ul>
                <li>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </li>
            </ul>
            <Button type="button" variant="outline-primary" onClick={loginUser} className="my-button"> Log In </Button>
            
            <Button type="button" variant="outline-primary" onClick={createUser} className="my-button"> Sign Up </Button>
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