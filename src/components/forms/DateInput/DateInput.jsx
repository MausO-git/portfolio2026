import './DateInput.scss'

const DateInput = ({ label, name, value, onChange }) => {
    return ( 
        <div className="date-input">
            <label htmlFor={name}>{label}</label>
            <input 
                type="date"
                name={name}
                id={name}
                value={value || ""}
                onChange={onChange}
            />
        </div>
     );
}
 
export default DateInput;