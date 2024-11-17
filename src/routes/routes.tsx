import { Route, Routes } from "react-router-dom";
import { Venues } from "../components/venues/venues";
import { Register } from "../components/auth/register";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Venues />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}
