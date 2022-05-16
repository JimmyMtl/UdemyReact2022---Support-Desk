import {useEffect, useState} from "react";
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from "../../redux/features/auth/authSlice";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const {name, email, password, password2} = formData

    const onChange = (e) => {
        setFormData((prevsState) => ({...prevsState, [e.target.id]: e.target.value}))
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

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

    const onSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error('Password do not match')
        } else {
            const userData = {name, email, password}
            dispatch(register(userData))
        }
    }

    return (
        <>
            <section className={'heading'}>
                <h1>
                    <FaUser/> Register
                </h1>
                <p>Please create an account</p>
                <form className={'form'} onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className={'form-control'} name={'name'} id={'name'} value={name}
                               onChange={onChange}
                               placeholder={'Enter your name'} required/>
                    </div>
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
                        <input type="password" className={'form-control'} name={'password2'} id={'password2'}
                               value={password2} onChange={onChange}
                               placeholder={'Confirm your password'} required/>
                    </div>
                    <div className="form-group">
                        <button type={'submit'} className={'btn btn-block'}>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;