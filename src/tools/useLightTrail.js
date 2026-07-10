import { useEffect } from "react";

export default function useLightTrail() {
    useEffect(() => {
        const container = document.querySelector(".light-trail-container");

        if(!container) return;

        const handleMove = (e) => {
            const trail = document.createElement("div");
            trail.className = "light-trail";
            trail.style.left = e.clientX + "px";
            trail.style.top = e.clientY + "px";

            container.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 600);
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    },[])
}