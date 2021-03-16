
//REACT
import React, { useState, useEffect } from 'react'

//FIREBASE
import firebaseInstance from '../config/firebase'

//FORM
import { object, string } from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//NEXT JS
import Link from 'next/link'
import { useRouter } from 'next/router'

//STYLING
import { Box } from 'reflexbox'

const schema = object().shape({
    email: string().required('Dette feltet er påkrevd'),
    password: string().required('Dette feltet er påkrevd')
})

const Home = () => {
    const router = useRouter()

    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        defaultValues: 
            {
                email: 'dinepost@epost.no'
            },
        resolver: yupResolver(schema)
        
    })


    const onSubmit = async (data) => {
        console.log('Form data', data)
        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(data.email, data.password)
            console.log('Du er logget inn')
            router.push('/menu')
        } catch (error) {
            setError(error.message)
        }
    }
    

    return(
        <>  
            <Box></Box>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                </form>
                <Link href="/signup">Ny hos Børres burgere? Registrer deg her.</Link>
        
        </>
        
    )
}

export default Home

/**<form onSubmit={handleSubmit(onSubmit)}>
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