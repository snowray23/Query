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
    <li className="border p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="mt-2">{post.body}</p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        <RiDeleteBin6Line />
      </button>
    </li>
  );
};

export default Post;