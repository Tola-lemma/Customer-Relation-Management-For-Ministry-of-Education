import  {CssBaseline,ThemeProvider} from "@mui/material"
import { ColorModeContext,useMode } from '../theme'
import { Topbar } from "../Pages/global/Topbar";
export const AdminPage = () => {
  const [theme,colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
