import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import Layout from "./layout/Layout";
import Home from "./components/Home";
import AllPlants from "./components/AllPlants";
import AddPlants from "./components/AddPlants";
import MyPlants from "./components/MyPlants";
import PlantCardDetails from "./components/PlantCardDetails";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import ForgetPass from "./components/ForgetPass";
import UpdatePlant from "./components/UpdatePlant";
import ErrorPage from "./components/Error";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const myPlantsLoader = async () => {
  const res = await fetch("http://localhost:3000/plants");
  return res.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: async () => {
          const res = await fetch("http://localhost:3000/plants/new");
          return res.json();
        },
        element: <Home />,
      },
      {
        path: "viewdetails/:id",
        element: (
          <PrivateRoute>
            <PlantCardDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const all = await fetch("http://localhost:3000/plants").then((r) =>
            r.json()
          );
          const found = all.find((p) => p._id === params.id);
          if (!found) throw new Error("Plant not found");
          return found;
        },
      },
      { path: "login", element: <LogIn /> },
      { path: "register", element: <Register /> },
      {
        path: "addPlants",
        element: (
          <PrivateRoute>
            <AddPlants />
          </PrivateRoute>
        ),
      },
      {
        path: "myPlants",
        loader: myPlantsLoader,
        element: (
          <PrivateRoute>
            <MyPlants />
          </PrivateRoute>
        ),
      },
      {
        path: "allPlants",
        loader: async () =>
          fetch("http://localhost:3000/plants").then((r) => r.json()),
        element: <AllPlants />,
      },
      { path: "update/:id", element: <UpdatePlant /> },
      { path: "forgot-password", element: <ForgetPass /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position='top-right' autoClose={1000} />
    </AuthProvider>
  </React.StrictMode>
);
