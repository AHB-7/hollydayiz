import { Route, Routes } from "react-router-dom";
import { Venues } from "../components/venues/venues";
import { Register } from "../components/auth/register";
import { SingleProfile } from "../components/profile/single-profile";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Venues />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/holidaze/profiles/:profilename"
                element={<SingleProfile />}
            />
        </Routes>
    );
}
