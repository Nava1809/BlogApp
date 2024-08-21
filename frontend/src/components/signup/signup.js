import React, { useState } from "react";
import "./signup.css";
import { Navigate } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const validatePassword = (password) => {
        let error = '';

        if (!password) {
            error = 'Password is required';
        } else if (password.length < 8) {
            error = 'Password must be at least 8 characters long';
        } else if (!/[A-Z]/.test(password)) {
            error = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            error = 'Password must contain at least one lowercase letter';
        } else if (!/\d/.test(password)) {
            error = 'Password must contain at least one number';
        }
        return error;
    }

    const handleClick = () => {
        if (email && phoneNumber && password && confirmPassword) {
            const isValidEmail = validateEmail(email);
            const isValidPhoneNumber = validatePhoneNumber(phoneNumber);
            const isValidPassword = validatePassword(password);
            
            if (isValidEmail && isValidPhoneNumber && isValidPassword === "") {
                if (password === confirmPassword) {
                    fetch(`${url}/api/auth/register`, {
                        method: "POST",
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify({
                            email: email,
                            phoneNumber: phoneNumber,
                            password: password
                        })
                    }).then((res) => res.json()
                    ).then((data) => {
                        console.log(data);
                        if (data.error) {
                            alert(data.error);
                        } else {
                            setEmail("");
                            setPhoneNumber("");
                            setPassword("");
                            setConfirmPassword("");
                            alert(data.message);
                            setRedirect(true);
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                } else {
                    alert("Password and confirm password must be the same");
                }
            } else {
                alert(!isValidEmail ? "Please enter a valid email" : !isValidPhoneNumber ? "Please enter a valid phone number" : "Please enter a valid password");
            }
        } else {
            alert("Please fill all fields");
        }
    }

    const performRedirect = () => {
        if (redirect) {
            return <Navigate to="/" />;
        }
    }

    return (
        <div className="container">
            {performRedirect()}
            <div className="Rectangle1">
                <div className="logo-container">
                    <div className="logo-text">
                        <p>Create New Account</p>
                    </div>
                </div>
                <div className="inputs">
                    <div>
                        <input
                            type="email"
                            className="identifier"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            className="identifier"
                            placeholder="Phone Number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                        />
                    </div>
                    <div className="inputpass">
                        <input
                            type='password'
                            className="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <div className="inputpass">
                        <input
                            type='password'
                            className="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>
                </div>
                <div className="buttons">
                    <button className="button1" onClick={handleClick}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
