import styled from 'styled-components';

export const NavContainer = styled.nav`
    width: 100%;
    height: 5rem;
    position: fixed;
    display: flex;
    z-index: 9999;
    align-items: center;
    background: #242426;
    justify-content: space-between;
    padding: .5rem;

`;

export const UnorderedList = styled.ul`
    display: flex;
    align-items: center;
`;

export const ListItem = styled.li`
    margin: 0 1rem;
    padding: 1.5rem 1rem;
    font-size: 1.5rem;
    :hover{
        background: #303030;
        cursor: pointer;
    }
`;

export const Logo = styled.img`
    width: 40px;
    height: 40px;
`;

export const MenuHolder = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;

export const MenuItem = styled.div`
    margin: 0 1rem;
    padding: 1.5rem 0rem;
`;