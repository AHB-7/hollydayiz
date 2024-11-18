import { Navbar } from "./components/layouts/nav";
import { AppRouter } from "./routes/routes";

function App() {
    return (
        <>
            <Navbar />
            <AppRouter />
        </>
    );
}

export default App;
