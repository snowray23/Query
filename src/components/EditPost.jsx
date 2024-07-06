import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';

const EditPost = ({ postId, onClose }) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const data = await response.json();
      setTitle(data.title);
      setBody(data.body);
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const updatePost = useMutation(
    updatedPost => fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        alert('Post has been updated!');
        onClose(); 
      },
    }
  );

  const handleSubmit = e => {
    e.preventDefault();
    updatePost.mutate({ id: postId, title, body });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Body"
        required
      />
      <button type="submit">Update Post</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditPost;