import { ITideObject, getTidesData } from "../lib/tides"

const Home = ({ tides }: { tides: ITideObject }) => {
    if (!tides) {
        return <h1>no data</h1>
    }

    return (
        <div id="main">
            <p>
                The tide at St Bees is <strong>{tides.height}</strong>m{" "}
            </p>
            <p>
                <strong>{tides.relative}</strong> the mean
            </p>
            <p>
                and is <strong>{tides.trend}</strong>
            </p>
        </div>
    )
}

export default Home

export async function getServerSideProps() {
    let tides = await getTidesData()
    tides = JSON.parse(JSON.stringify(tides))

    return {
        props: { tides },
    }
}
