import styled from 'styled-components';

export const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0rem 6rem;
`;

export const PaginationHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0; 

    .paginationContainer{
        display: flex;
        font-size: 2rem;
        align-items: center;
    }

    .page{
        margin: 0 .5rem;
        padding: 1rem 1.5rem;
        cursor: pointer;
    }

    .active{
        border-radius: 50%;
        background: #5c5c5c6d;
    }
`;