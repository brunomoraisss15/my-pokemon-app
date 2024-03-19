import { useQuery } from 'react-query'
import { client } from '../client'

export const usePokemonInfoQuery = (name: string) => {

    return useQuery(
        ['pokemon-info'],
        async () => {
            if(!name) return
            const myClient = client()

            const response = await myClient.get(`pokemon/${name}`)
            return response
        }
    )
}