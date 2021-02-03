import styled from 'styled-components';

export const UserAvatar = styled.img`
    min-width: 4rem;
    max-width: 4rem;
    height: 4rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #0000006d;
    margin-right: 1rem;
    cursor: pointer;

    @media screen and (max-width: 414px) {
        display: none;
    }
`;

export const UserOptionsContainer = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    
    @media screen and (max-width: 414px) {
        display: none;
    }
`;

export const UnorderedList = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 8px 0px;
    border: 1px solid #0000006d;
    background: #242426;
    font-size: 1.5rem;
    border-radius: 5px;
    position: absolute;
    top: 5rem;
    right: 1.5rem;
    min-width: 15rem;
    z-index: 9999;
`;

export const ListItem = styled.li`
    width: 100%;
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    cursor: pointer;
    filter: grayscale(100%);
    transition: 100ms ease;

    :hover{
        background: #303030;
        filter: grayscale(0%);
    }

    svg{
        margin-right: 1rem;
        color: #ff6a00;
    }
`;