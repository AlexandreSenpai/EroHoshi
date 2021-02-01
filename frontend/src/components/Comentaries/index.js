import React, { useRef } from 'react'
import uniqid from 'uniqid';
import SendIcon from '@material-ui/icons/Send';
import { api } from '../../services/api';

import { 
    ComentariesContainer,
    ComentariesHolder, 
    ComentaryHolder,
    ComentaryTextHolder,
    UserPictureHolder,
    UserPicture,
    ComentaryText, 
    ComentaryInformation,
    UserName,
    AnswerHolder,
    MainCommentaryHolder,
    InputHolder,
    Input,
    InputContainer,
    CommentButton} from './styles';

export default function Comentaries({user_id, doujin_id, comments}) {;

    const text_ref = useRef(null);

    const create_commentary = async () => {
        const text = text_ref.current ? text_ref.current.value : null;
        if(text){
            await api.post('/comment', { doujinId: doujin_id.toString(), userId: user_id, text });
        }else{
            console.log('não há texto.')
        }
    }

    const AnswerObject = ({text, user_name, created_date, avatar}) => {
        return(
            <AnswerHolder>
                <UserPictureHolder>
                    <UserPicture src={avatar}/>
                </UserPictureHolder>
                <ComentaryTextHolder>
                    <ComentaryInformation>
                        <UserName created_date={created_date}>{user_name}</UserName>
                    </ComentaryInformation>
                    <ComentaryText>
                        {text}
                    </ComentaryText>
                </ComentaryTextHolder>
            </AnswerHolder>
        );
    }
    
    const CommentaryObject = ({text, user_name, created_date, avatar}) => {
        return(
            <MainCommentaryHolder>
                <UserPictureHolder>
                    <UserPicture src={avatar}/>
                </UserPictureHolder>
                <ComentaryTextHolder>
                    <ComentaryInformation>
                        <UserName created_date={created_date}>{user_name}</UserName>
                    </ComentaryInformation>
                    <ComentaryText>
                        {text}
                    </ComentaryText>
                </ComentaryTextHolder>
            </MainCommentaryHolder>
        );
    }


    return (
        <ComentariesContainer>
            <InputContainer>
                <InputHolder>
                    <Input placeholder="Tell what you think about this piece of cake." wrap="soft" ref={text_ref}/>
                    <CommentButton onClick={create_commentary}><SendIcon fontSize="large"/></CommentButton>
                </InputHolder>
            </InputContainer>
            <ComentariesHolder>
                {comments.length > 0
                    ?   comments.map(comment => {
                            return <ComentaryHolder>
                                        <CommentaryObject key={comment.commentId} text={comment.text} user_name="CharlottePudding" created_date={comment.timestamp} avatar="https://64.media.tumblr.com/d22178ba4f7630b8b5975a8c64a96049/tumblr_p3xvzhQ08s1x2t2a8o1_400.png"/>
                                        {comment.answers
                                            ?   comment.answers.map(answer => {
                                                    return <AnswerObject key={answer.commentId} text={answer.text} user_name="BoaHancock" created_date={answer.timestamp} avatar="https://vignette.wikia.nocookie.net/onepiece/images/2/22/Boa_Hancock_Portrait.png/revision/latest/scale-to-width-down/340?cb=20190115222623&path-prefix=fr"/>
                                                })
                                            : null}
                                    </ComentaryHolder>})
                    :   <h2>There's no commentaries yet...</h2>}
            </ComentariesHolder>
        </ComentariesContainer>
    )
}
