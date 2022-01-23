import React from 'react';
import './App.css';
import Sidebar from './features/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import { sidebarWidth } from './Constants';
import { Outlet } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import PageWrapper from './PageWrapper';
import Spacer from './Spacer';


// TODO: add aria-label and other aria props to all inputs
function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="App">
        <Sidebar/>
        <Container style={{marginLeft: sidebarWidth}}>
          <PageWrapper>
            <Outlet />
            <Spacer />
          </PageWrapper>
        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default App;
