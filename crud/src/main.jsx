import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from './Pages/ListPage.jsx';
import AddPage from './Pages/AddPage.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import { Toaster } from "@/components/ui/toaster"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/Add",
    element: <AddPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>,
)
