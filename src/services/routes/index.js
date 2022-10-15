import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import React from 'react'
import FirstPage from "../../Components/FirstPage/FirstPage";
import Layout from "../../Components/Layout";
import NotFound from "../../Components/NotFound";
import BoardPage from "../../Components/BoardPage/BoardPage";
import Login from "../../Components/LoginRegister/Login";
import Register from "../../Components/LoginRegister/Register";
import Home from "../../Components/Home/Home"
import { useSelector } from "react-redux";
const PageRoutes = () => {
    const { token } = useSelector((state) => state.auth);
    
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={ <Home />}/>
                <Route exact path="/boardpage"  element={token ? <FirstPage /> : <Login />}/>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route element={<Layout />}>
                    <Route path="/board"   element={<BoardPage />}/>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default PageRoutes;