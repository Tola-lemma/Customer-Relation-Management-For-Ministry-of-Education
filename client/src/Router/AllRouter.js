import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../App'
export const AllRouter =()=> {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    }
])
  return <RouterProvider router={router}/>
}
