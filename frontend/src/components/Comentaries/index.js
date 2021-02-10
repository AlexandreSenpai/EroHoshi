import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import { api } from '../../services/api';
import { Form, Input } from '../Form';

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
    InputContainer,
    CommentButton} from './styles';

export default function Comentaries({user_id, doujin_id, comments, user_token, current_user}) {;

    const [commentariesList, setCommentariesList] = useState(new Map([]));

    useEffect(async () => {

        const current_comments = await Promise.all(comments.map(async comment => {
            const user_data = await api.get(`/user/${comment.userId}`);
            
            const answers = await Promise.all(comment.answers.map(async answer => {
                const user_data = await api.get(`/user/${answer.userId}`);
                return {...answer, ...{user_name: user_data.data.displayName, avatar: user_data.data.photoURL}}
            }))

            comment['answers'] = answers;

            return [comment.commentId, {...comment, ...{user_name: user_data.data.displayName, avatar: user_data.data.photoURL}}]
            
        }));

        setCommentariesList(new Map(current_comments))

    }, [comments]);

    const create_commentary = async (evt, { reset }) => {
        
        const { text } = evt;

        if(text){
            const res = await api.post('/comment', { doujinId: doujin_id.toString(), userId: user_id, text }, { headers: { Authorization: `Bearer ${user_token}` } });
            const current_comments = Array.from(commentariesList);
            setCommentariesList(new Map([...[[res.data.commentId, {...res.data, user_name: current_user.displayName, avatar: current_user.photoURL}]], ...current_comments]));
            reset();
        }

    }

    const create_answer = async (evt, comment_id, { reset }) => {

        const { text } = evt;

        if(text){
            const new_answer_response = await api.post(`/comment/${comment_id}`, { doujinId: doujin_id.toString(), userId: user_id, text }, { headers: { Authorization: `Bearer ${user_token}` } });
            const current_comments = commentariesList;

            const this_comment = current_comments.get(comment_id);
            this_comment.answers.push({...new_answer_response.data, user_name: current_user.displayName, avatar: current_user.photoURL});

            current_comments.set(comment_id, this_comment)

            const copying_map_to_array = Array.from(current_comments);

            setCommentariesList(new Map(copying_map_to_array));
            reset();
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
                {current_user
                    ?   <Form onSubmit={create_commentary}>
                            <Input name="text" placeholder="Tell what you think about this piece of cake." wrap="soft"/>
                            <CommentButton><SendIcon fontSize="large"/></CommentButton>
                        </Form>
                    : <h3>You must login to interact with other people. {<Link to="/login">Sign In</Link>}</h3>}
            </InputContainer>
            <ComentariesHolder>
                {commentariesList && commentariesList.size > 0
                    ?   Array.from(commentariesList).map(comment => {
                            return <ComentaryHolder key={comment[0]}>
                                        <CommentaryObject text={comment[1].text} user_name={comment[1].user_name} created_date={comment[1].timestamp} avatar={comment[1].avatar}/>
                                        {comment[1].answers && comment[1].answers.length > 0
                                            ?   comment[1].answers.map(answer => {
                                                    return <AnswerObject text={answer.text} user_name={answer.user_name} created_date={answer.timestamp} avatar={answer.avatar}/>
                                                })
                                            : null}
                                        {current_user
                                            ?   <Form onSubmit={(evt, {...rest}) => create_answer(evt, comment[0], {...rest})}>
                                                    <UserPictureHolder>
                                                        <UserPicture src={current_user.photoURL}/>
                                                    </UserPictureHolder>
                                                    <Input name="text" placeholder="your chance of reply." />
                                                    <CommentButton><SendIcon fontSize="default"/></CommentButton>
                                                </Form>
                                            : null}
                                    </ComentaryHolder>})
                    :   <h2>There's no commentaries yet...</h2>}
            </ComentariesHolder>
        </ComentariesContainer>
    )
}
