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
const RequireAuth = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
const PageRoutes = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/board" element={token ? <FirstPage /> : <Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route element={<Layout />}>
                    <Route path="/boardpage" element={<RequireAuth>
                        <BoardPage />

                    </RequireAuth>} />
                    <Route path="/boardpage/:id/:title" element={<RequireAuth>
                        <BoardPage />

                    </RequireAuth>} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default PageRoutes;