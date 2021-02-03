import styled from 'styled-components';

export const SidebarContainer = styled.aside`
    top: 0;
    width: 25rem;
    min-height: 100vh;
    height: 100%;
    background: #242426;
    padding: 2rem 0;
    transition: 150ms ease-out;
    position: fixed;
    z-index: 9999;
    left: ${props => props.sidebarStatus};
    
    ul:nth-last-child(1){
        display: none;
    }

    @media screen and (max-width: 414px) {
        ul:nth-last-child(1){
            display: block;
        }
    }
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
    filter: grayscale(100%);
    transition: 50ms ease-in;

    svg{
        color: #ff6a00;
        margin-right: 1rem;
    }

    :hover{
        background: #303030;
        cursor: pointer;
        filter: grayscale(0%);
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

export const UserHolder = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1rem 2rem;
    background: #18191A;
    margin: 1rem 0rem;
`;

export const UserAvatar = styled.img`
    min-width: 5rem;
    max-width: 5rem;
    height: 5rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #0000006d;
    margin-right: 1rem;
`;

export const UserGreetings = styled.div`
    max-width: 16rem;
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    color: #f1f1f14d;

    span{
        color: #ff6a00;
        font-weight: bolder;
        opacity: 1;
        font-size: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
