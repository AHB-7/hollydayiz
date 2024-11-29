import { Route, Routes } from "react-router-dom";
import { Venues } from "../components/venues/venues";
import { Register } from "../components/auth/register";
import { SingleProfile } from "../components/profile/single-profile";
import { Users } from "../components/users/users";
import { SingleVenue } from "../components";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Venues />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route
                path="/holidaze/profiles/:username"
                element={<SingleProfile />}
            />
            <Route path="/holidaze/venues/:venueId" element={<SingleVenue />} />
        </Routes>
    );
}
