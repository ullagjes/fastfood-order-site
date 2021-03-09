export default function AboutPage() {

    let a = true
    if(a === true) {
        throw new Error('Dette er en test.')
    }
    return(
        <p>Om meg</p>
    )
}