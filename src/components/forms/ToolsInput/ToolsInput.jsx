import { useEffect, useState } from 'react';
import './ToolsInput.scss';
import toolsApi from '../../../services/toolsApi';

const ToolsInput = ({ name, label, value, onChange }) => {
    const [tools, setTools] = useState()
    const [loading, setLoading] = useState(true)

    const fetchTools = async () => {
        try {
            const data = await toolsApi.allTools()
            setTools(data.member)
            setLoading(false)
        } catch (error) {
            console.error("Une erreur est survenue au niveau de l'api")
        }
    }
    
    useEffect(() => {
        fetchTools()
    },[])

    return ( 
        <div className="tools-input">
            <label htmlFor={name} >{label}</label>
            <div className="tool-list">
                {(!loading) ? (   
                    tools.map(tool => (
                        <label key={tool.id} className='tool-item'>
                            <input 
                                type="checkbox" 
                                name={name}
                                value={tool.id}
                                checked={value.includes(tool.id)}
                                onChange={onChange}
                            />
                            {tool.name}
                        </label>
                    ))
                ) : ""}
                
            </div>
        </div>
     );
}
 
export default ToolsInput;