import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTickets, reset} from "../../redux/features/tickets/ticketSlice";
import Spinner from "../../components/Spinner/Spinner";
import BackButton from "../../components/BackButton/BackButton";

const Tickets = () => {
    const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTickets())
    }, [dispatch]);

    if (isLoading) {
        return <Spinner/>
    }
    return (
        <>
            test
        </>
    );
};

export default Tickets;