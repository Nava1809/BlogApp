import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { isAuthenticated,getUserID } from "../helper/helper"; // Importing authentication helper
import "./BlogPost.css"
const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_API;
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/'); // Redirect to home if not authenticated
            return;
        }
    }, [navigate]);

    useEffect(() => {
        axios.get(`${url}/api/getOne/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.status === 'Success') {
                setPost(response.data.blog); 
            } else {
                console.error('Failed to fetch post:', response.data.message || 'Unknown error');
                navigate('/Bloglist');
            }
        })
        .catch(error => {
            console.error('Error fetching post:', error);
            navigate('/Bloglist');
        })
        .finally(() => setLoading(false)); 
    }, [id, url, token, navigate]);

    const handleDelete = () => {
        axios.delete(`${url}/api/deletePost/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => navigate('/Bloglist'))
        .catch(error => console.error('Error deleting post:', error));
    };

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>No post found.</p>;


    const isAuthorOrAdmin = post.author === getUserID(); 
    return (
        <div className="blog-post-container">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><em>Author: {post.author}</em></p>
            <p><em>Date: {new Date(post.date).toLocaleDateString()}</em></p>
            {isAuthorOrAdmin && (
                <>
                    <Link to={`/edit/${id}`}>Edit</Link>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default BlogPost;
