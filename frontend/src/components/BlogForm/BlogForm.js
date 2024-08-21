import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserID } from "../helper/helper";
import "./BlogForm.css"

const BlogForm = () => {
    const { id } = useParams();  
    const [title, setTitle] = useState('');  
    const [content, setContent] = useState('');  
    const [isEditing, setIsEditing] = useState(false);  
    const [loading, setLoading] = useState(false); 
    const [message, setMessage] = useState('');  
    const navigate = useNavigate();  
    const url = process.env.REACT_APP_API;  

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');  
            return;
        }
    
        if (id) {
            setIsEditing(true);
            setLoading(true);
    
            const token = localStorage.getItem('token');  
    
            // Ensure token exists
            if (!token) {
                setMessage('Authorization token is missing. Please log in.');
                setLoading(false);
                navigate('/');  
                return;
            }
    
            axios.get(`${url}/api/getOne/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,  
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setTitle(response.data.blog.title);  
                setContent(response.data.blog.content);  
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching post:', error.response?.data || error.message);
                setLoading(false);
                setMessage('Error fetching the post.');
            });
        }
    }, [id, navigate, url]);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true); 
        const post = { title, content, author: getUserID() };

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,  
                'Content-Type': 'application/json'  
            }
        };

        if (isEditing) {
            axios.put(`${url}/api/editPost/${id}`, post, config)
                .then((response) => {
                    setMessage('Post updated successfully.');
                    setLoading(false);
                    navigate('/Bloglist');
                })
                .catch(error => {
                    console.error('Error updating post:', error.response?.data || error.message);
                    setMessage('Error updating the post.');
                    setLoading(false);
                });
        } else {
            axios.post(`${url}/api/post`, post, config)
                .then((response) => {
                    setMessage('Post created successfully.');
                    setLoading(false);
                    navigate('/Bloglist');
                })
                .catch(error => {
                    console.error('Error creating post:', error.response?.data || error.message);
                    setMessage('Error creating the post.');
                    setLoading(false);
                });
        }
    };

    return (
        <div className="blog-form-container">
            <h1>{isEditing ? 'Edit Post' : 'Create New Post'}</h1>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {isEditing ? 'Update Post' : 'Create Post'}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BlogForm;
