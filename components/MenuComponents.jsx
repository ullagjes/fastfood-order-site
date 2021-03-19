import styled from 'styled-components'



export const MenuBase = styled.main`
    width: 90vw;
    max-width: 1200px;
    margin: .5em auto;
    padding-bottom: ${props => props.theme.space[2]};

    button {
        width: 100%;
        border: ${props => props.theme.borders.thick};
        padding:  ${props => props.theme.space[3]};
        font-size: 1.5em;
        cursor: pointer;
        background-color: ${props => props.theme.colors.white};
        
        margin-top: ${props => props.theme.space[1]};    
        margin-bottom: .2em;
        
    }

    button:hover {
        border: ${props => props.theme.borders.hover};
    }

    button:focus: {
        border: ${props => props.theme.borders.hover};
    }

    .activeButton{
        background-color: ${props => props.theme.colors.primary}
    }


`

export const MenuContainer = styled.main`

    width: 90vw;
    margin: 0 auto;

    article {
        width: 100%;
        margin: 1em auto;
        border: ${props => props.theme.borders.thick};
        padding: ${props => props.theme.space[3]};
        height: auto;
    }

    form {
        width: 100%;
        margin: 2em auto;
        border: ${props => props.theme.borders.thick};
        height: auto;
        padding: ${props => props.theme.space[3]};
        
        label {
            font-size: 1.2rem;
            line-height: 30px;
        }

        label:hover{
            color: ${props => props.theme.colors.primary}  
        }

        
    }

    .selected {
            color: ${props => props.theme.colors.primary}
        }

    span {
        color: ${props => props.theme.colors.primary};
        border-bottom: ${props => props.theme.borders.thin};
    }

    button {
        width: 40%;
        margin-top: ${props => props.theme.space[3]};
        border: ${props => props.theme.borders.thick};
        padding:  ${props => props.theme.space[2]};
        font-size: ${props => props.theme.space[3]};
        cursor: pointer;
        background-color: ${props => props.theme.colors.white}
    }

    button:hover {
        border: ${props => props.theme.borders.hover};
    }

    button:focus: {
        border: ${props => props.theme.borders.hover};
    }


`