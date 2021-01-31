import styled from 'styled-components';

export const SidebarContainer = styled.aside`
    top: 0;
    min-width: 25rem;
    min-height: 100vh;
    height: 100%;
    background: #242426;
    padding: 2rem 0;
    transition: 150ms ease-out;
    position: fixed;
    z-index: 9999;
    left: ${props => props.sidebarStatus};
`;

export const UnorderedList = styled.ul`
    list-style: none;

    a{
        color: inherit;
        text-decoration: none;
    }
`;

export const ListItem = styled.li`
    font-size: 1.5rem;
    padding: 1rem 4rem;
    display: flex;
    align-items: center;

    svg{
        color: #ff6a00;
        margin-right: 1rem;
    }

    :hover{
        background: #303030;
        cursor: pointer;
    }
`;

export const Separator = styled.hr`
    opacity: .3;
    margin: 1rem;
`;

export const MenuHolder = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1rem 4rem;
    justify-content: flex-end;
`;

