import { getApiData } from "./apiClient"
import { generateData } from "./jsonParser"

export interface ITideObject {
    height: number
    relative: string
    trend: string
}

export async function getTidesData(): Promise<ITideObject> {
    // Get api data
    const apiData = await getApiData()

    if (apiData.err)
        return {
            height: 0.0,
            relative: "XXX",
            trend: "XXX",
        }

    const data = generateData(apiData.data)

    return Promise.resolve(data)
}
