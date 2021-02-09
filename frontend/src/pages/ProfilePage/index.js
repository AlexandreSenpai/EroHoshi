import React, { useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../../services/api';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { LoaderContext } from '../../contexts/loader';
import { AuthContext } from '../../contexts/auth';

import {
    ProfileContainer,
    Header,
    Section,
    UserAvatar,
    SectionHeader,
    UserInformation,
    InformationText,
    UserName,
    SectionTitleHolder,
    SectionTitle
} from './styles';


export default function ProfilePage({ computedMatch, location, history }) {

    const { setIsLoading } = useContext(LoaderContext);  
    const [userName, setUserName] = useState(null);
    const [creationTime, setCreationTime] = useState(null);
    const [lastSignInTime, setLastSignInTime] = useState(null);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setIsLoading(true);
        api.get(`/user/${computedMatch.params.user_id}`).then(res => {
            console.log(res);
            setUserName(res.data.displayName);
            setLastSignInTime(res.data.metadata.lastSignInTime);
            setCreationTime(res.data.metadata.creationTime);
            setAvatar(res.data.photoURL);
            setIsLoading(false);
        });
    }, [computedMatch.params])

    return(
        <ProfileContainer>
            <Header />
            <Section>
                <SectionHeader>
                    <UserAvatar src={avatar}/>
                    <UserInformation>
                        <UserName>{userName}</UserName>
                        <InformationText><strong>Member since</strong> <span>{creationTime}</span></InformationText>
                        <InformationText><strong>Last time online</strong> <span>{lastSignInTime}</span></InformationText>
                    </UserInformation>
                </SectionHeader>
            </Section>
            <Section>
                <SectionTitleHolder>
                    <SectionTitle>
                        <FavoriteIcon /> Last Favorites
                    </SectionTitle>
                </SectionTitleHolder>
                
            </Section>
        </ProfileContainer>
    )
}