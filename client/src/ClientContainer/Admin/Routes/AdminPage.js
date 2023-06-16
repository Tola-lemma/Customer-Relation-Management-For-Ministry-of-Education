import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Topbar } from "../Pages/global/Topbar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../Pages/Dashboard/Dashboard";
import { Contacts } from "../Pages/contacts/Contacts";
import { Form } from "../Pages/form/Form";
import { FAQ } from "../Pages/faq/FAQ";
import { Calendar } from "../Pages/calendar/Calendar";
import { StaffMembers } from "../Pages/team/StaffMembers";
import { PageNotFound } from "../Pages/PageNotFound/PageNotFound";
import { Sidebar } from "../Pages/global/Sidebar";
import { UserProvider } from "../Pages/global/LoginContext";
export const AdminPage = () => {
  const [theme, colorMode] = useMode("dark");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <UserProvider >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<StaffMembers />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </UserProvider>
    </ColorModeContext.Provider>
  );
};
