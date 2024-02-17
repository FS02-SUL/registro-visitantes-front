import styled from "styled-components";

const HeaderContainer = styled.header`
    background-color: #EDEDED;
    padding: 16px 60px;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>LOGO</h1>
        </HeaderContainer>
    );
}

export default Header;