
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
function LogoutBtn() {

    const dispatch = useDispatch();
    const logouthandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
            })
            .catch(err => {
                console.log("Error Occured: ", err);
            });
    }
    return (
        <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logouthandler}>
            Logout
        </button>
    )
}

export default LogoutBtn;