import styled from 'styled-components'

const ReceiptComponent = styled.article`
    width: 95%;
    max-width: 800px;
    margin: 9em auto;
    border: ${props => props.theme.borders.thick};
    padding: ${props => props.theme.space[2]};
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-family: 'Rock Salt', cursive;
        font-size: 1.3em;
    }

    h2 {
        font-size: 1.2rem;
        font-family: 'Rock Salt', cursive;
    }

    .orderNumber {
        background-color:  ${props => props.theme.colors.primary};
        color: white;
        width: 25%;
        min-width: 150px;
        padding:${props => props.theme.space[1]}; 
        font-size: 1.6rem;
        text-align: center;
    }

    p {
        padding:${props => props.theme.space[1]}; 
    }

    div {
        background-color: ${props => props.theme.colors.primaryLight};
        padding: ${props => props.theme.space[1]};
        margin-top: ${props => props.theme.space[1]};
        max-width: 750px;
        
    }



`

export default ReceiptComponent