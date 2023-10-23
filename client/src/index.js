import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import ListingsScreen from './screens/ListingsScreen';
import ListingScreen from './screens/ListingScreen';
import AddListingScreen from './screens/AddListingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthRoute from './components/AuthRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<ListingsScreen/>} />
      <Route path='/:id' element={<ListingScreen/>} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    
      <Route path='' element={<AuthRoute />}>
        <Route path='/add-listing' element={<AddListingScreen />} />
      </Route>

    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <CookiesProvider>
      <RouterProvider router={router}/>
    </CookiesProvider>
);