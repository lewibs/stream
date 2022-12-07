import React from 'react';
import Terminal from './Terminal';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';
import entries from "./entries.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/0",
    element: <Home />,
  },
  ...entries.map((title, i)=>{
    return {
      path: "/" + (i + 1),
      element: <Terminal path={"/stream/" + title} />
    }
  }),
  {
    path: "*",
    element: <Terminal>{"hmmmmmmm... I haven't been here yet.\nTry entering 'help' if you're lost\n"}</Terminal>
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;