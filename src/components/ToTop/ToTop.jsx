import "./ToTop.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const ToTop = (props) => {

    const [showBackTop, setShowBackTop] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    useEffect(() => {
        const handleScroll = () => {
            const posScroll = document.body.scrollTop || document.documentElement.scrollTop;

            setShowBackTop(posScroll > 200);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },[])

    return ( 
        <div className={`to-top ${showBackTop ? 'visible' : ''}`} onClick={scrollToTop} >
            <FontAwesomeIcon icon={faAnglesUp} size="lg" />
        </div>
     );
}
 
export default ToTop;