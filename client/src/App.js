import React from 'react';
import styled from 'styled-components';

import Search from './components/Search';
import Alerts from './components/Alerts';
import Products from './components/Products';

const Container = styled.div`
  padding: 32px;
  height: 100vh;
  background-color: #efefef;
  overflow: auto;
`;

function App() {
  return (
    <Container className='App'>
      <Search />
      <Alerts />
      <Products />
    </Container>
  );
}

export default App;
