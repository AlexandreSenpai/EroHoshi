import styled from 'styled-components';

export const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;


export const Header = styled.div`
    width: 100%;
    height: 30rem;
    background: url("https://wallpapercave.com/wp/wp7176067.jpg");
    background-size: cover;
    box-shadow: inset 0 0 10rem #000000;
`;

export const Section = styled.div`
    width: 100%;
    max-width: 100rem;
    background: #242426;
    position: relative;
    top: -2rem;
    border: 1px solid #0000006d;
    border-radius: 3px;
    padding: 2rem;
    margin-bottom: 1rem;
`;

export const UserAvatar = styled.img`
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #0000006d;
    margin-right: 1rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const UserInformation = styled.div`
`;

export const UserName = styled.h1`
    font-size: 3rem;
`;
export const InformationText = styled.p`
    span{
        color: #ff6a00;
    }
`;

export const SectionTitleHolder = styled.div``;

export const SectionTitle = styled.h2`
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 1.5rem;

    svg {
        margin-right: .5rem;
        color: #ff6a00;
    }
`;