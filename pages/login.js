import { object, string } from "yup";

import React, { useState, useEffect } from 'react'
import firebaseInstance from '../config/firebase'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'

/*const schema = object().shape({
    email: string().required('Dette feltet er påkrevd'),
    password: string().required('Dette feltet er påkrevd')
})*/

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)

    /*const { register, handleSubmit, watch, errors } = useForm({
        mode: 'onChange',
        //når skjema skal sendes inn, settes dette inn som "ferdig utfylt"
        defaultValues: 
            //fyller inn default values
            {
                email: 'ulla@epost.no'
            },
            //}
        resolver: yupResolver(schema)
        
    })*/

    /*useEffect(() => {
        firebaseInstance.auth().onAuthStateChanged((user) => {
          if(user) {
            console.log(user.uid)
          } else {
            console.log('wups')
    
          }
        })
      }, [])*/

    const onSubmit = async (event) => {
      event.preventDefault()

        try {
            await firebaseInstance.auth().signInWithEmailAndPassword(email, password)
            console.log('Du er logget inn')
            router.push('/test')
        } catch (error) {
            setError(error.message)
        }

        //console.log('Form data', data)

    }

    /*useEffect(() => {
        console.log(errors)

    }, [errors])*/
    

    return(
        <>
            
            <form onSubmit={onSubmit}>
                <input 
                type="text" 
                name="email" 
                placeholder="email" 
                
                //({ required: true, maxLength: 4})
                onChange={event => setEmail(event.target.value)}
                />
                <input 
                type="password" 
                name="password" 
                placeholder="password"
                onChange={event => setPassword(event.target.value)}
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