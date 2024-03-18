
'use client'
import { SearchIcon } from "@/assets/icons/search-icon";
import { BaseLayout } from "@/components/base-layout/BaseLayout";
import { usePokemonListQuery } from "@/services/api/queries/use-pokemon-list-query";
import { nameFirstLetterToUpperrCase } from "@/utils/string";
import { Avatar, Box, Button, Card, Chip, Divider, Input, Pagination, Stack, SvgIcon, Typography } from "@mui/material";
import { Fragment, useState } from "react";


interface PokemonItem {
  name: string;
  url: string;
}

export const PokeSearch = () => {

  const {isLoading, data} = usePokemonListQuery()

  const pokemonList = data?.data?.results

  const handleChipClick = () => {

  }

  const handleInputChange = () => {

  }

  return (
    <BaseLayout>
      {!isLoading &&
        <Fragment>
        <Typography variant='h4' fontWeight={600}>
          PokeSearch
        </Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          rowGap='32px'
          columnGap='32px'
          justifyContent='center'
          alignItems='center'
          sx={{
            padding: '32px 0px',
            position: 'relative',
            overflowY: 'visible'
          }}>
            <Box sx={{ borderRadius: '50px', backgroundColor: '#FFF', padding: '8px 8px 8px 16px', width: '80%', height: '54px', '&. MuiButton-root': {
                padding: '0px'
            }}}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <SvgIcon>
                        <SearchIcon />
                    </SvgIcon>
                    <Input disableUnderline fullWidth sx={{fontSize: '20px'}} onChange={handleInputChange} />
                </Stack>

            </Box>
            <Card 
                sx={{
                    padding: '16px',
                    borderRadius: '10px',
                    width: '80%',
                    position: 'absolute',
                    top: '90px',
                    '& .MuiChip-root': {
                        paddingX: '4px'
                    },
                    '& .MuiAvatar-img': {
                        height: '80%',
                        width: 'unset'
                    }
                }}>
                    <Stack direction='row' gap={1} flexWrap='wrap' sx={{ height: '100%'}}>
                        {pokemonList.map((item:PokemonItem, index: number) => {

                            return (
                                <Fragment key={index}>
                                <Chip
                                avatar={<Avatar alt={item.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index + 1}.svg`} />}
                                label={nameFirstLetterToUpperrCase(item.name, false)}
                                variant="outlined"
                                onClick={handleChipClick}
                                />
                                </Fragment>
                            )
                        }).slice(0, 10)}
                    </Stack>
            </Card>
        </Stack>
        </Fragment>
      }
    </BaseLayout>
  )
}

export default PokeSearch

/*{pokemonList.map((item: PokemonItem, index: number) => {
          return (
            <Card 
              key={index}
              sx={{
                width: '200px',
                height: '300px',
                borderRadius: '10px',
                '& .MuiTypography-root': {
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
                  {`#${index + 1}${nameFirstLetterToUpperrCase(item.name, false)}`}
                </Typography>
            
            </Card>
          )
        })
        
        }*/