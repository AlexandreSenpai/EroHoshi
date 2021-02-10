import styled from 'styled-components';

export const ThumbImage = styled.div`
    background: url(${props => props.thumbnail});
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 3px;
`;

export const Shadow = styled.div`

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 150ms ease-in;
    
    :hover{
        cursor: pointer;
        opacity: 1;
    }
 
`;

export const ThumbContainer = styled.div`
    margin: .3rem;
    width: 23rem;
    height: 35rem;
    overflow: hidden;
    position: relative;
    background: #000000;

    &:hover ${Shadow}{
        cursor: pointer;
    }

    @media screen and (max-width: 1366px) {
        width: 19rem;
        height: 29rem;
    }
    
    @media screen and (max-width: 1280px) {
        width: 18rem;
        height: 28rem;
    }
    
    @media screen and (max-width: 1024px) {
        width: 16rem;
        height: 26rem;
    }
    
    @media screen and (max-width: 414px) {
        width: 18rem;
        height: 25rem;
        margin: .2rem;
    }
    
    @media screen and (max-width: 411px) {
        width: 17.6rem;
        height: 25rem;
        margin: .2rem;
    }
    
    @media screen and (max-width: 375px) {
        width: 16.8rem;
        height: 25rem;
        margin: .2rem;
    }

`;

export const ThumbDescription = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: .8rem;
    position: relative;
    z-index: 999;    
    background: linear-gradient(to top, #000000, transparent);
`;

export const ThumbTitle = styled.p`
    text-overflow: ellipsis;
    font-size: 1.5rem;
    overflow: hidden; 
    width: 100%;
    text-align: center;
    color: #f1f1f1;

    @media screen and (max-width: 414px) {
        font-size: 1.2rem;
    }

`;

export const ThumbLanguage = styled.div`
    width: 100%;
    position: absolute;
    display: flex;
    padding: .5rem;
    justify-content: flex-end;
`;

export const Language = styled.img`
    width: 40px;
    height: 25px;
`;