import styled from 'styled-components';

export const SectionContainer = styled.section`
    width: 100%;
    padding: 1.5rem;
    margin: 2rem 2rem 2rem 0;
    background: #242426;
    border-radius: 5px;
    border: 1px solid #0000006d;

    @media screen and (max-width: 414px) {
        margin: 2rem 0rem;
    }

    @media screen and (max-width: 360px) {
        padding: .5rem;
    }

`;

export const TitleSectionContainer = styled.div`
    width: 100%;
    margin: 0 0 1rem 0;
    padding: 0 3rem;
    display: flex;
    font-size: 3rem;
    align-items: center;
    color: #ff6a00;

    @media screen and (max-width: 414px) {
        justify-content: center;
    }
`;

export const TitleSection = styled.h2`
    font-size: 3rem;
    margin: 0 1rem;
    color: #f1f1f1;
`;

export const SectionThumbsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    .ui, .inverted, .segment{
        width: 200px;
        height: 100px;
    }
`;