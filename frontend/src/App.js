import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./common/pages/Home/Home";
import Login from "./common/pages/Login/Login";
import Register from "./common/pages/Register/Register";
import Header from "./common/components/Header/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from "./common/pages/NewTicket/NewTicket";
import PrivateRoute from "./common/components/PrivateRoute/PrivateRoute";
import Tickets from "./common/pages/Tickets/Tickets";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header/>
                    <Routes>
                        <Route path={'/'} element={<Home/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        <Route path={'/new-ticket'} element={<PrivateRoute/>}>
                            <Route path={'/new-ticket'} element={<NewTicket/>}/>
                        </Route>
                        <Route path={'/tickets'} element={<PrivateRoute/>}>
                            <Route path={'/tickets'} element={<Tickets/>}/>
                        </Route>
                    </Routes>
                    <ToastContainer/>
                </div>

            </Router>
        </>
    );
}

export default App;
