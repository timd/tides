import { getApiData } from "./apiClient"
import { generateData } from "./jsonParser"

export interface ITideObject {
    height: string
    relative: string
    trend: string
    dogTrend: IDogTrendObject
}

export interface IDogTrendObject {
    prefix: string
    action: string
    suffix: string
}

export async function getTidesData(): Promise<ITideObject> {
    // Get api data
    const apiData = await getApiData()

    if (apiData.err)
        return {
            height: "0.0",
            relative: "XXX",
            trend: "XXX",
            dogTrend: {
                prefix: "XXX",
                action: "XXX",
                suffix: "XXX"
            }
        }

    const data = generateData(apiData.data)

    return Promise.resolve(data)
}
