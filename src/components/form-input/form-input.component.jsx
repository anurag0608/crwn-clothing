import './form-input.styles.scss';

const FormInput = ({ label, ...otherInputDetails }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherInputDetails} />
    { label && ( // if label exists
        <label
            className={`${
            otherInputDetails["value"].length ? "shrink" : ""} form-input-label`}
        >
            {label}
        </label>
        )
    }
    </div>
  );
};
export default FormInput;
