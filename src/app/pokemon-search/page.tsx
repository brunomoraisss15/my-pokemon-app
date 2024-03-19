
'use client'
import { PlusIcon } from "@/assets/icons/plus-icon";
import { SearchIcon } from "@/assets/icons/search-icon";
import { BaseLayout } from "@/components/base-layout/BaseLayout";
import { usePokemonListQuery } from "@/services/api/queries/use-pokemon-list-query";
import { shadeColor } from "@/utils/functions";
import { splitByHiphenAndFirstLetterUpperrCase } from "@/utils/string";
import { Avatar, Box, Button, Card, Chip, Divider, Input, LinearProgress, Stack, SvgIcon, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";

interface PokemonItem {
  name: string;
  url: string;
  id?: number;
}

interface StateInfo {
  base_stat: number;
  effort: number;
  stat: {name: string; url: string;}
}

interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export const PokeSearch = () => {

  //Próximo passo seria componentizar o código repetido, como o abaixo que se repete na page de pokemon.

  const {isLoading, data} = usePokemonListQuery()

  const router = useRouter()

  const [pokemonInfo, setPokemonInfo] = useState<any>({})

  const pokemonList = data?.data?.results.map((item: PokemonItem, index: number) => { return {name: item.name, url: item.url, id: index + 1}})

  const [items, setItems] = useState<PokemonItem[]>([] as PokemonItem[])

  const [abilityText, setAbilityText] = useState<string>('Click on the chip above to see the info here.')

  const myRef = useRef({value: ''})

  const theme = useTheme()
  
  const downEightHdth = useMediaQuery(theme.breakpoints.down(800))

  const handleChipClick = async (name: string) => {
    myRef.current.value = ''
    setItems([])
    const pokeInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    setPokemonInfo(pokeInfo)
    setAbilityText('Click on the chip(s) above to see the info.')


  }

  const handleChipAbilityClick = async (name: string) => {
    const pokeAbility = await axios.get(`${name}`)
    setAbilityText(pokeAbility.data.flavor_text_entries[pokeAbility.data.flavor_text_entries.length - 1].flavor_text)
  }

  const handleInputChange = (event: any) => {
      const newList = pokemonList.filter((item: PokemonItem) => {

        if(!event.target.value) return false 
        return item.name.includes(event.target.value.toLowerCase())
      })
      setItems(newList)
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
            <Box sx={{ borderRadius: '50px',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#FFF',
            padding: '8px 8px 8px 16px',
            width: '80%',
            height: '54px',
            '&. MuiButton-root': {
                padding: '0px'
            }}}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <SvgIcon>
                        <SearchIcon />
                    </SvgIcon>
                    <Input
                      autoFocus
                      disableUnderline
                      fullWidth sx={{fontSize: '20px'}}
                      onChange={handleInputChange}
                      inputRef={myRef}
                    />
                </Stack>

            </Box>
            {items.length > 0 &&
            <Card 
                sx={{
                    padding: '16px',
                    borderRadius: '10px',
                    width: '80%',
                    position: 'absolute',
                    zIndex: 9,
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
                        {items.map((item:PokemonItem, index: number) => {

                            if(!item.id) return

                            return (
                                <Fragment key={index}>
                                <Chip
                                avatar={<Avatar alt={item.name}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`} />}
                                label={splitByHiphenAndFirstLetterUpperrCase(item.name)}
                                variant="outlined"
                                onClick={() => handleChipClick(item.name)}
                                />
                                </Fragment>
                            )
                        }).slice(0, 20)}
                    </Stack>
            </Card>
            }
            {pokemonInfo?.data?.name &&(
              <Card 
                sx={{
                  width: '80%',
                  position: 'relative',
                  borderRadius: '10px'
                  }}>
                <Stack direction={downEightHdth ? 'column' : 'row'} justifyContent='space-between' width='100%'>
                  <Stack direction='row' justifyContent='flex-start' width={downEightHdth ? '100%' : '50%'}>
                      <Box sx={{
                        height: '600px',
                        width: '100%',
                        paddingTop: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        '& img': {
                          maxWidth: '60%'
                        }
                      }}>
                        <Typography
                          variant="h4"
                          sx={{
                            position: 'absolute',
                            top: '24px',
                            left: '32px',
                            zIndex: 1,
                            fontWeight: 600
                          }}>
                          {`#${pokemonInfo.data.id} ${splitByHiphenAndFirstLetterUpperrCase(pokemonInfo.data.name)}`}
                        </Typography>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonInfo.data.id}.svg`} />
                        
                      </Box>
                    <span>
                      <Divider orientation="vertical" />
                    </span>
                  </Stack>
                  <Box sx={{
                    width: downEightHdth ? '100%' : '50%',
                    padding: '24px',
                    '& .apply-font-weight-title': {
                      fontWeight: 600
                    }
                  }}>
                    <Stack
                      direction='column'
                      justifyContent='flex-start'
                      spacing={5}>
                      <Typography
                        variant='h5'
                        className="apply-font-weight-title" >
                        Stats
                      </Typography>
                      <Box>
                        {pokemonInfo.data.stats.map((stat: StateInfo, index: number) => {
                            const color = stat.stat.name === 'hp'
                            ? '#1ED760'
                            : stat.stat.name === 'attack'
                            ? '#FF0000'
                            : stat.stat.name === 'defense'
                            ? '#4C7EC4'
                            : stat.stat.name === 'special-attack'
                            ? '#B20000'
                            : stat.stat.name === 'special-defense'
                            ? '#0000CC'
                            : '#FFD966'

                          return (
                            <Box key={index} sx={{
                              '& span:nth-of-type(2)': {
                                backgroundColor: stat.base_stat > 100 ? shadeColor(color, -50) : '#F2F2F2'
                              },
                              '& span span': {
                                backgroundColor: color
                              }
                            }}>
                              <Typography variant="caption">
                                {splitByHiphenAndFirstLetterUpperrCase(stat.stat.name)}
                                <strong>{`: ${stat.base_stat}`}</strong>
                              </Typography>
                              <LinearProgress
                                variant= 'determinate'
                                value={stat.base_stat}
                              />
                            </Box>
                          )
                        })}
                      </Box>
                      <Typography
                        variant='h5'
                        className="apply-font-weight-title" >
                        Abilities
                      </Typography>
                      <Stack direction='row' spacing={2}>
                        {pokemonInfo.data.abilities.map((abilitie: Ability, index: number) => {
                          return (
                            <Fragment key={index}>
                                <Chip
                                  label={splitByHiphenAndFirstLetterUpperrCase(abilitie.ability.name)}
                                  variant="outlined"
                                  onClick={() => handleChipAbilityClick(abilitie.ability.url)}
                                  color='warning'
                                />
                            </Fragment>
                          )
                        })}
                      </Stack>
                      <Typography variant="caption" fontWeight={700}>
                        {abilityText}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => router.push(pokemonInfo?.data?.name)}
                        startIcon={<PlusIcon />}
                        sx={{
                          maxWidth: '150px'
                        }}>
                          See More
                      </Button>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            )}
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