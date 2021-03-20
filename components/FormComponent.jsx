import styled from 'styled-components'

export const FormComponent = styled.form`
    background-color: ${props => props.theme.colors.white};
    border: ${props => props.theme.borders.thick};
    color: ${props => props.theme.colors.text};
    padding: ${props => props.theme.space[3]};
    height: 100%;
    display: flex;
    flex-direction: column;
    

    input {
        padding: ${props => props.theme.space[2]};
        margin: ${props => props.theme.space[2]};
        background-color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.text};
    }

    input:focus {
        border: ${props => props.theme.borders.thickPink};
        outline: none;
    }

    label {
        padding: ${props => props.theme.space[0]};
        margin: ${props => props.theme.space[2]};
        color: ${props => props.theme.colors.primary};
        font-weight: 600;
    }

    button {
        width: 50%;
        margin: 2em auto;
        color: ${props => props.theme.colors.primary};
        font-weight: 600;
        border: ${props => props.theme.borders.thick};
        padding:  ${props => props.theme.space[2]};
        font-size: ${props => props.theme.space[3]};
        cursor: pointer;
        background-color: ${props => props.theme.colors.white}
    }

    button:focus {
        border: ${props => props.theme.borders.hover};
    }

    button:hover {
        border: ${props => props.theme.borders.hover};
    }


`

export const FormLink = styled.a`
    color: ${props => props.theme.colors.primary};
    cursor: pointer;
    text-align: center;
    margin-top: ${props => props.theme.space[4]};

    :hover {
        text-decoration: underline;
    }

    :focus {
        text-decoration: underline;
    }

    :active {
        font-weight: 600;
    }
` 