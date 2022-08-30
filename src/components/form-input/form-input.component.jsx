import { Fragment } from 'react';
import {Input, InputLabel, Group, Select} from  './form-input.styles.jsx';

const FormInput = ({select, label, ...otherInputDetails }) => {
  return (
    <Group>
     {
      !select && (<Input {...otherInputDetails} />)
     }
      { select && (
              <Fragment>
                <Select>
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
                </Select>
              </Fragment>
      )}
      { label && ( // if label exists
        <InputLabel shrink={otherInputDetails['value'].length}>
          {label}
        </InputLabel>
        )}
    </Group>
  );
};
export default FormInput;