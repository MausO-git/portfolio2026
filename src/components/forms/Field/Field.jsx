import "./Field.scss";

const Field = ({name, label, value, onChange, placeholder="", type="text", error=""}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {!(type === "textarea") ? (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || label}
                    name={name}
                    id={name}
                    className={"form-control" + (error && " is-invalid")}
                />
            ) : (
                <textarea 
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || label}
                    name={name}
                    id={name}
                    className={"form-control" + (error && " is-invalid")}
                />
            )}
            {
                error && (
                    <p className="invalid-feedback">{error}</p>
                )
            }
        </div>
    )
}

export default Field;