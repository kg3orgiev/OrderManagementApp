import { useFormikContext } from 'formik';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
 
interface OmSubmitButtonProps {
  children: any,
  otherProps: any
}

export default function OmSubmitButton({children, otherProps} :OmSubmitButtonProps ) {
    const {submitForm} = useFormikContext()
   
    function handleSubmit() {
        submitForm();
    }

    const configButton = {
        ...otherProps,
        fullWidth : true,
        color: 'primary',
        variant : 'contained',
        onClick : handleSubmit
    };

    return <Button {...configButton} endIcon={<SendIcon />}>{children}</Button>

}