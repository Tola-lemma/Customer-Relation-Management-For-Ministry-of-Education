import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SupportHome } from "./ClientContainer/Home/SupportCenterHome/SupportHome";
import { Knowledgebase } from "./ClientContainer/Home/Knowledgebase/Knowledgebase";
export const App =()=> {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SupportHome />,
    },
    {
      path: "/knowledgebase",
      element: <Knowledgebase />,
    }
])
  return <RouterProvider router={router}/>
}
