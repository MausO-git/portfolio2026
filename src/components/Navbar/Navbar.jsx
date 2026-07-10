import "./Navbar.scss";
import logo from "../../logo_ptf.png"
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";


const Navbar = (props) => {
    
    const loc = useLocation();
    const isAdmin = loc.pathname.startsWith("/admin");

    const [isOpen, setIsOpen] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);

    const handleBurgerMenu = () => {
        setIsOpen(!isOpen);
    };

    useState(() => {
        let lastScroll = 0;

        /**
         * Change l'état du state scrollDown lorsqu'un scroll vers le bas
         */
        const handleScrollDown = () => {
            const currentScroll = window.scrollY;

            if(currentScroll > lastScroll) {
                setScrollDown(true)
            } else {
                setScrollDown(false)
            }

            lastScroll = currentScroll;
        };

        window.addEventListener("scroll", handleScrollDown);
        return () => window.removeEventListener("scroll", handleScrollDown);
    },[])

    return ( 
        <>
            <nav className={`${(scrollDown) ? "up" : ""}`}>
                <NavLink className="logo" to={(!isAdmin) ? "/" : "/admin"} >
                    <img src={logo} alt="logo du portfolio representant un M" />
                </NavLink>
                {(!isAdmin) ? (
                    <a href="mailto:contact@mausosc.com" className="contact" >contact@mausosc.com<FontAwesomeIcon icon={faEnvelope} style={{color: "rgb(0, 0, 0)",}} /></a>
                ) : ""}
                <ul className="nav-menu">
                    <li className="menu-elem">
                        <NavLink to={(!isAdmin) ? "/" : "/admin"} className="link">Accueil</NavLink>
                    </li>
                    <li className="menu-elem">
                        <NavLink to={(!isAdmin) ? "/works" : "/admin/works"} className="link">Mes sites</NavLink>
                    </li>
                    {(!isAdmin) ? (
                        <li className="menu-elem">
                            <a href="#contact" className="link">Contact</a>
                        </li>
                    ) : (
                        <li className="menu-elem">
                            <NavLink to="/admin/skills" className="link">Mes skills</NavLink>
                        </li>
                    )}
                    
                </ul>
                <div className="burger" onClick={handleBurgerMenu}>
                    <div className={`bar b1 ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar b2 ${isOpen ? "open" : ""}`}></div>
                    <div className={`bar b3 ${isOpen ? "open" : ""}`}></div>
                </div>
            </nav>
            <div className={`menu-burger ${isOpen ? "open" : ""}`}>
                <ul className="nav-menu">
                    <li className="menu-elem">
                        <NavLink to={(!isAdmin) ? "/" : "/admin"} className="link" onClick={handleBurgerMenu} >Accueil</NavLink>
                    </li>
                    <li className="menu-elem">
                        <NavLink to={(!isAdmin) ? "/works" : "/admin/works"} className="link" onClick={handleBurgerMenu} >Mes sites</NavLink>
                    </li>
                    {(!isAdmin) ? (
                        <li className="menu-elem">
                            <a href="#contact" className="link">Contact</a>
                        </li>
                    ) : (
                        <li className="menu-elem">
                            <NavLink to="/admin/skills" className="link">Mes skills</NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </>
     );
}
 
export default Navbar;