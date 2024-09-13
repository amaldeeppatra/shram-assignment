import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,Outlet,RouterProvider } from 'react-router-dom'
import Login from './pages/Login';
import Game from './components/Game';
import ScoreBoard from './components/ScoreBoard';
import Signup from './pages/Signup';

const App=()=>{
  return(
      <>
      <Outlet />
      </>
     
  )
}

const appRouter=createBrowserRouter(
  [
      {
          path:"/",
          element:<App />,
          children:[
              {
                path:"/",
                element:[<Login/>]
              },
              {
                path:"/signup",
                element:[<Signup/>]
              },
              {
                path:"/play",
                element:[<Game/>, <ScoreBoard/>]
              }
          ]
      }
  ]
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);