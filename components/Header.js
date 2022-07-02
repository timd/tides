import Head from "next/head"
import Image from "next/image"

export default function Header() {
    return (
        <Head>
            <title>Tides</title>
            <meta name="tides" content="current tide at St Bees" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
