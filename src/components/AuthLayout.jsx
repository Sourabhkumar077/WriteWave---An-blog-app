import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // TODO: Make this condition easy to understand
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, authentication, navigate]);

    return loader ? <div>Loading...</div> : <>{children}</>;
}

