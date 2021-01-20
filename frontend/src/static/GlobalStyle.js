import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *:before, *:after, *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    } 

    html, body, #root{
        width: 100%;
        font-size: 10px;
        background: #18191A;
        color: #f1f1f1;
        font-family: 'Roboto', -apple-system, 'Segoe UI', Roboto, 'Open Sans', sans-serif;
    }

    ul{
        list-style: none;
    }

`;