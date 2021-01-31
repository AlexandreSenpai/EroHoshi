import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import background from '../../static/images/loginBackground.png';
import { AuthContext } from '../../contexts/auth';
import { LoaderContext } from '../../contexts/loader';

import {
    LoginContainer,
    LoginHolder,
    LoginInput,
    TitleHolder,
    ButtonHolder,
    Button,
    LoginForm,
    Checkbox,
    CheckboxHolder,
    OptionsHolder,
    LinkHolder
} from './styles';

export default function LoginPage({ history }) {
    
    const { signIn } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoaderContext);

    const email_ref = useRef(null);
    const pass_ref = useRef(null);

    const handle_submit = async () => {
        if(email_ref.current && pass_ref.current){
            try{
                setIsLoading(true);
                await signIn(email_ref.current.value, pass_ref.current.value);
                setIsLoading(false)
                history.push({
                    pathname: "/"
                })
            }catch(err){
                alert(err.message);
            }
        }
    }

    return(
        <LoginContainer background={background}>
            <LoginForm action="#" onSubmit={handle_submit}>
                <TitleHolder>
                    reject the society, become hentai.
                    <span>社会を拒絶し、変態になる</span>
                </TitleHolder>
                <LoginHolder>
                    <LoginInput placeholder="Email" ref={email_ref} type="email" required/>
                    <LoginInput placeholder="Password" ref={pass_ref} type="password" required/>
                    <OptionsHolder>
                        <LinkHolder>
                            Don't you have an account yet? <Link to="/signup"><strong>SignUp</strong></Link>
                        </LinkHolder>
                    </OptionsHolder>
                </LoginHolder>
                <ButtonHolder>
                    <Button>Login</Button>
                </ButtonHolder>
            </LoginForm>
        </LoginContainer>
    );
}