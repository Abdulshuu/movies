import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Login } from './components/Login.tsx'
import { Signup } from './components/Signup.tsx'
import { AuthLayout } from './components/AuthLayout.tsx'
import { FullCard } from './components/FullCard.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/movie-des/:id",
    Component: FullCard
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { path: 'login', Component: Login },
      { path: 'signup', Component: Signup }
    ]
  }
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);