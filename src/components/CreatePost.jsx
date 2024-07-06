import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const CreatePost = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const createPost = useMutation(
    newPost => fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        setTitle('');
        setBody('');
        alert('Post created successfully!');
      },
    }
  );

  const handleSubmit = e => {
    e.preventDefault();
    createPost.mutate({ title, body });
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
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;