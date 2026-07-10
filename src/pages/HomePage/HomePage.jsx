import "./HomePage.scss";
import websitesAPI from "../../services/websitesAPI";
import { useEffect, useState } from "react";
import LastWorks from "../../components/LastWorks/LastWorks";
import Skills from "../../components/Skills/Skills";
import ToTop from "../../components/ToTop/ToTop";
import Modal from "../../components/Modal/Modal";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import usePageTitle from "../../tools/usePageTitle";
import useLightTrail from "../../tools/useLightTrail";
import LWLoader from "../../components/Loaders/LWLoader/LWLoader"

const HomePage = (props) => {
    const [lWebsites, setLWebsites] = useState([]);
    const [selectedWork, setSelectedWork] = useState(null);
    const [loading, setLoading] = useState(true)

    const fetchLastWebsites = async () => {
        try {
            const datas = await websitesAPI.last();
            setLWebsites(datas.data.member)
            setLoading(false)
        } catch (error) {
            console.error("Une erreur est survenue au niveau de l'API")
        }
    }

    useEffect(() => {
        fetchLastWebsites();
    },[])


    useLightTrail();

    usePageTitle();

    return ( 
        <>
            <div className="light-trail-container"></div>
            <section className="intro">
                <div className="intro-content">
                    <h1 className="name">Oscar Maus</h1>
                    <h2 className="title">Web Developer</h2>
                    <p className="description">
                        Développeur front‑end et back‑end passionné par l'innovation et les expériences web modernes.
                    </p>
                </div>
                <div className="cta">
                    <div className="fa-text">
                        Découvrez mes projets
                    </div>
                    <div className="cta-scroll">
                        <FontAwesomeIcon icon={faAnglesDown} style={{color: "rgb(0, 0, 0)",}} />
                    </div>
                </div>
            </section>
            <section className="lastworks">
                <h2 className="title">Mes derniers projets</h2>
                {(!loading) ? (
                    <div className="grid last">
                        {lWebsites.map(webs => (
                            <LastWorks
                                id={webs.id} 
                                key={webs.id} 
                                onClick={() => setSelectedWork(webs)} 
                            />
                        ))}
                    </div>
                ) : (
                    <LWLoader />
                )}
                <NavLink to="/works" className="link" >Voir tous mes projets</NavLink>
            </section>
            <section className="skills">
                <Skills />
            </section>
            <ToTop />
            <Modal 
                isOpen={selectedWork !== null}
                close={() => setSelectedWork(null)}
                work={selectedWork}
            />
        </>
     );
}
 
export default HomePage;