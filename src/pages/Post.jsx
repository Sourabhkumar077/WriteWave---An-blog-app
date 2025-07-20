
// React and hooks
import { useEffect, useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Router
import { useNavigate, useParams } from 'react-router-dom';
// HTML parser
import parse from 'html-react-parser';
// Components
import { Container } from '../components';
// Appwrite service
import appwriteService from '../appwrite/configurations';

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? userData.$id === post.userId : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/');
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  return (
    <div className="py-8">
      <Container>
        {post && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              {isAuthor && (
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-post/${post.$id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={deletePost}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="w-full mb-6">
              <img
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="w-full max-w-4xl mx-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="prose prose-lg max-w-none">
              {post.content && parse(post.content)}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}
  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate('/');
      }
    });
  };

export default Post;

