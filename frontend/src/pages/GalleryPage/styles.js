import styled from 'styled-components';


export const GalleryContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const ContentHolder = styled.div`
    margin: 2rem 0rem;

    @media screen and (max-width: 414px) {
        margin: 1rem 0rem;
    }
`;

export const Image = styled.img`
    width: 100%;
`

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1rem;
`;

export const PaginationHolder = styled.div`
    width: 100%;
    max-width: 100rem;
    height: 5rem;
    background: #242426;
    border-radius: 5px;
    margin: 0rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
`;