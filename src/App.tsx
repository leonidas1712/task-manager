import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import  Categories from './features/Categories';
import Sidebar from './features/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import { sidebarWidth } from './Constants';
import { Outlet } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Container style={{marginLeft: sidebarWidth}}>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
