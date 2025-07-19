import React from 'react';
import { LogoutBtn, Container, Logo } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-md">
      <Container>
        <nav className="flex items-center py-3">
          <Link to="/" className="flex items-center mr-8">
            <Logo width="70px" />
          </Link>
          <ul className="flex ml-auto gap-2 sm:gap-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-5 py-2 rounded-full font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;