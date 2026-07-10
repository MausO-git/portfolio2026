import { useEffect, useState } from "react";
import "./FileInput.scss";

const FileInput = ({ name, onChange, value, error="", alt, label }) => {

    const [preview, setPreview] = useState(null)

    useEffect(() => {
        let previewUrl;

        if(value) {
            previewUrl = URL.createObjectURL(value);
            setPreview(previewUrl)
        }

        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    },[value])

    return ( 
        <div className="file-input">
            <label htmlFor={name}>{label}</label>
            <input 
                type="file"
                onChange={onChange}
                name={name}
                id={name}
            />
            {
                error && (
                    <p className="invalid-feedback" >{error}</p>
                )
            }
            {(value) ? (
                <img 
                    src={preview}
                    alt={"cover du projet " + alt}
                    className="preview"
                />
            ) : (
                <p>Ajoutez un fichier image</p>
            )}
        </div>
     );
}
 
export default FileInput;