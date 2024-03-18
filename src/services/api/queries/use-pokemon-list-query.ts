import { useQuery } from 'react-query'
import { client } from '../client'

export const usePokemonListQuery = () => {

    return useQuery(
        ['pokemon-list'],
        async () => {
            const myClient = client()

            const response = await myClient.get('pokemon?offset=0&limit=600')

            return response
        }
    )
}