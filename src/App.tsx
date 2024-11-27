import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/layouts/nav";
import { AppRouter } from "./routes/routes";

function App() {
    return (
        <HelmetProvider>
            <Navbar />
            <AppRouter />
        </HelmetProvider>
    );
}

export default App;
