import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { StaffTopbar } from "../Pages/global/Topbar";
import { Routes, Route } from "react-router-dom";
import { StaffDashboard } from "../Pages/Dashboard/Dashboard";
import { StaffContact } from "../Pages/Contact/Contact";
import { StaffCalendar } from "../Pages/Calendar/Calendar";
import { StaffFAQ } from "../Pages/Faq/FAQ";
import { StaffSidebar } from "../Pages/global/Sidebar";
import { ErrorMessage } from "../../Admin/ToastErrorPage/ErrorMessage";
import { PageNotFound } from "../../Admin/Pages/PageNotFound/PageNotFound";

export const StaffPage = () => {
    const [theme, colorMode] = useMode("dark");
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ErrorMessage />
          <CssBaseline />
          <div className="app">
            <StaffSidebar />
            <main className="content">
              <StaffTopbar />
              <Routes>
                <Route path="/" element={<StaffDashboard />} />
                <Route path="/contact" element={<StaffContact />} />
                <Route path="/faq" element={<StaffFAQ />} />
                <Route path="/calendar" element={<StaffCalendar />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };
  
