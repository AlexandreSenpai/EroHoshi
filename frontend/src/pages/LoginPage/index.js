import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import background from '../../static/images/loginBackground.png';
import { AuthContext } from '../../contexts/auth';
import { LoaderContext } from '../../contexts/loader';
import { Input, Form } from '../../components/Form';
import logo from '../../static/images/logo.png';

import {
    LoginContainer,
    LoginHolder,
    TitleHolder,
    ButtonHolder,
    Button,
    OptionsHolder,
    LinkHolder,
    GoBack,
    Logo
} from './styles';

export default function LoginPage({ history }) {
    
    const { signIn } = useContext(AuthContext);
    const { setIsLoading } = useContext(LoaderContext);

    const handle_submit = async (evt) => {
        
        const { email, password } = evt;
        
        try{
            setIsLoading(true);
            await signIn(email, password);
            setIsLoading(false)
            history.push({
                pathname: "/"
            })
        }catch(err){
            alert(err.message);
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
                    <Input name="password" placeholder="Password" type="password" required/>
                    <OptionsHolder>
                        <LinkHolder>
                            Don't you have an account yet? <Link to="/signup"><strong>SignUp</strong></Link>
                        </LinkHolder>
                    </OptionsHolder>
                </LoginHolder>
                <ButtonHolder>
                    <Button>Login</Button>
                </ButtonHolder>
            </Form>
        </LoginContainer>
    );
}