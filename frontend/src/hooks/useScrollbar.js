import React, { useEffect } from 'react';

export default function useScroller(reactive_var){
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [reactive_var]);

}