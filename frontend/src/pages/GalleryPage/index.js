import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';
import useTitle from '../../hooks/useTitle';
import useScrollbar from '../../hooks/useScrollbar';

import {
    ContentHolder,
    GalleryContainer,
    Image,
    PaginationContainer,
    PaginationHolder
} from './styles';


export default function GalleryPage({ computedMatch, location }) {

    const [page, setPage] = useState(0);
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("EroHoshi :: Free Hentai and Doujinshi Online Reader");

    useEffect(() => {
        if(location.state){
            setImages(location.state.images);
            setPage(location.state.index);
            setTitle(location.state.title);
        }else{
            api.get('/doujin', { params: { id: computedMatch.params.id } }).then(res => {
                setImages(res.data.images);
                setTitle(res.data.title);
            });
        }
    }, [])

    useTitle(title);
    useScrollbar(page);

    const handle_click = (evt) => {
        setPage(prevPage => {
            if(evt.pageX > (window.innerWidth / 2) && page < (images.length - 1)){
                return prevPage + 1
            }
            if(evt.pageX < (window.innerWidth / 2) && page > 0){
                return prevPage - 1
            }

            return prevPage
        })
    }

    const handle_pass = (index) => {
        setPage(prevPage => {
            if(index < 0){
                if(prevPage > 0){
                    return prevPage + index
                }
            }else{
                if(prevPage < images.length - 1){
                    return prevPage + index
                }
            }

            return prevPage
        })
    }

    return(
        <GalleryContainer>
            <ContentHolder>
                <Image src={images[page >= 0 ? page : 0]} onClick={handle_click}/>
                <PaginationContainer>
                    <PaginationHolder>
                        <IconButton color="inherit" onClick={() => handle_pass(-page)}>
                            <SkipPreviousIcon color="inherit" fontSize="large"/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => handle_pass(-1)}>
                            <NavigateBeforeIcon color="inherit" fontSize="large"/>
                        </IconButton>
                        {page + 1} of {images.length}
                        <IconButton color="inherit" onClick={() => handle_pass(1)}>
                            <NavigateNextIcon color="inherit" fontSize="large"/>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => handle_pass((images.length - 1) - page)}>
                            <SkipNextIcon color="inherit" fontSize="large"/>
                        </IconButton>
                    </PaginationHolder>
                </PaginationContainer>
            </ContentHolder>
        </GalleryContainer>           
    )
}