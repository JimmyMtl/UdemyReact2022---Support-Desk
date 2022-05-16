import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./common/pages/Home/Home";
import Login from "./common/pages/Login/Login";
import Register from "./common/pages/Register/Register";
import Header from "./common/components/Header/Header";

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
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
