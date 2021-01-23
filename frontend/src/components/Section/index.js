import React from 'react';

import { SectionContainer, TitleSection, TitleSectionContainer, SectionThumbsContainer } from './styles';

export default function Section({SectionTitle, TitleIcon, Content }){
    return(
        <SectionContainer>
            <TitleSectionContainer>
                <TitleIcon fontSize="inherit" color="inherit" /><TitleSection>{SectionTitle}</TitleSection>
            </TitleSectionContainer>
            <SectionThumbsContainer>
                <Content />
            </SectionThumbsContainer>
        </SectionContainer>
    );
}