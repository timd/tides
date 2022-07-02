import Head from "next/head"
import Image from "next/image"

export default function Header() {
    return (
        <>
            <Head>
                <title>Tides</title>
                <meta name="tides" content="current tide at St Bees" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="background">
                <div className="background-inner">
                    <Image
                        src="/stbees.jpg"
                        alt="st bees head"
                        layout="fill"
                    ></Image>
                </div>
            </div>
            <header id="header">
                {/* <h1>Tides</h1> */}
            </header>
        </>
    )
}
