import React from 'react';
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './layout/Main';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import WorldMap from './components/WorldMap';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/map",
          element: <WorldMap />
        }
      ]
    }
  ])


  // loading weather data from lang,longitude from openweatherapi



  return (
    <div className="app">
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
  )
}

export default App
