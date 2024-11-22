import { Link } from "react-router-dom";
import {
    LogOut,
    LogInContainer,
    LowerNav,
    Navbar as NavbarSc,
    UpperNav,
    FiLogIn,
    MdOutlineMenu,
} from "../../styles/index";
import { Login } from "../index";
import { useEffect } from "react";
import { useStore } from "../../util/global/zustand-store";

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
    } = useStore();

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
        window.location.href = "/";
    };
    const navigate = (path: string) => {
        window.location.href = path;
    };
    const handleProfileClick = () => {
        const name = localStorage.getItem("name");
        if (name) {
            setOtherUsersName(name);
            navigate(`/holidaze/profiles/${name}`);
        } else {
            setOtherUsersName(null);
            navigate(`/holidaze/profiles/`);
        }
    };
    const verified = Boolean(accessToken);

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
                                onClick={handleProfileClick}
                                to={`/holidaze/profiles/${otherUsersName}`}
                            >
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
