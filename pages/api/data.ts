import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    height: number
    relative: string
    trend: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = {
        height: 1.23,
        relative: "above",
        trend: "rising",
    }

    return data
}
