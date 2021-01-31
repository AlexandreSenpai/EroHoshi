import styled from 'styled-components';

export const SearchContainer = styled.div`
    width: 100%;
    max-width: 100rem;
    border-radius: 3px;
    background: #ff6a00;
    display: flex;
    align-items: center;
    background: red;
    font-size: 2rem;
    margin: 0rem 15rem 0rem 2rem;

    @media screen and (max-width: 414px) {
        margin: 0rem 2rem 0rem 0rem;
    }
`;

export const SearchInput = styled.input`
    width: 93%;
    height: 3.5rem;
    background: #18191A;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: none;
    padding: 1rem;
    color: #f1f1f1;
    font-size: 1.5rem;

    @media screen and (max-width: 414px) {
        width: 95%;
    }
`;

export const SearchButton = styled.button`
    width: 7%;
    height: 3.5rem;
    border: none;
    background: #ff6a00;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f1f1f1;
    transition: 100ms ease-in;

    :hover{
        opacity: .5;
        cursor: pointer;
    }

    @media screen and (max-width: 414px) {
        width: 15%;
    }

`;
