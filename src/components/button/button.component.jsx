import {BaseButton, InvertedButton, GoogleSignInButton} from "./button.styles";

export const BUTTON_TYPES_CLASSES = {
  base:'base', // default type
  google: "google-sign-in",
  inverted: "inverted",
};
const getButton = (buttonType = BUTTON_TYPES_CLASSES.base)=>{
  return ({
    [BUTTON_TYPES_CLASSES.base]:BaseButton,
    [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPES_CLASSES.inverted]: InvertedButton
  }[buttonType])
}
const Button = ({ children, buttonType='base', ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
      <CustomButton {...otherProps}>
        {children}
      </CustomButton>
  );
};

export default Button;
