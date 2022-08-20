import { Fragment } from 'react';
import './form-input.styles.scss';

const FormInput = ({select, label, ...otherInputDetails }) => {
  return (
    <div className="group">
     {
      !select && (<input className="form-input" {...otherInputDetails} />)
     }
      { select && (
              <Fragment>
                <div className='select'>
                  <select name={`${otherInputDetails['name']}`} {...otherInputDetails}>
                    { 
                      <Fragment>
                        <option key='0' value=''>Choose {otherInputDetails['name'].charAt(0).toUpperCase() + otherInputDetails['name'].slice(1)}</option>
                        {otherInputDetails['options'].map((option)=>{
                          return <option key={option} value={option}>{option}</option>
                        })}
                      </Fragment>
                    }
                  </select>
                </div>
              </Fragment>
      )}
      { label && ( // if label exists
        <label className={`${otherInputDetails["value"].length ? "shrink" : ""} form-input-label`}>
          {label}
        </label>
        )}
    </div>
  );
};
export default FormInput;