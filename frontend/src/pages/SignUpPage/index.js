import React, { useRef, useContext } from 'react';
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
import { Link } from 'react-router-dom';

export default function SignUpPage({ history }) {
    
    const { signUp } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoaderContext);

    const email_ref = useRef(null);
    const user_ref = useRef(null);
    const pass_ref = useRef(null);
    const photo_ref = useRef(null);
    const passconf_ref = useRef(null);
    const checkbox_ref = useRef(null);

    const handle_submit = async () => {
        if(email_ref.current && pass_ref.current){
            if(pass_ref.current.value === passconf_ref.current.value){
                try{
                    setIsLoading(true);
                    await signUp(email_ref.current.value, pass_ref.current.value, user_ref.current.value, photo_ref.current.value);
                    setIsLoading(false)
                    history.push({
                        pathname: "/"
                    })
                }catch(err){
                    alert(err.message);
                }
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
                    <LoginInput placeholder="Username" ref={user_ref} type="text" required/>
                    <LoginInput placeholder="Avatar URL" ref={photo_ref} type="text" />
                    <LoginInput placeholder="Password" ref={pass_ref} type="password" required/>
                    <LoginInput placeholder="Password confirmation" ref={passconf_ref} type="password" required/>
                    <OptionsHolder>
                        <CheckboxHolder>
                            <Checkbox type="checkbox" ref={checkbox_ref} /><p>I have 18+ years old.</p>
                        </CheckboxHolder>
                        <LinkHolder>
                            Already have an account? <Link to="/login"><strong>LogIn</strong></Link>
                        </LinkHolder>
                    </OptionsHolder>
                </LoginHolder>
                <ButtonHolder>
                    <Button>Sign Up</Button>
                </ButtonHolder>
            </LoginForm>
        </LoginContainer>
    );
}