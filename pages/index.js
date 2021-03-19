
//REACT
import React, { useState, useEffect } from 'react';

//NEXT JS
import Link from 'next/link';
import { useRouter } from 'next/router';

//FIREBASE
import firebaseInstance from '../config/firebase';

//FORM
import { object, string } from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//CONTEXT
import { useAuth } from '../config/auth'

//COMPONTENTS
import { FormComponent, FormLink } from '../components/FormComponent';
import HeaderComponent from '../components/HeaderComponent'

//STYLING
import { Flex, Box } from 'reflexbox';


const schema = object().shape({
    email: string().required('Dette feltet er påkrevd'),
    password: string().required('Dette feltet er påkrevd')
});

const Home = () => {
    
    const router = useRouter()
    
    //==============================================USER VALIDATION
    const { isAuthenticated } = useAuth()

    if(isAuthenticated){
        router.push('/menu')
    }

    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(data.email, data.password)
            router.push('/menu')
        } catch (errors) {
            console.log(errors.message)
        };
    };


    return(
        <>
            <HeaderComponent />
            <Flex flexWrap='wrap' mt='4em'>
                <Box width={[1, 1/2]} p={4} m='0 auto'>
                    <h1>Burger time?</h1>
                    <p>Log in or register a user to order delicious burgers.</p>
                    <FormComponent onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">EMAIL:</label>
                        <input 
                        type="text" 
                        name="email" 
                        placeholder="EMAIL" 
                        ref={register}
                        />
                        <label htmlFor="password">PASSWORD:</label>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder="PASSWORD"
                        ref={register}
                        />
                        <button type="submit">LOG IN</button>
                        <Link href="/signup">
                            <FormLink>New user? Register a new user here.</FormLink>
                        </Link>
                    </FormComponent>
                </Box>
            </Flex>
        </>
    );
};

export default Home;

/**
 * //({ required: true, maxLength: 4})
                    //onChange={event => setEmail(event.target.value)}
                    
                    //onChange={event => setPassword(event.target.value)}
 * <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                type="text" 
                name="email" 
                placeholder="email" 
                ref={register}
                //({ required: true, maxLength: 4})
                //onChange={event => setEmail(event.target.value)}
                />
                <input 
                type="password" 
                name="password" 
                placeholder="password"
                ref={register}
                //onChange={event => setPassword(event.target.value)}
                 />
                <button type="submit">Logg inn</button>
                {error && <p>{error}</p>}
            </form>
            
            
            
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    
    useEffect(() => {
        console.log('Errors', errors)

    }, [errors])
            
            */