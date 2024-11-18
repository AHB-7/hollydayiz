import { Link } from "react-router-dom";
import {
    LogInContainer,
    LowerNav,
    Navbar as NavbarSc,
    UpperNav,
} from "../../styles/layout/nav";
import { useEffect } from "react";
import { FiLogIn } from "react-icons/fi";
import { MdOutlineMenu } from "react-icons/md";
import { LogOut } from "../../styles/auth/auth";
import { Login } from "../auth/login";
import { useStore } from "../../util/global/local-storage";

export function Navbar() {
    const {
        accessToken,
        navbarState,
        setNavbarState,
        setAccessToken,
        setMail,
        initializeFromStorage,
    } = useStore();

    useEffect(() => {
        initializeFromStorage();
    }, [initializeFromStorage]);

    const toggleActiveState = () => {
        setNavbarState(!navbarState);
    };

    const toggleLogIn = () => {
        setNavbarState(!navbarState);
    };

    const logOut = () => {
        setAccessToken(null);
        setNavbarState(false);
        initializeFromStorage();
        setMail(null);
    };

    const verified = Boolean(accessToken);

    const name = localStorage.getItem("name");
    return (
        <NavbarSc>
            <UpperNav>
                <Link to="/">
                    <img src="/logo.svg" alt="asa" />
                </Link>

                {!verified ? (
                    <LogInContainer onClick={toggleLogIn}>
                        <p>LogIn</p>
                        <FiLogIn stroke="white" />
                    </LogInContainer>
                ) : (
                    <LogInContainer>
                        <MdOutlineMenu
                            fill="white"
                            onClick={toggleActiveState}
                        />
                    </LogInContainer>
                )}
            </UpperNav>
            {!verified ? (
                <>
                    {navbarState && (
                        <LowerNav>
                            <Login />
                        </LowerNav>
                    )}
                </>
            ) : (
                <>
                    {navbarState && (
                        <LowerNav>
                            <Link to={`/holidaze/profiles/${name}`}>
                                Profile
                            </Link>
                            <Link to="/booking">Booking</Link>
                            <LogOut onClick={logOut}>Logout</LogOut>
                        </LowerNav>
                    )}
                </>
            )}
        </NavbarSc>
    );
}
