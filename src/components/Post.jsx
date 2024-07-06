import React from 'react';
import { useMutation, queryCache } from 'react-query';


const deletePost = async id => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) 
  return id;
};

const Post = ({ post }) => {
  const [mutate] = useMutation(deletePost, {
    onSuccess: () => {
      queryCache.invalidateQueries('posts');
      alert('Post deleted successfully!');
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      mutate(post.id);
    }
  };

  return (
    <li>
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
      <button
        onClick={handleDelete}>
      
      </button>
    </li>
  );
};

export default Post;