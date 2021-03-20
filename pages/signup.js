//REACT
import React, { useState } from 'react';

//FIREBASE
import firebaseInstance from '../config/firebase';

//NEXT
import Link from 'next/link';
import { useRouter } from 'next/router';

//FORM
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

//COMPONENTS
import { FormComponent, FormLink } from '../components/FormComponent';
import HeaderComponent from '../components/HeaderComponent';

//STYLING
import { Flex, Box } from 'reflexbox';

const schema = object().shape({
    email: string().required('Dette feltet er påkrevd'),
    password: string().required('Dette feltet er påkrevd')
});
 
const Signup = () => {

    const router = useRouter();
    const [error, setError] = useState(null);

    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    //Form function creates user in Firebase with data filled in.
    const onSubmit = async (data) => {
        console.log('data', data);
        console.log(errors)
        try {
            await firebaseInstance.auth().createUserWithEmailAndPassword(data.email, data.password)
            firebaseInstance.auth().onAuthStateChanged((user) => {
            addToUsers(user);
            router.push('/menu');
            });
            
        } catch (error) {
            setError(errors.message);
            console.log(error);
        }
    }

    //Function creates a separate document in Firestore collection with user-information.
    function addToUsers(user) {
        const userCollection = firebaseInstance.firestore().collection('users');
        userCollection.doc(user.uid).set({
            userId: user.uid,
            email: user.email,
            previousOrders: []
        });
    }
    return(
        <>
            <HeaderComponent />
            <Flex flexWrap='wrap' mt='2em'>
                <Box width={[1, 1/2]} p={4} m='0 auto'>
                <h1>Register new user</h1>
                <p>Create a new user with your email adress.</p>
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
                    <button type="submit">REGISTER USER</button>
                    {error && <p>{error}</p>}
                    <Link href="/">
                        <FormLink>Already registered? Log in here.</FormLink>
                    </Link>
                    </FormComponent>
                </Box>
            </Flex>  
        </>
    );
};

export default Signup;