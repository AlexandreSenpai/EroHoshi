import styled from 'styled-components';

export const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    background: red;
    position: absolute;
    top: 0;
    background: url(${props => props.background});
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form{
        width: 100%;
        max-width: 40rem;
    }

    input[type="email"], input[type="password"]{
        width: 100%;
        height: 3rem;
        margin: .3rem 0rem;
        border: none;
        border-radius: 3px;
        padding: 1rem;
    }
`;

export const LoginHolder = styled.div`
    width: 100%;
    padding: 1rem;
    margin: 1rem 0rem;
`;

export const TitleHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2rem;
    flex-direction: column;

    span{
        color: #ff6a00;
    }
`;

export const ButtonHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    border: none;
    background: #ff6a00;
    color: #F1F1F1;
    padding: 1rem 5rem;
    opacity: .4;
    cursor: pointer;
    transition: 100ms ease-in;
    font-weight: bolder;

    :hover{
        opacity: 1;
    }
`;

export const CheckboxHolder = styled.div`
    display: flex;
    align-items: center;
    margin-top: .3rem;
`;

export const Checkbox = styled.input`
    margin-right: .2rem;
`;

export const OptionsHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const LinkHolder = styled.div`
    a{
        color: #ff6a00;
    }
`;

export const GoBack = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    padding: 1rem 2rem;
`;

export const Logo = styled.img`
    width: 4rem;
    cursor: pointer;
`;