import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider  } from 'react-redux';
import StatsPage from './components/statsPage';
import admin from './components/admin';
import mainReducer from './reducers/mainReducer';
import {actionForGetProducts} from './actions/actions';
import Header from './components/header/header';
import header from './components/header/header';

 let store = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );





///=====Calling data from api and storing inside application state=====
 const getProducts = async()=>{
   let finalRes = '';
    await fetch("http://localhost:4000")
    .then(response => response.json())
    .then(result => {
     
      finalRes = result;
})
store.dispatch(actionForGetProducts(finalRes));

  
}
 getProducts();

 



ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>

    <BrowserRouter>
    <Switch>
    <div className="App">
      <Header/>
      
    <Route exact path='/stats' component={StatsPage} />

<Route   exact  path='/' component={Home} />
<Route   exact  path='/admin' component={admin} />
</div>

     

    </Switch>
    </BrowserRouter>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
