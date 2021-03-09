
//sette opp url-parametere

function GamePage({ id }){
    return(
        <h1>Du er på side med id {id}</h1>
    )
}

//query inneholder all info om hva next blir spurt om når den skal rendre komponenten
//.id viser til navnet i brackets
GamePage.getInitialProps = async ({ query }) => {
    return {
      id: query.id  
    }
}

export default GamePage