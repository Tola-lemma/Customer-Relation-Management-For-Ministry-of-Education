import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { Topbar } from "../../global/Topbar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../../Dashboard/Dashboard";
import { Contacts } from "../../contacts/Contacts";
import { Form } from "../../form/Form";
import { FAQ } from "../../faq/FAQ";
import { Calendar } from "../../calendar/Calendar";
import { StaffMembers } from "../StaffMembers";
import { PageNotFound } from "../../PageNotFound/PageNotFound";
import { Sidebar } from "../../global/Sidebar";
import { UserProvider } from "../../global/LoginContext";
import { ErrorProvider } from "../../../ToastErrorPage/ErrorContext";
export const AdminPage = () => {
  const [theme, colorMode] = useMode("dark");
  return (
    <ColorModeContext.Provider value={colorMode}>
      <UserProvider >
      <ErrorProvider>
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
      </ErrorProvider>
      </UserProvider>
    </ColorModeContext.Provider>
  );
};
