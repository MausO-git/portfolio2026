import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTitle() {
    const {pathname} = useLocation();

    useEffect(() => {
        const map = {
            "/": "Accueil",
            "/works": "Travaux",
            "/admin": "Admin",
            "/login": "Login"
        };

        const page = map[pathname];
        document.title = `Mauso - Portfolio 2026 - ${page}`
    },[pathname])
}