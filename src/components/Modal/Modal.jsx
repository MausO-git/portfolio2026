import { useEffect } from "react";
import "./Modal.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../tools/text";
import { COVER_URL } from "../../config";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEarthAmericas, faPalette } from "@fortawesome/free-solid-svg-icons";

const Modal = (props) => {

    useEffect(() => {
        /**
         * Permet de fermer le modal en pressant esc
         * @param {*} e 
         */
        const handleEsc = (e) => {
            if(e.key === "Escape") props.close();
        }
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    },[props.close])

    useEffect(() => {
        document.body.style.overflow = props.isOpen ? "hidden" : "auto"
    })

    return ( 
        <>
            {(props.work !== null) ? (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={`${COVER_URL}${props.work.cover}`} alt={`cover du site ${props.work.title}`} className="modal-cover" />
                        <span className="modal-date">{formatDate(props.work.createdAt)}</span>
                        <h2 className="modal-title">{props.work.title}</h2>
                        <p className="modal-description">{props.work.description}</p>
                        <div className="modal-tools">
                            {props.work.tools.map((tool) => (
                                <span key={tool.id} className="tool-badge">
                                    <img src={`${COVER_URL}${tool.thumbnail}`} alt={`symbole du l'outil ${tool.name}`} />
                                </span>
                            ))}
                        </div>
                        <div className="modal-link">
                            <a href={props.work.url} className="modal-btn" target="_blank" title="Voir le site web" rel="noreferrer">
                                <FontAwesomeIcon icon={faEarthAmericas} className="fa" size="lg" />
                            </a>
                            <a href={props.work.githubUrl} className="modal-btn" target="_blank" title="Github" rel="noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="fa" size="lg" />
                            </a>
                            {(props.work.figmaUrl) ? (
                                <a href={props.work.figmaUrl} className="modal-btn" target="_blank" title="Voir la maquette" rel="noreferrer">
                                    <FontAwesomeIcon icon={faPalette} className="fa" size="lg" />
                                </a>
                            ) : ""}  
                        </div>
                        <div className="modal-close" onClick={() => props.close()}>
                            <FontAwesomeIcon icon={faXmark} style={{color: "rgb(255, 255, 255)",}} size="lg" />
                        </div>
                    </div>
                </div>
            ) : ""}
        </>
     );
}
 
export default Modal;