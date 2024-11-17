import { Navbar } from "./components/layouts/nav";
import { AppRouter } from "./routes/routes";

function App() {
    return (
        <>
            <AppRouter /> <Navbar />
        </>
    );
}

export default App;
