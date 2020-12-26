import React from 'react'
import styled from 'styled-components'

//styled component
const FooterDiv = styled.footer`
margin-top: 30px;
background-color: rgb(89, 175, 204);
height: 150px;
`

function Footer() {
    return (
        <FooterDiv>
            <h1>footer</h1>
        </FooterDiv>
    )
}

export default Footer
