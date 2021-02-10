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
    display: flex;
    align-items: center;
    margin: 3rem 3rem 1rem 3rem;
    flex-direction: column;

`;

export const ThumbContainer = styled.div`
    width: 30rem;
    min-height: 40rem;
    background: #1d1d1d9c;
    margin: 1rem;
    border-radius: 4px;
    padding: 2rem;
    border: 1px solid #0000006d;
`;

export const ThumbImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const InformationContainer = styled.div`
    width: 100%;
    max-width: 80rem;
    min-height: 40rem;
    background: #1d1d1d9c;
    margin: 1rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    border: 1px solid #0000006d;
    
    @media screen and (max-width: 414px) {
        flex-direction: column;
    }

`;

export const InformationHolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60%;
    height: 100%;

    div{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    @media screen and (max-width: 414px) {
        width: 100%;
    }
`;

export const AditionalInformationHolder = styled.div`
    width: 40%;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 414px) {
        margin-top: 1rem;
        padding: 1rem;
        width: 100%;
        border-top: 1px solid black;
    }
`;

export const RatingHolder = styled.div`
    width: 15rem;
    height: 15rem;
    background: #242426;

    p{
        width: 100%;
        justify-content: center;
        font-size: 3rem;
        text-align: center;
    }
`;

export const Text = styled.p`
    font-size: 1.5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

export const Score = styled.p`
    font-size: 5rem !important;
    padding: 1rem;
    color: #ff6a00;
`

export const TitleContent = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    max-width: 104rem;

    @media screen and (max-width: 414px) {
        text-align: center;
    }
`;
export const Content = styled.div`
    display: flex;
    width: 100%;
    max-width: 106rem;
    
    @media screen and (max-width: 414px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;
export const TitleContainer = styled.div``;
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

export const PreviewContainer = styled.div`
    width: 20rem;
    height: 30rem;
    border: 1px solid #000;
    margin: .5rem;
    border-radius: 5px;
    overflow: hidden;

    @media screen and (max-width: 414px) {
        width: 46%;
        height: 28rem;
        margin: 1%;
    }
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
    background: #ff6a00;
    padding: 1rem;
    margin: .5rem;
    transition: 100ms ease-in;
    color: #f1f1f1;
    align-items: center;

    :disabled{
        background: #ff6a006d;
    }

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
    ${Text}{
        font-size: 1.2rem;
        opacity: .5;
        padding: .1rem;
    }
`;

export const ReadMoreHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Tag = styled.div`
    display: flex;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
    align-text: center;
    background: #18191A;
    border-radius: 5rem;
    padding: 0rem .5rem;
    font-size: 1.2rem;
    border: 1px solid #0000006d;
    color: #ff6a00;
    cursor: pointer;
    margin: .1rem;
    transition: 60ms ease-in;

    :hover{
        opacity: .8;
    }
`;