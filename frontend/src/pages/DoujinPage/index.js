import React, { useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../../services/api';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import useTitle from '../../hooks/useTitle';
import useScrollbar from '../../hooks/useScrollbar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Comentaries from '../../components/Comentaries';
import { LoaderContext } from '../../contexts/loader';
import { AuthContext } from '../../contexts/auth';

import {
    DoujinContainer,
    HeaderContainer,
    ThumbContainer,
    InformationContainer,
    ThumbImage,
    Text,
    InformationHolder,
    AditionalInformationHolder,
    RatingHolder,
    Score,
    Content,
    TitleContent,
    TitleContainer,
    Title,
    GalleryContainer,
    PreviewContainer,
    Preview,
    Button,
    ButtonsContainer,
    PostInformation,
    ReadMoreHolder,
    Tag
} from './styles';


export default function DoujinPage({ computedMatch, location, history }) {

    const [title, setTitle] = useState("EroHoshi :: Free Hentai and Doujinshi Online Reader");
    const [ID, setID] = useState(0);
    const [secondaryTitle, setSecondaryTitle] = useState('');
    const [previewList, setPreviewList] = useState([]);
    const [artists, setArtists] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [parodies, setParodies] = useState([]);
    const [groups, setGroups] = useState([]);
    const [tags, setTags] = useState([]);
    const [score, setScore] = useState(0);
    const [createdDate, setCreatedDate] = useState(null);
    const [views, setViews] = useState(0);
    const [canLike, setCanLike] = useState(false);
    const [canDislike, setCanDislike] = useState(false);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [comments, setComments] = useState([]);
    const [pages, setPages] = useState(0);

    const { setIsLoading } = useContext(LoaderContext);    
    const { currentUser, userToken } = useContext(AuthContext);   
    
    useEffect(() => {
        get_doujins();
    }, [location]);

    useEffect(() => {
        if(currentUser){
            if(likes.indexOf(currentUser.uid) === -1){
                setCanLike(true);
            }else{
                setCanLike(false);
            }
            if(dislikes.indexOf(currentUser.uid) === -1){
                setCanDislike(true);
            }else{
                setCanDislike(false);
            }
        }
    }, [currentUser, likes, dislikes]);

    useTitle(title);
    useScrollbar();

    const handle_like = async (method) => {
        if(method === 'like'){
            const new_score = await api.post('/like', { 'uid': currentUser.uid, doujinId: ID.toString() }, { headers: { Authorization: `Bearer ${userToken}` } });
            setScore(prevScore => {
                if(prevScore !== new_score.data.score){
                    return new_score.data.score
                }
                return prevScore
            });
            setLikes(prevLikes => {
                return [...prevLikes, currentUser.uid]
            });
            setDislikes(prevDislikes => {
                return prevDislikes.filter(id => id !== currentUser.uid);
            });
        }else{
            const new_score = await api.post('/dislike', { 'uid': currentUser.uid, doujinId: ID.toString() }, { headers: { Authorization: `Bearer ${userToken}` } });
            setScore(prevScore => {
                if(prevScore !== new_score.data.score){
                    return new_score.data.score
                }
                return prevScore
            })
            setDislikes(prevDislike => {
                return [...prevDislike, currentUser.uid]
            });
            setLikes(prevLikes => {
                return prevLikes.filter(id => id !== currentUser.uid);
            });
        }
    }

    const to_read = (index) => {
        history.push({
            pathname: `/r/${ID}`,
            state: { images: previewList, index, title }
        })
    }

    const populate_state = (data) => {
        setTitle(data.title);
        setID(data.id);
        setSecondaryTitle(data.secondary_title);
        setPreviewList(data.images);
        setArtists(data.artists);
        setLanguages(data.languages);
        setCategories(data.categories);
        setCharacters(data.characters);
        setParodies(data.parodies);
        setGroups(data.groups);
        setTags(data.tags);
        setScore(data.score || 0);
        setViews(data.views || 0);
        setCreatedDate(data.created_date);
        setLikes(data.likes instanceof Array ? data.likes : []);
        setDislikes(data.dislikes instanceof Array ? data.dislikes : []);
        setComments(data.comments || []);
        setPages(data.total_pages);
    }
    
    const toggle_show = () => {
        setShowMore(prevShow => {
            return !prevShow;
        });
    }

    const get_doujins = useCallback(() => {

        if(location.state){
            populate_state(location.state);
        }else{
            setIsLoading(true);
            api.get(`/doujin`, { params: { id: computedMatch.params.id } }).then(record => {
                const data = record.data;
                if(data){
                    populate_state(data);
                    setIsLoading(false);
                }
            });
        }
    }, [location.state]);

    return(
        <DoujinContainer>
            <HeaderContainer>
                <TitleContent>
                    <TitleContainer>
                        <Title>{title}</Title>
                    </TitleContainer>
                </TitleContent>
                <Content>
                    <ThumbContainer>
                        <ThumbImage src={previewList ? previewList[0] : null} />
                    </ThumbContainer>
                    <InformationContainer>
                        <InformationHolder>
                            <div><Text><strong>Alternative Title:</strong> {secondaryTitle}</Text></div>
                            <div><Text><strong>Artists:</strong></Text>{artists.length > 0 ? artists.map(artist => {return <Tag key={artist}>{artist}</Tag>}) : null}</div>
                            <div><Text><strong>Languages:</strong></Text> {languages.length > 0 ? languages.map(language => {return <Tag key={language}>{language}</Tag>}) : null}</div>
                            <div><Text><strong>Categories:</strong></Text> {categories.length > 0 ? categories.map(category => {return <Tag key={category}>{category}</Tag>}) : null}</div>
                            <div><Text><strong>Characters:</strong></Text> {characters.length > 0 ? characters.map(artist => {return <Tag key={artist}>{artist}</Tag>}) : null}</div>
                            <div><Text><strong>Parodies:</strong></Text> {parodies.length > 0 ? parodies.map(parody => {return <Tag key={parody}>{parody}</Tag>}) : null}</div>
                            <div><Text><strong>Groups:</strong></Text> {groups.length > 0 ? groups.map(group => {return <Tag key={group}>{group}</Tag>}) : null}</div>
                            <div><Text><strong>Tags:</strong></Text> {tags.length > 0 ? tags.map(tag => {return <Tag key={tag}>{tag}</Tag>}) : null}</div>
                        </InformationHolder>
                        <AditionalInformationHolder>
                            <RatingHolder>
                                <Text><strong>Score</strong></Text>
                                <Score>{score}</Score>
                            </RatingHolder>
                            <ButtonsContainer>
                                <Button disabled={!canLike} onClick={() => handle_like('like')}>
                                    <ThumbUpIcon /> Like ({likes.length})
                                </Button>
                                <Button disabled={!canDislike} onClick={() => handle_like('dislike')}>
                                    <ThumbDownIcon /> Dislike ({dislikes.length})
                                </Button>
                            </ButtonsContainer>
                            <PostInformation>
                                <Text>ID: {ID}</Text>
                                <Text>Upload date: {createdDate}</Text>
                                <Text>Pages: {pages}</Text>
                                <Text>Views: {views}</Text>
                            </PostInformation>
                        </AditionalInformationHolder>
                    </InformationContainer>
                </Content>
            </HeaderContainer>
            <GalleryContainer>
                {
                    previewList.length > 0 && showMore === false
                    ? previewList.slice(0, 10).map((record, index) => (
                        <PreviewContainer key={Math.random()} onClick={() => to_read(index)}>
                            <Preview src={record} />
                        </PreviewContainer>
                      ))
                    : previewList.map((record, index) => (
                        <PreviewContainer key={Math.random()} onClick={() => to_read(index)}>
                            <Preview src={record} />
                        </PreviewContainer>
                      ))
                }
                <ReadMoreHolder>
                    <Button color="inherit" onClick={toggle_show}>
                        <MoreHorizIcon color="inherit" fontSize="large" /> 
                        {showMore === false ? "Show More" : "Show Less"}
                    </Button>
                </ReadMoreHolder>
            </GalleryContainer>
            <Comentaries user_id={currentUser ? currentUser.uid : null} doujin_id={ID} comments={comments} user_token={userToken} current_user={currentUser}/>
        </DoujinContainer>
    )
}