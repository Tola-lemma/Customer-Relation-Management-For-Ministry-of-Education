import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SupportHome } from "./ClientContainer/Home/SupportCenterHome/SupportHome";
import { Knowledgebase } from "./ClientContainer/Home/Knowledgebase/Knowledgebase";
import { OpenTicket } from "./ClientContainer/Home/Ticket/OpenNewTicket/OpenTicket";
import { CheckTicket } from "./ClientContainer/Home/Ticket/CheckTicketStatus/CheckTicket";
import { LoginPage } from "./ClientContainer/Admin/LoginPage/LoginPage";
import { AdminPage } from "./ClientContainer/Admin/Dashboard/AdminPage";
export const App =()=> {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SupportHome />,
    },
    {
      path: "/knowledgebase",
      element: <Knowledgebase />,
    },
    {
      path: "/opennewticket",
      element: <OpenTicket />,
    },
    {
      path: "/checkticketstatus",
      element: <CheckTicket/>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    }
])
  return <RouterProvider router={router}/>
}
