import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <CreatePost />
        <PostList />
        <EditPost />   
      </div>
    </QueryClientProvider>
  );
}

export default App;