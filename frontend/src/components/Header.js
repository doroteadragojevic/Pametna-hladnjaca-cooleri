import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`;

const Header = () => (
  <HeaderContainer>
    <h1>Pametna Hladnjača</h1>
  </HeaderContainer>
);

export default Header;
