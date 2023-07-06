import { useFormikContext,useField } from 'formik';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';

interface OmCheckboxProps {
  name: string,
  label: string,
  legend: string,
  otherProps: any
}

export default function OmCheckbox( {name, label, legend, otherProps}:OmCheckboxProps ) {
    const {setFieldValue} = useFormikContext()
    const [field, meta] = useField(name);

    function handleChange(event: any) {
       const { checked } = event.target;
       setFieldValue(name, checked);
    }

    const configCheckBox = {
        ...otherProps,
        ...field,
        checked: meta.value,
        onChange : handleChange
    };
    const configFormControl: any = {};
    if(meta && meta.touched && meta.error)
    {
        configFormControl.error = true;
        configFormControl.helperText = meta.error;
    }
    return (
        <FormControl {...configFormControl}>
           <FormLabel component='legend'>{legend}</FormLabel>
           <FormGroup>
            <FormControlLabel 
                control={<Checkbox {...configCheckBox}/>}
                label={label} />
           </FormGroup>
        </FormControl>
    );
}