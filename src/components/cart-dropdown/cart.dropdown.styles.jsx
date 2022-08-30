import styled from "styled-components";
import {BaseButton, InvertedButton, GoogleSignInButton} from "../button/button.styles";


export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${InvertedButton},
  ${GoogleSignInButton}{
      margin-top: auto;
      font-size: 12px;
  }
`
export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`
export const Child = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
  overflow-y: scroll;
`