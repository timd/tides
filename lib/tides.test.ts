import axios from "axios"
import { getApiData } from "./apiClient"
import { getTidesData } from "./tides"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("The API client", () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it("should call the API to get data", async () => {
        const mockResponse = {
            data: {
                context:
                    "http://environment.data.gov.uk/flood-monitoring/meta/context.jsonld",
                meta: {
                    publisher: "Environment Agency",
                },
                items: [
                    {
                        "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T11-30-00Z",
                        dateTime: "2022-07-02T11:30:00Z",
                        measure:
                            "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
                        value: 2.0,
                    },
                    {
                        "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/E73639-anglian-level-tidal_level-Mean-15_min-mAOD/2022-07-02T11-15-00Z",
                        dateTime: "2022-07-02T11:15:00Z",
                        measure:
                            "http://environment.data.gov.uk/flood-monitoring/id/measures/E73639-anglian-level-tidal_level-Mean-15_min-mAOD",
                        value: 1.0,
                    },
                ],
            },
        }

        mockedAxios.get.mockImplementationOnce(() =>
            Promise.resolve(mockResponse)
        )

        const data = await getTidesData()

        expect(data.height).toBe(2.0)
        expect(data.trend).toBe("rising")
        expect(data.relative).toBe("above")
        await expect(mockedAxios.get).toBeCalledTimes(1)
    })

    it("should handle an error nicely", async () => {
        const message = "Network Error"
        mockedAxios.get.mockRejectedValueOnce(new Error(message))

        const returnedData = await getApiData()
        expect(returnedData).toBeDefined
        expect(returnedData["result"]).toBeFalsy()
        await expect(mockedAxios.get).toBeCalledTimes(1)
    })

    it("should return error data when the network call fails", async () => {
        const message = "Network Error"
        mockedAxios.get.mockRejectedValueOnce(new Error(message))

        const data = await getTidesData()
        expect(data.height).toBe(0)
        expect(data.trend).toBe("XXX")
        expect(data.relative).toBe("XXX")
        await expect(mockedAxios.get).toBeCalledTimes(1)
    })
})
