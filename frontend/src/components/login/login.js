import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const [identifier, setIdentifier] = useState(""); 
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const url = process.env.REACT_APP_API;

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^[0-9]{10}$/; 
        return re.test(phoneNumber);
    }

    const handleEye = () => {
        let inputElement = document.getElementById('password');
        inputElement.type = inputElement.type === "password" ? "text" : "password";
    }

    const handleClick = () => {
        if (identifier && password) {
            const isEmail = validateEmail(identifier);
            const isPhoneNumber = validatePhoneNumber(identifier);

            if (isEmail || isPhoneNumber) {
                const body = isEmail ? { email: identifier, password: password } : { phoneNumber: identifier, password: password };

                fetch(`${url}/api/auth/`, {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(body)
                }).then((res) => res.json()
                ).then((data) => {
                    if (data.error) {
                        alert(data.error);
                    } else {
                        localStorage.setItem("token", JSON.stringify(data.token));
                        localStorage.setItem("user", data.user);
                        setIdentifier("");
                        setPassword("");
                        setRedirect(true);
                    }
                }).catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                alert("Please enter a valid email or phone number");
            }
        } else {
            alert("Please fill all fields");
        }
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/Bloglist" />;
        }
    }

    return (
        <div id="login-container">
            {performRedirect()}
            <div className="login-box">
                <div className="logo-container">
                    {/* <img src="/eduAddalogo.jpg" alt="EduAdda Logo" className="eduadda-logo" /> */}
                </div>
                <div className="text-container">
                    <p>Enter your credentials to access your account</p>
                </div>
                <div className="inputs">
                    <div>
                        <input
                            type="text"
                            className="identifier"
                            placeholder="Email or Phone Number"
                            onChange={(e) => setIdentifier(e.target.value)}
                            value={identifier}
                        />
                    </div>
                    <div className="inputpass">
                        <input
                            type="password"
                            id="password"
                            className="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button className="button1" onClick={handleClick}>Sign In</button>
                    <Link to="/register"><p className="signup">Sign Up</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
