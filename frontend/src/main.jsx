import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import Home from "./components/pages/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/pages/Signup.jsx";
import { Allpost, Addpost, EditPost } from "./components/index.js";
import "./index.css";
// import Post from "./components/pages/Post.jsx";

// Error Boundary Component
const ErrorBoundary = () => <h1>Oops! Something went wrong.</h1>;

// Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      // {
      //   path: "/all-posts",
      //   element: (
      //     <AuthLayout authentication={true}>
      //       <Allpost/>
      //     </AuthLayout>
      //   ),
      // },
      {
        path: "/price",
        element: (
          <AuthLayout authentication={true}>
           <Addpost/>
          </AuthLayout>
        ),
      },
      // {
      //   path: "/edit-post/:slug",
      //   element: (
      //     <AuthLayout authentication={true}>
      //       <EditPost />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/post/:slug",
      //   element: <Post />,
      // },
    ],
  },
]);

// Render Application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
