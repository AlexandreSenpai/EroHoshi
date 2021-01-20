import React from 'react'

import { FilledButtonContainer, Button } from './styles';

export default function index({children, ...rest}) {
    return (
        <FilledButtonContainer>
            <Button {...rest}>{children}</Button>
        </FilledButtonContainer>
    )
}
