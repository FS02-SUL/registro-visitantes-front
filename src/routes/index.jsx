import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TelaVisitante from "../pages/TelaVisitante";
import TelaLogin from "../pages/TelaLogin";
import TelaAdmin from "../pages/TelaAdmin";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { estaLogado } = useContext(AuthContext);
    return estaLogado ? children : <Navigate to={"/login"} />
}

const Ways = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<TelaVisitante />} />
                <Route path={"/login"} element={<TelaLogin />} />
                <Route path={"/admin"} element={<ProtectedRoute><TelaAdmin /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Ways;