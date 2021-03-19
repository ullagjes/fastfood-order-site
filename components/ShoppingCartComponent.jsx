import styled from 'styled-components'

export const ShoppingCartComponent = styled.article`

    border: ${props => props.theme.borders.thick};
    width: 90vw;
    margin: 1em auto;
    padding: ${props => props.theme.space[2]};
    button {
        width: 50%;
        margin: 1em auto;
        border: ${props => props.theme.borders.thick};
        padding: ${props => props.theme.space[2]};
        font-size: 1rem;
        cursor: pointer;
        background-color: ${props => props.theme.colors.primary};
        transition: .2s ease;
    }
    
    button:hover {
        border: ${props => props.theme.borders.hover};
        
        background-color: ${props => props.theme.colors.text};
        color: ${props => props.theme.colors.primary};
    }
    
    button:focus: {
        border: ${props => props.theme.borders.hover};
    }

    

    div {
        background-color: ${props => props.theme.colors.primaryLight};
        padding: ${props => props.theme.space[1]};
        margin-top: ${props => props.theme.space[1]};
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        line-height: .3rem;
        
        .remove {
            width: 10%;
            font-weight: 600;
            margin: .5em;
            border: ${props => props.theme.borders.thickPink};
            background-color: white;
            width: 11%;
            align-self: flex-end;
            font-size: .8em;
            transition: .3s;
        }

        .remove:hover {
            background-color: ${props => props.theme.colors.primary};
            color: white;
        }
    }
`
