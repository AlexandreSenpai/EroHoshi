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
    background: #242426;
    display: flex;
    align-items: center;
    padding: 3rem;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const ThumbContainer = styled.div`
    width: 30rem;
    min-height: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1d1d1d9c;
    margin: 1rem;
    border-radius: 4px;
    padding: 2rem;
`;

export const ThumbImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const InformationContainer = styled.div`
    width: 80rem;
    min-height: 40rem;
    background: #1d1d1d9c;
    margin: 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
`;

export const InformationHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: 100%;
`;

export const AditionalInformationHolder = styled.div`
    width: 40%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RatingHolder = styled.div`
    width: 15rem;
    height: 15rem;
    background: #242426;

    p{
        font-size: 3rem;
        text-align: center;
    }
`;

export const Text = styled.p`
    font-size: 1.5rem;
    padding: 1rem;
`

export const Score = styled.p`
    font-size: 4rem !important;
    padding: 1rem;
    color: #e72b69;
`

export const TitleContent = styled.div`
    margin-bottom: 1rem;
    width: 110rem;
`;
export const Content = styled.div`
    display: flex;
`;
export const TitleContainer = styled.div``;
export const Title = styled.h1`
    color: #e72b69;
`;

export const GalleryContainer = styled.div`
    width: 112rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const PreviewContainer = styled.div`
    width: 20rem;
    height: 30rem;
    border: 1px solid #000;
    margin: .5rem;
    border-radius: 5px;
    overflow: hidden;
`;

export const Preview = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: 200ms ease-in;

    :hover{
        opacity: .5;
    }
`;

export const ButtonsContainer = styled.div`
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Button = styled.button`
    display: flex;
    background: ${props => props.background};
    border: none;
    border-radius: 5px;
    justify-content: center;
    padding: 1rem;
    margin: .5rem;
    transition: 100ms ease-in;
    color: #f1f1f1;
    align-items: center;

    :hover{
        opacity: .5;
        cursor: pointer;
    }

    svg{
        margin-right: .5rem;
    }
`;

export const PostInformation = styled.div`
    width: 15rem;
    p{
        font-size: 1.3rem;
        opacity: .6;
        padding: .1rem;
    }
`;

export const ReadMoreHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;