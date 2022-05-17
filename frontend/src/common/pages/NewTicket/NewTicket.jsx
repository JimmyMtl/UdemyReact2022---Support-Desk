import {useState} from "react";
import {useSelector} from "react-redux";

const NewTicket = () => {
    const {user} = useSelector((state) => state.auth)
    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
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