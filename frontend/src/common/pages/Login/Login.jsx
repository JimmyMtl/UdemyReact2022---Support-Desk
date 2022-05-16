import {useEffect, useState} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import {login, reset} from "../../redux/features/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData((prevsState) => ({...prevsState, [e.target.id]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {email, password}
        dispatch(login(userData))
    }
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        // Redirect when logged in
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message]);
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <>
            <section className={'heading'}>
                <h1><FaSignInAlt/> Login</h1>
                <p>Please log in to get support</p>
                <form className={'form'} onSubmit={onSubmit}>

                    <div className="form-group">
                        <input type="email" className={'form-control'} name={'email'} id={'email'} value={email}
                               onChange={onChange}
                               placeholder={'Enter your email'} required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className={'form-control'} name={'password'} id={'password'}
                               value={password} onChange={onChange}
                               placeholder={'Enter your password'} required/>
                    </div>

                    <div className="form-group">
                        <button type={'submit'} className={'btn btn-block'}>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;