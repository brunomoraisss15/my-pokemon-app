
'use client'
import { BaseLayout } from "@/components/base-layout/BaseLayout";
import { usePokemonListQuery } from "@/services/api/queries/use-pokemon-list-query";
import { nameFirstLetterToUpperrCase } from "@/utils/string";
import { Box, Card, Divider, Link, Pagination, Stack, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";


interface PokemonItem {
  name: string;
  url: string;
}

export const Home = () => {

  const [addItems, setaddItems] = useState(0)

  const [infinityScrollMode, setInfinityScrollMode] = useState(false)

  const {isLoading, data} = usePokemonListQuery()

  const router = useRouter()

  const pokemonList = data?.data?.results

  const [page, setPage] = useState<number>(1)

  const theme = useTheme()

  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  const handleSwitchScroll = () => {
    setInfinityScrollMode((previous) => !previous)
    setPage(1)
    setaddItems(0)
  }

  const handlePageChange = (value: number) => {
    setPage(value)
  }

  useEffect(() => {
    document.body.addEventListener('scroll', (_) => {
      const scrollTop:number = document.body.scrollTop
      const innerHeight:number = window.innerHeight
      const scrollHeight:number = document.body.scrollHeight
      if (scrollTop + innerHeight === scrollHeight) {
        setaddItems((previous) => previous + 5)
      }
    })
  }, [])

  return (
    <BaseLayout>
      {!isLoading &&
        <Fragment>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h4' fontWeight={600}>
            Pokemon List
          </Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography sx={{fontSize: '14px'}}>
              {'Infinity Scroll?'}
            </Typography>
            <Switch checked={infinityScrollMode} onChange={handleSwitchScroll} />
          </Stack>
        </Stack>
        <Stack
          direction='row'
          flexWrap='wrap'
          rowGap='32px'
          columnGap='32px'
          justifyContent='center'
          alignItems='center'
          sx={{
            padding: '32px 0px'
          }}>
        {pokemonList.map((item: PokemonItem, index: number) => {
          return (
            <Link
              onClick={() => router.push(item.name)}
              key={index}
              sx={{
              textDecoration: 'none',
            }}>
              <Card 
                sx={{
                  width: '200px',
                  height: '300px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                      ':hover': {
                        transform: 'scale(1.05)'
                      }
                  }}>
                  <Box sx={{
                    width: '100%',
                    height: '200px',
                    marginBottom: '40px',
                    paddingTop: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    '& img': {
                      width: '90%',
                      height: '200px'
                    }
                  }}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} />
                  </Box>
                  <Divider />
                  <Typography
                    variant='h5'
                    align='center'
                    sx={{
                      marginTop: '12px'
                    }}
                    >
                    {`#${index + 1} ${nameFirstLetterToUpperrCase(item.name, false)}`}
                  </Typography>
              
              </Card>
            </Link>
          )
        }).slice((page - 1)*10, infinityScrollMode ? (((page-1)*10 + 10 + addItems)) : ((page-1)*10 + 10))
        
        }
        </Stack>
        </Fragment>
      }
      {!infinityScrollMode &&
        <Pagination
        
          count={pokemonList && Math.ceil(pokemonList?.length/10)}
          size={smUp ? 'large' : 'small'}
          color='primary'
          onChange={(_, value) => handlePageChange(value)}
          page={page}
          sx={{ 
            display: 'flex',
            justifyContent: 'center',
            paddingY: '24px'
          }}/>
        }
    </BaseLayout>
  )
}

export default Home

