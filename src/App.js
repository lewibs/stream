import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from './Home';

const baseURL = "https://raw.githubusercontent.com/lewibs/stream/main/public/stream/"; //keep this pointing to the raw!
const Error = <Terminal>{"Error: 404\nhmmmmmmm... I haven't been here yet.\nTry entering 'help' if you're lost\n"}</Terminal>

const App = () => {
  const [router, setRouter] = useState();

  useEffect(()=>{
    fetch(baseURL + "entries.json")
      .then(response => response.json())
      .then(entries => {
        const router = createHashRouter([
          {
              path: "/",
              errorElement: Error,
              element: <Home entries={entries} />,
          },
          {
              path: "/:id",
              errorElement: Error,
              element: <Terminal />,
              loader: ({ params }) => {
                  const entry = entries.find(e => e.key == params.id);
                  return entry ? { path: baseURL + entry.title } : null;
              }
          },
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