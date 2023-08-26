import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layout/Main";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import WorldMap from "./components/WorldMap";
import Iss from "./components/Iss";
import Apod from "./components/Apod";
import Satellites from "./components/Satellites";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/climate",
          element: <WorldMap />,
        },
        {
          path: "/iss",
          element: <Iss />,
        },
        {
          path: "/apod",
          element: <Apod />,
        },
        {
          path: "satellites",
          element: <Satellites />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
