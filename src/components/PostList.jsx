import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import EditPost from './EditPost';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');

  return response.json();
};

const PostList = () => {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, error } = useQuery('posts', fetchPosts);

  const deletePost = useMutation(
    id => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        alert('Post has been deleted !');
      },
    }
  );

  const [editPostId, setEditPostId] = useState(null);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost.mutate(id);
    }
  };

  const handleEdit = id => {
    setEditPostId(id);
  };

  const handleCloseEdit = () => {
    setEditPostId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(post.id)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editPostId !== null && (
        <EditPost postId={editPostId} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default PostList;