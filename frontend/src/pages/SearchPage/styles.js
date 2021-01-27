import styled from 'styled-components';

export const DoujinContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 0rem;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const HeaderContainer = styled.div`
    width: 100%;
    background: #2c2c2c;
    display: flex;
    align-items: center;
    padding: 3rem;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const Text = styled.p`
    font-size: 1.5rem;
    padding: 1rem;
`

export const TitleContent = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    max-width: 110rem;
`;

export const Content = styled.div`
    display: flex;
`;

export const TitleContainer = styled.div`
    text-align: center;
    font-size: 2rem;
    font-weight: bolder;

    @media screen and (max-width: 414px) {
        font-size: 1.5rem;
    }
`;

export const Title = styled.h1`
    color: #ff6a00;
`;

export const GalleryContainer = styled.div`
    width: 100%;
    max-width: 112rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const AditionalContainer = styled.div`
    display: flex;
    opacity: .5;
`;