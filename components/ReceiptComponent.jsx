import styled from 'styled-components'

const ReceiptComponent = styled.main`
    width: 95%;
    max-width: 800px;
    margin: 9em auto;
    border: ${props => props.theme.borders.thick};
    padding: ${props => props.theme.space[2]};
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
        display: flex;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        padding: ${props => props.theme.space[2]};
    }

    .orderDetailsArticle,
    .orderCompleteArticle {
        background-color: ${props => props.theme.colors.primaryLight};
        display: flex;
        flex-direction: column;
        margin: ${props => props.theme.space[2]};
        width: 100%;
        max-width: 400px;

        
    }

    .orderDetailsArticle {
        background-color: ${props => props.theme.colors.primaryLight};
    }

    .orderCompleteArticle {
        border: ${props => props.theme.borders.thickPink};
    }
    .sum {
        width: 80%;
        margin: .5em auto;
        font-size: 1.2rem;
        border-bottom: ${props => props.theme.borders.thin};
    }
    h1 {
        font-family: 'Rock Salt', cursive;
        font-size: 1.3em;
        text-align: center;
    }

    section h2 {
        font-size: 1.1rem;
        font-family: 'Rock Salt', cursive;
        
        text-align: center;  
    }

    article h2 {
        font-size: 1.1rem;
        font-family: 'Rock Salt', cursive;
        
        text-align: center;
    }

    .orderCard {
        border-bottom: ${props => props.theme.borders.thin};
        margin: 1.5em auto;
        width: 80%;
    }

    .orderNumberContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: ${props => props.theme.space[2]};
        width: 100%;
        align-items: center;
    }

    .orderNumber,
    .orderNumberComplete {
        
        margin: ${props => props.theme.space[1]}; 
        
        width: 20%;
        min-width: 120px;
        padding:${props => props.theme.space[1]}; 
        font-size: 1.6rem;
        text-align: center;
    }

    .orderNumber {
        background-color: ${props => props.theme.colors.primaryLight};
        color: ${props => props.theme.colors.text};
    }
    
    .orderNumberComplete {
        background-color: ${props => props.theme.colors.primary};
        color: white;
    }

    p {
        padding:${props => props.theme.space[1]}; 
    }

    div {
        
        padding: ${props => props.theme.space[1]};
        margin-top: ${props => props.theme.space[1]};
        width: 100%;
        
    }



`

export default ReceiptComponent