import React, { useEffect, useState }from 'react'

const Newtest = () => {

    const [user, setUser] = useState(null)
    useEffect(() => {
      
    console.log('RENDRES På server', window)  
    setUser('test')
    }, [])

    return(
        <>
            <h1>Hei {user && user}</h1>
        </>
    )
}

export const getServerSideProps = async (ctx) => {

    return { props: {} }
}

export default Newtest