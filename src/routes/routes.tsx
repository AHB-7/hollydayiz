import { Route, Routes } from "react-router-dom";
import { Venues } from "../components/venues/venues";
import { Register } from "../components/auth/register";
import { SingleProfile } from "../components/profile/single-profile";
import { SingleVenue } from "../components/single-venue/single-venue";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Venues />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/holidaze/profiles/:username"
                element={<SingleProfile />}
            />
            <Route path="/holidaze/venues/:venueId" element={<SingleVenue />} />
        </Routes>
    );
}
