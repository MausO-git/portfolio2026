import { useEffect, useState } from "react";
import "./Skills.scss"
import toolsApi from "../../services/toolsApi";
import { COVER_URL } from "../../config";
import LWLoader from "../Loaders/LWLoader/LWLoader";

const Skills = (props) => {

    const [skills, setSkills] = useState();
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        try {
            const res = await toolsApi.allTools();
            setSkills(res.member);
            setLoading(false);
        } catch (error) {
            console.error("Une erreur est survenue au niveau de l'API")
        }
    }

    useEffect(() => {
        fetchSkills()
    },[])

    return ( 
        <>
            <h2 className="skillTitle">Compétences</h2>
            {(!loading) ? (
                <div className="grid skill">
                    {skills.map(skill => (
                        <div className="grid-elem" key={skill.id}>
                            <div className="name">
                                {skill.name}
                            </div>
                            <img src={`${COVER_URL}${skill.imageUrl}`} alt="" />
                        </div>
                    ))}
                </div>
            ) : (
                <LWLoader />
            )}
        </>
     );
}
 
export default Skills;