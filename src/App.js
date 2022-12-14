import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from './Home';

const baseURL = "https://raw.githubusercontent.com/lewibs/stream/main/public/stream/";
const Error = <Terminal>{"Error: 404\nhmmmmmmm... I haven't been here yet.\nTry entering 'help' if you're lost\n"}</Terminal>

const App = () => {
  const [router, setRouter] = useState();

  useEffect(()=>{
    fetch(baseURL + "entries.json")
      .then(response => response.json())
      .then(entries => {
        const router = createBrowserRouter([
          {
            path: "/",
            errorElement: Error,
            element: <Home entries={entries}/>,
          },
          ...entries.map((title, i)=>{
            return {
              path: "/" + i,
              errorElement: Error,
              element: <Terminal path={"https://raw.githubusercontent.com/lewibs/stream/main/public/stream/" + title} />
            }
          }),
          {
            path: "*",
            errorElement: Error,
            element: Error,
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