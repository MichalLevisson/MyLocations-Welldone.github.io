import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyLocations from './components/MyLocationsPage/MyLocations';
import Categories from './components/CategoriesPage/Categories'
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { history } from './store/history';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper';
import 'jquery/dist/jquery';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux'

const render = () => {
  ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
        <React.Fragment>
          <Route exact path="/" component={MyLocations} />
          <Route exact path="/categories" component={Categories} />
        </React.Fragment>
      </Provider>
    </Router>,  document.getElementById('root'))
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
