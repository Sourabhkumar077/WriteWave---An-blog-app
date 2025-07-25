import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components/index';
import EnvDebug from './components/EnvDebug';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* Remove this component in production */}
      <EnvDebug />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
