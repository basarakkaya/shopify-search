import React from 'react';
import styled from 'styled-components';

import { Navbar, NavbarBrand } from 'reactstrap';

import Search from './components/Search';
import Alerts from './components/Alerts';
import Products from './components/Products';

const Container = styled.div`
  padding: 32px;
  padding-top: 72px;
  height: 100vh;
  overflow: auto;
`;

function App() {
  return (
    <>
      <Navbar color='light' fixed='top'>
        <NavbarBrand href='/'>ShopifySearch</NavbarBrand>
      </Navbar>
      <Container className='App'>
        <Search />
        <Alerts />
        <Products />
      </Container>
    </>
  );
}

export default App;
