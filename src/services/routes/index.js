import {
    BrowserRouter as Router,
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
const PageRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<FirstPage />} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route element={<Layout />}>
                    <Route path="/boardpage" element={<BoardPage />}></Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default PageRoutes;