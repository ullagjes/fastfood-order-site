import Link from 'next/link'

export default function Navigation() {
    return(
        <header>
            <nav>
                <Link href="/about">
                    <a>Om meg</a>
                </Link>
                <Link href="/contact">
                    <a>Kontakt</a>
                </Link>
                <Link href="/">
                    <a>Hjem</a>
                </Link>
            </nav>
        </header>
    )
}