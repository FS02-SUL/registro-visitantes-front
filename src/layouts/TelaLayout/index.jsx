import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

const TelaLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default TelaLayout;