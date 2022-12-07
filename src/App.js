import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home';

const baseURL = "https://raw.githubusercontent.com/lewibs/stream/main/public/stream/";

const App = () => {
  const [router, setRouter] = useState();

  useEffect(()=>{
    fetch(baseURL + "entries.json")
      .then(response => response.json())
      .then(entries => {
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
              element: <Terminal path={"https://raw.githubusercontent.com/lewibs/stream/main/public/stream/" + title} />
            }
          }),
          {
            path: "*",
            element: <Terminal>{"hmmmmmmm... I haven't been here yet.\nTry entering 'help' if you're lost\n"}</Terminal>
          }
        ]);

        setRouter(router);
      });
  }, []);

  return (
    router && <RouterProvider router={router} />
  );
};

export default App;