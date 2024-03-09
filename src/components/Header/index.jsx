import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: #EDEDED;
    padding: 16px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Header = () => {
    const navigate = useNavigate();
    return (
        <HeaderContainer>
            <h1>LOGO</h1>
            <button onClick={() => navigate('/login')}>Login</button>
        </HeaderContainer>
    );
}

export default Header;