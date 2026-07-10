import { useEffect, useState } from "react";
import "./LastWorks.scss";
import { WEBSITES_API } from "../../config";
import Axios from "axios";
import { truncateDesc, formatDate } from "../../tools/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { COVER_URL } from "../../config";
import LWLoader from "../Loaders/LWLoader/LWLoader";


const LastWorks = (props) => {
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(true)

    const fetchDetails = async () => {
        try {
            const res = await Axios.get(`${WEBSITES_API}/${props.id}`)
            setDetails(res.data)
            setLoading(false)
        } catch(error) {
            console.error("Une erreur est survenue au niveau de l'api")
        }
    }

    // if(!loading){
    //     console.log(details)
    // }

    useEffect(() => {
        fetchDetails()
    },[])

    return ( 
        <div className="card" onClick={props.onClick}>
            {(!loading) ? (
                <>
                    <div className="title">
                    <h4>{details.title}</h4>
                    </div>
                    <div className="cover">
                        <img src={`${COVER_URL}${details.thumbnail}`} alt={"couverture du site " + details.title} />
                    </div>
                    <div className="desc">{truncateDesc(details.description, 20)}</div>
                    <div className="tools">
                        {details.tools.map(tool => (
                            <img src={`${COVER_URL}${tool.thumbnail}`} alt={tool.name} key={tool.id} />
                        ))}
                    </div>
                    <div className="siteLink">
                        <div className="gr">
                            <FontAwesomeIcon icon={faEarthAmericas} className="fa" size="lg" />
                            <a href={details.url}>Aller voir le site</a>
                        </div>
                    </div>
                    <div className="gitLink">
                        <div className="gr">
                            <FontAwesomeIcon icon={faGithub} className="fa" size="lg" />
                            <a href={details.githubUrl}>Aller voir le github</a>
                        </div>
                    </div>
                    <div className="createdAt">
                        {formatDate(details.createdAt)}
                    </div>
                </>
            ) : (
                <LWLoader />
            )}
        </div>
     );
}
 
export default LastWorks;