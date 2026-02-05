import React from 'react';

export function Login() {
  return (
    <main className="login-page">
        <form>
            <p> Log in to store and share your art with others! </p>
            <ul>
                <li>
                    <label for="text">Email:</label>
                    <input type="email" id="email" name="varEmail"/>
                </li>
                <li>
                    <label for="text">Password:</label>
                    <input type="password" id="password" name="varPassword"/>
                </li>
            </ul>
            <button id="login"  type="button" className="btn btn-outline-primary my-button"> Log In </button>
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
            <button id="sign-up"  type="button" className="btn btn-outline-primary my-button"> Sign Up </button>
        </form>
            
        
        {/* Will not exist at the same time as the log in */}
        <div id="display-logged-in">
            <p id="confirmation-login"> Email: sample@gmail.com</p>
            <button id="log-out"  type="button" className="btn btn-outline-primary"> Log Out</button>
        </div>
        
    </main>
  );
}