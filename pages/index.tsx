import { ITideObject, getTidesData } from "../lib/tides"

const Home = ({ tides }: { tides: ITideObject }) => {
    if (!tides) {
        return <h1>no data</h1>
    }

    return (
        <div id="main">
            <p>
                The tide at <strong>St Bees</strong> is currently 
            </p>
            <p>
                <strong>{tides.height}</strong> metres{" "} <strong>{tides.relative}</strong> the mean
            </p>
            <p>
                and is <strong>{tides.trend}</strong>.
            </p>
            <p>
                {tides.dogTrend.prefix} <strong>{tides.dogTrend.action}</strong> {tides.dogTrend.suffix} 
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
