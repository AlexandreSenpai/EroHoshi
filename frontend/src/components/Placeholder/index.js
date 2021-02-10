import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React from 'react';

export default function PlaceholderThumb(){
    return(
      <SkeletonTheme color="#18191A" highlightColor="#222">
        <Skeleton count={1} width="23rem" height="35rem" style={{margin: ".3rem"}} />
      </SkeletonTheme>
    );
}