import styled from 'styled-components';

const OrderComponent = styled.main`
    
    display: flex;
    width: 100%;
    max-width: 1500px;

    h2 {
        text-align: center;
    }

    article {
        padding: ${props => props.theme.space[4]};
        border: ${props => props.theme.borders.thick};
        width: 50%;
        margin: ${props => props.theme.space[1]};
    }

    .order {
        width: 48%;
        padding: ${props => props.theme.space[1]};
        line-height: 1em;
        border-bottom: ${props => props.theme.borders.thin};
        background-color: ${props => props.theme.colors.primaryLight};
        margin: ${props => props.theme.space[1]};
        display: flex;
        flex-direction: column;
        align-content: center;
    }

    .order ul {
        list-style-type: none;
        margin: 1em;
        padding: 0;
    }

    .order h4 {
        margin: 1em;
    }

    .order h3 {
        text-align: center;
    }

    .order p {
        margin: 1em;
    }

    .order button {
        border: ${props => props.theme.borders.thin};
        padding: ${props => props.theme.space[1]};
        background-color: white;
        font-size: 1.1rem;
        cursor: pointer;
        width: 90%;
        align-self: center;
    }

    .order button:hover {
        background-color: ${props => props.theme.colors.primary};
        color: white;
    }

    .orderContainer {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .orderNumber{
        background-color:  ${props => props.theme.colors.primary};
        width: 30%;
        min-width: 150px;
        padding:${props => props.theme.space[2]}; 
        font-size: 2rem;
        text-align: center;
    }

    
`

export default OrderComponent;