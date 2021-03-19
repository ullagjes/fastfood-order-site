//REACT
import React, { useEffect, useState } from 'react';
//FIREBASE
import firebaseInstance from '../config/firebase'
//CONTEXT 
import { useAuth } from '../config/auth';
//NEXT
import Link from 'next/link';
//STYLE
import styled from 'styled-components';

const HeaderBase = styled.header`

    position: fixed;
    top: 0;
    padding: ${props => props.theme.space[2]};
    width: 100%;
    display: flex;
    z-index: 3;
    background-color: white;
    align-items: baseline;

    h1 {
        font-family: 'Rock Salt', cursive;
        font-size: 1rem;
        margin-right: auto;
    }

    span {
        color: ${props => props.theme.colors.primary};
    }

    p {
        padding-right: ${props => props.theme.space[2]};
        color: ${props => props.theme.colors.primary};
        font-size: 1rem;
        border-right: ${props => props.theme.borders.thin};
    }

    button {
        font-size: 1rem;
        padding-left: ${props => props.theme.space[2]};
        border: none;
        background-color: white;
        cursor: pointer;
        transtion: .5s ease;
    }

    button:hover{
        border-bottom: 2px solid ${props => props.theme.colors.primary};
    }

`

function HeaderComponent() {

    const { user, isAuthenticated } = useAuth();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        console.log(user);
        if(user !== null){
        setUserEmail(user.email);
    }
    }, [isAuthenticated]);

    async function handleSignOut(){
        await firebaseInstance.auth().signOut();
    };
    
    return(
        <HeaderBase>
            <h1>B<span>Ø</span>RRES B<span>U</span>RGERE</h1>
            {(user === null) ? 
            <Link href="/">Logg inn</Link> 
            : 
            <>
                <p> User: {userEmail}</p>
                <button onClick={handleSignOut}>Sign out</button>
            </>
            }
        </HeaderBase>
    );
};

export default HeaderComponent;