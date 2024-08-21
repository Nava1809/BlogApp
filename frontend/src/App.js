import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import BlogList from './components/BlogList/BlogList';
import BlogPost from './components/BlogPost/BlogPost';
import BlogForm from './components/BlogForm/BlogForm';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
const App = () => {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />


                <Route path="/Bloglist" element={<PrivateRoute element={BlogList} />} />
                <Route path="/posts/:id" element={<PrivateRoute element={BlogPost}/>} />
                <Route path="/create" element={<PrivateRoute element={BlogForm} />} />
                <Route path="/edit/:id" element={<PrivateRoute element={BlogForm} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
