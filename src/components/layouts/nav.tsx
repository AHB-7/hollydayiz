import { Link } from "react-router-dom";
import {
    LogOut,
    LogInContainer,
    LowerNav,
    Navbar as NavbarSc,
    UpperNav,
    FiLogIn,
    MdOutlineMenu,
    NavContainer,
} from "../../styles/index";
import { Login } from "../index";
import { useEffect } from "react";
import { useUserPreferences } from "../../util/global/zustand-store";

export function Navbar() {
    const {
        accessToken,
        navbarState,
        setNavbarState,
        setAccessToken,
        setMail,
        otherUsersName,
        setOtherUsersName,
        initializeFromStorage,
        setVenueManager,
        setName,
    } = useUserPreferences();

    useEffect(() => {
        initializeFromStorage();
    }, [initializeFromStorage]);

    useEffect(() => {
        const name = localStorage.getItem("name");
        if (name) {
            setOtherUsersName(name);
        } else {
            setOtherUsersName(null);
        }
    }, [setOtherUsersName]);
    const path = window.location.pathname;

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
        setVenueManager(false);
        setName(null);
        window.location.href = "/";
    };
    const userName = localStorage.getItem("name");

    const handleProfileClick = () => {
        setOtherUsersName(userName);
    };
    const verified = Boolean(accessToken);

    return (
        <NavContainer>
            <NavbarSc>
                <UpperNav>
                    <Link to="/">
                        <img
                            src="/logo.svg"
                            alt="asa"
                            onClick={() => setNavbarState(false)}
                        />
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
                    <div>
                        {navbarState && (
                            <LowerNav>
                                <Login />
                            </LowerNav>
                        )}
                    </div>
                ) : (
                    <>
                        {navbarState && (
                            <LowerNav>
                                <Link
                                    style={
                                        path ===
                                        `/holidaze/profiles/${userName}`
                                            ? { color: "#2ecc71" }
                                            : { color: "white" }
                                    }
                                    onClick={() => {
                                        setNavbarState(false);
                                    }}
                                    onMouseDown={() => handleProfileClick()}
                                    to={`/holidaze/profiles/${otherUsersName}`}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/"
                                    onClick={() => setNavbarState(false)}
                                    style={
                                        path === "/"
                                            ? { color: "#2ecc71" }
                                            : { color: "white" }
                                    }
                                >
                                    Venues
                                </Link>
                                <LogOut onClick={logOut}>Logout</LogOut>
                            </LowerNav>
                        )}
                    </>
                )}
            </NavbarSc>
        </NavContainer>
    );
}
