import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getTicket, closeTicket} from "../../redux/features/tickets/ticketSlice";
import BackButton from "../../components/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {getNotes, reset as notesReset} from "../../redux/features/notes/noteSlice";
import NoteItem from "../../components/NoteItem/NoteItem";

const Ticket = () => {
    const {ticketId} = useParams()
    const {isSuccess, message, isLoading, isError, ticket} = useSelector((state) => state.tickets)
    const {isLoading: notesIsLoading, notes} = useSelector((state) => state.notes)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId]);

    const onTicketClose = (e) => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Closed')
        navigate('/tickets')
    }

    if (isLoading || notesIsLoading) {
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
                <h2>Notes</h2>

            </header>
            {notes.map((note)=>(
                <NoteItem note={note} key={note._id}/>
            ))}
            {ticket.status !== 'closed' && (
                <button className={'btn btn-block btn-danger'} onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    );
};

export default Ticket;