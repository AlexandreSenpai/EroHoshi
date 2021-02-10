import React, { useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grow from '@material-ui/core/Grow';

//styles
import { UserOptionsContainer, UnorderedList, ListItem } from './styles';

//contexts
import { AuthContext } from '../../contexts/auth';
import { useHistory } from 'react-router-dom';

export default function UserOptions() {

    const history = useHistory();
    const [ checked, setChecked ] = useState(false);

    const { currentUser, signOut } = useContext(AuthContext);

    const handleClick = () => {
        setChecked(!checked);
    };

    const handleClickAway = () => {
        setChecked(false);
    }

    const to_profile = () => {
        history.push({
            pathname: `/p/${currentUser.uid}`
        })
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <UserOptionsContainer>
                <IconButton size='small' onClick={handleClick} >
                    <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
                </IconButton>
                <Grow in={checked} style={{ transformOrigin: '500px 0 0' }} {...(checked ? { timeout: 200 } : {})}>
                    <UnorderedList>
                        {/* <ListItem onClick={to_profile}>
                            <AccountBoxIcon color='inherit' fontSize='inherit'/>
                            <span>
                                Profile
                            </span>
                        </ListItem> */}
                        <ListItem onClick={signOut}>
                            <ExitToAppIcon color='inherit' fontSize='inherit'/>
                            <span>
                                Logout
                            </span>
                        </ListItem>
                    </UnorderedList>
                </Grow>
            </UserOptionsContainer>
        </ClickAwayListener>
    );
}
