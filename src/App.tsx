import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import  Categories from './features/Categories';

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Categories />
    </div>
  );
}

export default App;
