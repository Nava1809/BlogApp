import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BlogList.css'

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const url = process.env.REACT_APP_API; 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${url}/api/all/posts`, {
                    headers: {
                        Authorization: `Bearer ${token}` 
                       }
                });

                setPosts(response.data.posts); 
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to fetch posts'); 
            }
        };

        fetchPosts(); 
    }, [url, token]); 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url}/api/deletePost/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            setPosts(posts.filter(post => post._id !== id)); 
        } catch (err) {
            console.error('Error deleting post:', err);
            setError('Failed to delete post'); 
        }
    };

    return (
        <div className="blog-list-container">
            <h1>Blog List</h1>
            <Link to="/create">Create New Post</Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {posts.length > 0 ? (
                <ul>
                    {posts.map(post => (
                        <li key={post._id}>
                            <h2>{post.title}</h2>
                            <p>{post.content.substring(0, 100)}...</p>
                            <Link to={`/posts/${post._id}`}>Read More</Link>
                            <Link to={`/edit/${post._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(post._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default BlogList;
