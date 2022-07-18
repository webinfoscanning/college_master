import Routers from "./Routers";
import ThemeProvider from "./theme";


function App() {
  return (
    <ThemeProvider>
      <Routers />
    </ThemeProvider>
  );
}

export default App;
