import styled from 'styled-components';

export const ComentariesContainer = styled.div`
    width: 100%;
    max-width: 104rem;
    height: 30rem;
    margin: 1rem 3rem;
`;

export const InputContainer = styled.div`
    width: 100%;
    background: #1d1d1d;
    margin-bottom: 1rem;
    margin-radius: 3rem;
    padding: 2rem;
    border: 1px solid #0000006d;
    text-align: center;

    a{
        color: #ff6a00;
    }

    form{
        width: 100%;
        display: flex;
    }

    input{
        width: 95%;
        min-height: 3.5rem;
        border-top-left-radius: 5rem;
        border-bottom-left-radius: 5rem;
        border: none;
        background: #18191A;
        padding: 1rem;
        color: #f1f1f1;
        font-family: inherit;
        resize: none;
    }
`;

export const CommentButton = styled.button`
    width: 5%;
    min-height: 3.5rem;
    background: #ff6a00;
    color: inherit;
    border: none;
    display: flex;
    align-items: center;
    border-top-right-radius: 5rem;
    border-bottom-right-radius: 5rem;
    justify-content: center;
    transition: 100ms ease-in;

    :hover{
        opacity: .5;
        cursor: pointer;
    }
`;

export const ComentariesHolder = styled.div`
    width: 100%;
    background: #1d1d1d;
    border-radius: 3px;
    padding: 2rem;
    border: 1px solid #0000006d;

    h2{
        text-align: center;
    }
`;

export const ComentaryTextHolder = styled.div``;

export const ComentaryInformation = styled.div``;

export const UserPictureHolder = styled.div`
    width: 100%;
    max-width: 6rem;
    max-height: 6rem;
    border-radius: 50%;
    border: 1px solid black;
    overflow: hidden;
    margin-right: 1rem;
`;

export const UserPicture = styled.img`
    width: 100%;
`;

export const ComentaryHolder = styled.div`
    margin: .8rem 0rem;

    form{
        margin-top: 1rem;
        padding-left: 6rem;
        width: 100%;
        display: flex;
        align-items: center;
        
        ${UserPictureHolder}{
            max-width: 3rem;
            max-height: 3rem;
        }

        ${CommentButton}{
            min-height: 2.3rem;
        }
    }

    input{
        width: 100%;
        max-width: 35rem;
        max-height: 3rem;
        padding: .5rem;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: none;
        color: #f1f1f1;
        background: #18191A;
    }

`;

export const ComentaryText = styled.p`
    background: #242426;
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1.5rem;
`;
export const UserName = styled.p`
    padding: 0rem 0rem 0rem .9rem;
    font-size: 1.2rem;
    font-weight: bolder;

    :after{
        content: " ♦ ${props => props.created_date}";
        opacity: .5;
        font-size: 1rem;
        fonte-weight: light;
    }
`;

export const AnswerHolder = styled.div`
    display: flex;
    align-items: center;
    padding-left: 6rem;
    margin: .3rem 0rem;

    ${UserName}{
        font-size: 1.1rem;
    }
    ${ComentaryText}{
        font-size: 1.2rem;
    }
    ${UserPictureHolder}{
        max-width: 4rem;
        max-height: 4rem;
    }

`;
export const MainCommentaryHolder = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
`;
