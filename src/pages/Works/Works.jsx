import { useEffect, useState } from "react";
import websitesAPI from "../../services/websitesAPI";
import symfoImg from "../../symfony.jpg";
import { formatDate } from "../../tools/text";
import "./Works.scss";
import Modal from "../../components/Modal/Modal";
import ToTop from "../../components/ToTop/ToTop";
import { COVER_URL } from "../../config";
import usePageTitle from "../../tools/usePageTitle";
import useLightTrail from "../../tools/useLightTrail";
import LWLoader from "../../components/Loaders/LWLoader/LWLoader";

const Works = () => {

    const [loading, setLoading] = useState(true)
    const [works, setWorks] = useState()
    const [selectedWork, setSelectedWork] = useState(null);


    const fetchWorks = async () => {
        try {
            const datas = await websitesAPI.findAll();
            setWorks(datas.member)
            setLoading(false)
        } catch (error) {
            console.error("Une erreur est survenue au niveau de l'API")
        }
    }

    useEffect(() => {
        fetchWorks();
    },[])

    useLightTrail();

    usePageTitle();
    

    return ( 
        <>
            <section className="work-page">
                <h1>Mes sites web</h1>
                <div className={`works ${loading ? "one" : ""}`}>
                    {(!loading) ? (
                        works.map(work => (
                            <div key={work.id} className="work" onClick={() => setSelectedWork(work)} >
                                <div className="title">{work.title}</div>
                                <div className="cover">
                                    <img src={`${COVER_URL}${work.thumbnail}`} alt="" />
                                </div>
                                <div className="tools">
                                    {work.tools.slice(0,3).map(tool => (
                                        <div className="tool" key={tool.id}>
                                            <img src={`${COVER_URL}${tool.thumbnail}`} alt={`cover de ${tool.name}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="createdAt">
                                    {formatDate(work.createdAt)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="loading-zone">
                            <LWLoader />
                        </div>
                    )}
                </div>
            </section>
            <div className="light-trail-container"></div>
            <Modal 
                isOpen={selectedWork !== null}
                close={() => setSelectedWork(null)}
                work={selectedWork}
            />
            <ToTop />
        </>
     );
}
 
export default Works;