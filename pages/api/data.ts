import { ApiData, getApiData } from "../../lib/apiClient"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiData>
) {
    const data = {
        height: 1.23,
        relative: "above",
        trend: "rising",
    }

    const result = await getApiData()

    res.status(200).json(result)
}
