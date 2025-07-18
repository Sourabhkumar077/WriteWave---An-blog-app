
import parse from 'html-react-parser';
import { Container } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();


    const userData = useSelector(state => state.auth.userData);

    const isAuther = post && userData ? userData.$id === post.userId : false;

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
        <div className='py-8'>
            <Container>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-3xl font-semibold'>{post?.title}</h1>
                    {isAuther && <button className='bg-gray-600 text-white px-4 py-2 rounded-md'>Edit</button>}
                </div>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(post?.featuredimage)} alt={post?.title} className='rounded-xl' />
                    <h4 className='text-lg font-semibold'>{post?.title}</h4>
                </div>
                <div className='w-full justify-center mb-4'>
                    {parse(post?.content)}
                </div>
            </Container>
        </div>
    )
}

