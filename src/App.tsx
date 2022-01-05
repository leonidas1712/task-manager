import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Categories from './features/categories/Categories';
import Sidebar from './features/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import { sidebarWidth } from './Constants';
import { Outlet } from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import PageWrapper from './PageWrapper';

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="App">
        <Sidebar/>
        <Container style={{marginLeft: sidebarWidth}}>
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </Container>
      </div>
    </LocalizationProvider>
  );
}

export default App;
