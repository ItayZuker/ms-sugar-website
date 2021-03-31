import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App/App';
import ShopProvider from './Context/shopContext'

ReactDOM.render(

<BrowserRouter>
    <ShopProvider>
        <App />
    </ShopProvider>
</BrowserRouter>,

document.getElementById('root'));
