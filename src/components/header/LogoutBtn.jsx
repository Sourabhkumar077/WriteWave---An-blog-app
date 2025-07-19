
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'

function LogoutBtn() {
  const dispatch = useDispatch();
  const logouthandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => {
        console.log('Error Occured: ', err);
      });
  };
  return (
    <button
      className="inline-block px-5 py-2 rounded-full font-medium bg-red-500 text-white shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
      onClick={logouthandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;