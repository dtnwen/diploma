import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ErrorPage, Landingpage, Profile, Instruction, Verify } from './routes/index'
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: <Landingpage />,
        errorElement: <ErrorPage />,
        
      },
      {
        path: "/how",
        element: <Instruction/>,
        errorElement: <ErrorPage/>
      },
      {
        path: "/verify",
        element: <Verify />,
        errorElement: <ErrorPage/>
      },
    ]
  },
  
])

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
