// React and hooks
import React, { useEffect, useState } from 'react';
// Appwrite service
import appwriteService from '../appwrite/configurations';
// Components
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 min-h-[60vh] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-4 w-full max-w-xl mx-auto bg-white rounded-2xl shadow-md">
              <h1 className="text-2xl font-bold text-gray-700 text-center hover:text-gray-500 transition-colors">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-16 min-h-[60vh] bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;