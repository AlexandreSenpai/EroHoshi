import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import background from '../../static/images/loginBackground.png';
import { AuthContext } from '../../contexts/auth';
import { LoaderContext } from '../../contexts/loader';
import { Input, Checkbox, Form } from '../../components/Form';
import logo from '../../static/images/logo.png';

import {
    LoginContainer,
    LoginHolder,
    TitleHolder,
    ButtonHolder,
    Button,
    CheckboxHolder,
    OptionsHolder,
    LinkHolder,
    GoBack,
    Logo
} from './styles';

export default function SignUpPage({ history }) {
    
    const { signUp } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoaderContext);

    const handle_submit = async (evt) => {

        const { email, password, password_confirmation, user_name, avatar, over_eighteen } = evt;

        if(password === password_confirmation){
            if(!over_eighteen){
                alert("You must have 18 years old to access this website.");
                return;
            }

            try{
                setIsLoading(true);
                await signUp(email, password, user_name, avatar);
                setIsLoading(false)
                history.push({
                    pathname: "/"
                })
            }catch(err){
                alert(err.message);
                setIsLoading(false)
            }
        }

    }

    return(
        <LoginContainer background={background}>
            <GoBack>
                <Logo src={logo} onClick={() => history.goBack()}/>
            </GoBack>
            <Form onSubmit={handle_submit}>
                <TitleHolder>
                    reject the society, become hentai.
                    <span>社会を拒絶し、変態になる</span>
                </TitleHolder>
                <LoginHolder>
                    <Input name="email" placeholder="Email" type="email" required/>
                    <Input name="user_name" placeholder="Username" type="text" required/>
                    <Input name="avatar" placeholder="Avatar URL"type="text" />
                    <Input name="password" placeholder="Password"type="password" required/>
                    <Input name="password_confirmation" placeholder="Password confirmation" type="password" required/>
                    <OptionsHolder>
                        <CheckboxHolder>
                            <Checkbox name="over_eighteen" type="checkbox" /><p>I'm over eighteen years old.</p>
                        </CheckboxHolder>
                        <LinkHolder>
                            Already have an account? <Link to="/login"><strong>LogIn</strong></Link>
                        </LinkHolder>
                    </OptionsHolder>
                </LoginHolder>
                <ButtonHolder>
                    <Button>Sign Up</Button>
                </ButtonHolder>
            </Form>
        </LoginContainer>
    );
}