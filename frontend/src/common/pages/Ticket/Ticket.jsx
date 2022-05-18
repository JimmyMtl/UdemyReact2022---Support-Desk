import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getTicket, reset, closeTicket} from "../../redux/features/tickets/ticketSlice";
import BackButton from "../../components/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const Ticket = () => {
    const {ticketId} = useParams()
    const {isSuccess, message, isLoading, isError, ticket} = useSelector((state) => state.tickets)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId]);

    const onTicketClose = (e) => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    if (isLoading) {
        return <Spinner/>
    }
    if (isError) {
        return <h3>Something Went Wrong..</h3>
    }
    return (
        <div className={'ticket-page'}>
            <header className="ticket-header">
                <BackButton url={'/tickets'}/>
                <h2>Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span></h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('fr')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr/>
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (
                <button className={'btn btn-block btn-danger'} onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    );
};

export default Ticket;