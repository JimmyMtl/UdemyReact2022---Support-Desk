import {useState} from "react";
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {email, password} = formData

    const onChange = (e) => {
        setFormData((prevsState) => ({...prevsState, [e.target.id]: e.target.value}))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (password) {
            toast.error('Password do not match')
        }
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