import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 10px;
    row-gap: 50px;
    margin: 50px 0;
`
export const CategoryTitle = styled.div`
    width: 100%;
    margin: 10px 0;
    font-size: 40px;
    :hover {
        cursor: pointer;
    }
`
export const CategoryLink = styled(Link)`
    color: black;
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
    letter-spacing: 10px;
    text-shadow: -1px 0 black, 0 1px black, 2px 0 black, 0 -1px black;
    color: rgb(255, 255, 255);
    :hover{
        color: rgb(255, 255, 255);
        background-color: black;
        box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
    }
`