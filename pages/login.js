import { object, string } from "yup";
import React, { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import firebaseInstance from '../config/firebase'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'


import { useRouter } from 'next/router'


const schema = object().shape({
    email: string().required('Dette feltet er påkrevd'),
    password: string().required('Dette feltet er påkrevd')
})

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        defaultValues: 
            {
                email: 'dinepost@epost.no'
            },
        resolver: yupResolver(schema)
        
    })

    /*useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
          if(user) {
            console.log(user.uid)
          } else {
            console.log('wups')
    
          }
        })
      }, [])*/

    //Spørsmål: hvor skjer login nå?
    const onSubmit = async (data) => {
      //event.preventDefault()
        console.log('Form data', data)
        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(data.email, data.password)
            console.log('Du er logget inn')
            router.push('/test')
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        console.log('Errors', errors)

    }, [errors])
    

    return(
        <>
            
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
        </>
        
    )
}

export default Login

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
            </form> */