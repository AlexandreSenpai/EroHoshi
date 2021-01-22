import React, { useState, useEffect, useCallback } from 'react';
import { api, axios_object } from '../../services/api';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Cookie from 'js-cookies';
import { uid } from 'uid';
import useTitle from '../../hooks/useTitle';

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
    PostInformation
} from './styles';


export default function DoujinPage({ computedMatch, location, history }) {

    const [title, setTitle] = useState("EroHoshi");
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
    const [canLike, setCanLike] = useState(true);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);

    let uuid = Cookie.getItem('uid') ? Cookie.getItem('uid') : Cookie.setItem('uid', uid())

    useEffect(() => {
        get_doujins();
    }, [location]);

    useEffect(() => {
        if(likes.indexOf(uuid) === -1){
            setCanLike(true);
        }
    }, [uuid, likes])

    useTitle(title);

    const handle_like = () => {
        api.post('/like', { 'uid': uuid, doujinId: ID.toString() });
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
        setLikes(data.likes);
        setDislikes(data.dislikes);
    }
    
    const get_doujins = useCallback(() => {

        if(location.state){
            populate_state(location.state);
        }else{
            api.get(`/doujin`, { params: { id: computedMatch.params.id } }).then(record => {
                const data = record.data;
                if(data){
                    populate_state(data);
                }
            });
        }
    });

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
                            <Text><strong>Alternative Title:</strong> {secondaryTitle}</Text>
                            <Text><strong>Artists:</strong> {artists.join(', ')}</Text>
                            <Text><strong>Languages:</strong> {languages.join(', ')}</Text>
                            <Text><strong>Categories:</strong> {categories.join(', ')}</Text>
                            <Text><strong>Characters:</strong> {characters.join(', ')}</Text>
                            <Text><strong>Parodies:</strong> {parodies.join(', ')}</Text>
                            <Text><strong>Groups:</strong> {groups.join(', ')}</Text>
                            <Text><strong>Tags:</strong> {tags.join(', ')}</Text>
                        </InformationHolder>
                        <AditionalInformationHolder>
                            <RatingHolder>
                                <Text><strong>Score</strong></Text>
                                <Score>{score}</Score>
                            </RatingHolder>
                            <ButtonsContainer>
                                <Button background="#e72b69" disabled={!canLike} onClick={handle_like}>
                                    <ThumbUpIcon /> Like ({likes.length})
                                </Button>
                                <Button background="#e72b696d">
                                    <ThumbDownIcon /> Dislike ({dislikes.length})
                                </Button>
                            </ButtonsContainer>
                            <PostInformation>
                                <Text>ID: {ID}</Text>
                                <Text>Upload date: {createdDate}</Text>
                                <Text>Views: {views}</Text>
                            </PostInformation>
                        </AditionalInformationHolder>
                    </InformationContainer>
                </Content>
            </HeaderContainer>
            <GalleryContainer>
                {
                    previewList.length > 0
                    ? previewList.map((record, index) => (
                        <PreviewContainer key={Math.random()} onClick={() => to_read(index)}>
                            <Preview src={record} />
                        </PreviewContainer>
                      ))
                    : null
                }
            </GalleryContainer>
        </DoujinContainer>
    )
}