import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../global/LoginContext";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Sidebar } from "../global/Sidebar";
import { StaffMembers } from "../team/StaffMembers";
import { Calendar } from "../calendar/Calendar";
import { FAQ } from "../faq/FAQ";
import { Contacts } from "../contacts/Contacts";
import { Form } from "../form/Form";
import { Dashboard } from "../Dashboard/Dashboard";
import { Topbar } from "../global/Topbar";
import { ColorModeContext,useMode } from "../../theme";
import { ManageIssue } from "../ManageIssue/ManageIssue";
import { ServiceDescription } from "../ServiceDescription/AddserviceDescption";
import { DeleteService } from "../ServiceDescription/DeleteService";
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
              <Route path="/manage-issue" element={<ManageIssue />} />
              <Route path="/add-service-description" element={<ServiceDescription />} />
              <Route path="/delete-service" element={<DeleteService />} />
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      </UserProvider>
    </ColorModeContext.Provider>
  );
};
