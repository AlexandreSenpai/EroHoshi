import React, { useEffect } from 'react';

export default function Title(doujin_title){

    useEffect(() => {
        document.title = doujin_title;

        return () => {
            document.title = "EroHoshi"
        };
    }, [doujin_title])

}