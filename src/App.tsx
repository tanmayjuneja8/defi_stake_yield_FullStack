import React from 'react';
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, ChainId } from '@usedapp/core'
import { Header } from './components/Header'
import { Container } from "@material-ui/core";
import { Main } from "./components/Main"
function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 1500,
        checkInterval: 1000
      }
    }}>
      <Header />
      <Container maxWidth="md">
        <div>Hey User!</div>
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
