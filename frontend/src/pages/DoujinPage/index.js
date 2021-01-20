import React, { useState, useEffect, useCallback } from 'react';
import { api, axios_object } from '../../services/api';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Cookie from 'js-cookies';
import { uid } from 'uid';

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


export default function DoujinPage({ computedMatch, location }) {

    const [cancelToken, setCancelToken] = useState(null);
    const [title, setTitle] = useState('');
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

    let uuid = Cookie.getItem('uid') ? Cookie.getItem('uid') : Cookie.setItem('uid', uid())

    useEffect(() => {
        get_doujins();
    }, [location]);

    useEffect(() => {
        if(ID > 0){
            api.get('/canLike', { params: { 'uid': uuid, doujin_id: ID } }).then(res => {
                setCanLike(JSON.parse(res.data.can_like));
                console.log(JSON.parse(res.data.can_like))
            })
        }
    }, [uuid, ID])

    const handle_like = () => {
        api.get('/like', { params: { 'uid': uuid, doujin_id: ID } })
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
        setCreatedDate(() => {
            var t = new Date(1970, 0, 1);
            t.setSeconds(data.created_date._seconds);
            return `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
        });
    }
    
    const get_doujins = useCallback(() => {
        
        if(cancelToken){
            cancelToken.cancel("Page switch before doujin fetch.");
        }

        setCancelToken(axios_object.CancelToken.source());

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
                                    <ThumbUpIcon /> Like
                                </Button>
                                <Button background="#e72b696d">
                                    <ThumbDownIcon /> Dislike
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
                    ? previewList.map(record => (
                        <PreviewContainer key={Math.random()}><Preview src={record} /></PreviewContainer>
                      ))
                    : null
                }
            </GalleryContainer>
        </DoujinContainer>
    )
}