import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createTicket, reset} from "../../redux/features/tickets/ticketSlice";
import Spinner from "../../components/Spinner/Spinner";
import BackButton from "../../components/BackButton/BackButton";

const NewTicket = () => {
    const {user} = useSelector((state) => state.auth)
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.ticket)

    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    }, [dispatch, isError, isSuccess, message, navigate]);

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({product, description}))
    }
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <>
            <BackButton url={'/'}/>
            <section className={'heading'}>
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" name={'name'} className={'form-control'} value={name} disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="text" name={'email'} className={'form-control'} value={email} disabled/>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name="product" id="product" value={product}
                                onChange={(event) => setProduct(event.target.value)}>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook">Macbook</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of the issue</label>
                        <textarea name="description" id="description" className={'form-control'} value={description}
                                  onChange={(event) => setDescription(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <button type={'submit'} className={'btn btn-block'}>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default NewTicket;