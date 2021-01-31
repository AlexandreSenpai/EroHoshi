import React from 'react'

import en from '../../static/images/en.png';
import jp from '../../static/images/jp.png';
import cn from '../../static/images/cn.png';
import br from '../../static/images/br.png';

import { ThumbContainer, ThumbImage, Shadow, ThumbDescription, ThumbTitle, ThumbLanguage, Language } from './styles';

export default function Thumb({ title, thumbnail, id, lang }) {

    const languages = {
        english: en,
        japanese: jp,
        chinese: cn,
        portuguese: br
    }

    return (
        <ThumbContainer>
            <ThumbLanguage>
                <Language src={languages[lang]} />
            </ThumbLanguage>
            <Shadow>
                <ThumbDescription>
                    <ThumbTitle>
                        {title}
                    </ThumbTitle>
                </ThumbDescription>
            </Shadow>
            <ThumbImage thumbnail={thumbnail} />
        </ThumbContainer>
    )
}
