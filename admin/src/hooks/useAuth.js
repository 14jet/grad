import { useSelector } from "react-redux";
import { selectIsAdmin, selectIsModerator } from "../store/user.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




function useAuth(role = '') {
    const isAdmin = useSelector(selectIsAdmin);
    const isModerator = useSelector(selectIsModerator);
    const navigate = useNavigate()

    useEffect(() => {
        if (role === 'moderator' && !(isAdmin || isModerator)) {
            navigate('/forbidden', {replace: true})
        }
    
        if (role === 'admin' && !isAdmin) {
            navigate('/forbidden', {replace: true})
        }
    }, [role, isAdmin, isModerator])
}

export default useAuth;