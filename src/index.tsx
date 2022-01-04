import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Category from "./features/categories/CategoryPage";
import { getCategories } from './features/categories/categoriesSlice';
import { getTasks } from './features/tasks/tasksSlice';


store.dispatch(getCategories());
store.dispatch(getTasks());

function Inbox() {
  return (
    <h1>Inbox</h1>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="categories">
              <Route index element={<h2>Please select a category</h2>}></Route>
              {/* Ideally upcoming route would be outside categories but this makes it
              easier to work with bootstrap navigation */}
              <Route path="upcoming" element={<h1>Upcoming page</h1>} />
              <Route path=":categoryId" element={<Category/>} />
            </Route>

            <Route path="*" element= {<Navigate to= "/categories"/>}/>
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
