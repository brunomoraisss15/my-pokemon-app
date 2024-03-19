'use client'

import { CloseIcon } from "@/assets/icons/close-icon";
import { PlusIcon } from "@/assets/icons/plus-icon";
import { BaseLayout } from "@/components/base-layout/BaseLayout";
import { CenteredCircularProgress } from "@/components/circular-loading/CenteredCircularProgress";
import { usePopover } from "@/hooks/usePopover";
import { usePokemonInfoQuery } from "@/services/api/queries/use-pokemon-info-query";
import { shadeColor } from "@/utils/functions";
import { nameFirstLetterToUpperrCase, splitByHiphenAndFirstLetterUpperrCase } from "@/utils/string";
import { Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, LinearProgress, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";


interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface StateInfo {
    base_stat: number;
    effort: number;
    stat: {name: string; url: string;}
  }

interface Move {
    move: {name: string; url: string};
    version_group_details?: any;
}

interface MoveObject {
    moveInfo: string;
    moveTitle: string;
}

const Page = ({params}: any) => {

    //Próximo passo seria componentizar o código repetido, como o abaixo que se repete no pokemon-search.

    const movePopover = usePopover()

    const pokemonInfo = usePokemonInfoQuery(params.pokemon)

    const pokemonData = pokemonInfo?.data?.data

    const [abilityText, setAbilityText] = useState<string>('Click on the chip above to see the info here.')

    const [moveText, setMoveText] = useState<MoveObject>({} as MoveObject)

    const [moveChipsQuantity, setMoveChipsQuantity] = useState<number>(20)

    const theme = useTheme()

    const downEightHdth = useMediaQuery(theme.breakpoints.down(800))

    const handleAddChipsMove = () => {
        setMoveChipsQuantity((previous) => previous + 20)
    }

    const handleChipAbilityClick = async (name: string) => {
        const pokeAbility = await axios.get(name)
        setAbilityText(pokeAbility.data.flavor_text_entries[pokeAbility.data.flavor_text_entries.length - 1].flavor_text)
      }

    const handleChipMoveClick = async (name: string, title:string) => {
        const pokeMove = await axios.get(name)
        const pokeMoveEnglish = pokeMove.data.flavor_text_entries.filter((item: any) => item.language.name === 'en')
        setMoveText({moveInfo: pokeMoveEnglish[pokeMoveEnglish.length - 1].flavor_text, moveTitle: title})
    }
    
    return (
        <BaseLayout>
            {!pokemonInfo.isLoading && !pokemonInfo.isError &&
                <Fragment>
                    {pokemonData.name && (
                    <Stack direction='column' spacing={5} sx={{marginY: '40px'}}>
                        <Card 
                            sx={{
                            width: '100%',
                            position: 'relative',
                            borderRadius: '10px'
                            }}>
                            <Stack
                                direction={downEightHdth ? 'column' : 'row'}
                                justifyContent='space-between' width='100%'
                            >
                            <Stack
                                direction='row'
                                justifyContent='flex-start'
                                width={downEightHdth ? '100%' : '50%'}
                            >
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
                                    {`#${pokemonData.id} ${nameFirstLetterToUpperrCase(pokemonData.name, false)}`}
                                    </Typography>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`} />
                                    
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
                                <Stack direction='column' justifyContent='flex-start' spacing={5}>
                                    <Typography variant='h5' className="apply-font-weight-title" >
                                        Stats
                                    </Typography>
                                    <Box>
                                        {pokemonData.stats.map((stat: StateInfo, index: number) => {
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
                                    <Typography variant='h5' className="apply-font-weight-title" >
                                        Abilities
                                    </Typography>
                                    <Stack direction='row' spacing={2}>
                                        {pokemonData.abilities.map((abilitie: Ability, index: number) => {
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
                                </Stack>
                            </Box>
                            </Stack>
                        </Card>
                        <Card 
                        sx={{
                        width: '100%',
                        position: 'relative',
                        borderRadius: '10px',
                        padding: '24px 32px'
                        }}>
                            <Stack direction='column' spacing={5}>
                                    <Typography
                                        variant='h5'
                                        fontWeight={600}
                                    >
                                        Moves
                                    </Typography>
                                <Stack
                                    direction='row'
                                    flexWrap='wrap'
                                    gap='8px'
                                >
                                    {pokemonData.moves.map((move: Move, index: number) => {
                                        return (
                                            <Fragment key={index}>
                                                <Chip
                                                    label={splitByHiphenAndFirstLetterUpperrCase(move.move.name)}
                                                    variant="outlined"
                                                    onClick={(event:any) => {
                                                        movePopover.handleOpen(event)
                                                        handleChipMoveClick(move.move.url, splitByHiphenAndFirstLetterUpperrCase(move.move.name))
                                                    }}
                                                    color='warning'
                                                />
                                            </Fragment>
                                        )
                                    }).slice(0, moveChipsQuantity)}
                                </Stack>
                                {moveChipsQuantity < pokemonData.moves.length &&
                                <Button
                                    variant="contained"
                                    startIcon={<PlusIcon />}
                                    onClick={handleAddChipsMove}
                                    sx={{
                                        maxWidth: '200px',
                                        alignSelf: 'center'
                                    }}>
                                    Load More
                                </Button>
                                }
                            </Stack>
                        </Card>
                    </Stack>
            )}
                </Fragment>
                
            }
            {pokemonInfo.isError &&
                <Fragment>
                    <Typography variant='h4' fontWeight={600}>
                        {'404 Not Found'}
                    </Typography>
                </Fragment>
            }
            {pokemonInfo.isLoading &&
                <CenteredCircularProgress />
            }
            <Dialog
                open={movePopover.open}
                keepMounted
                disableScrollLock
                onClose={movePopover.handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{moveText.moveTitle}</DialogTitle>
                <IconButton
                aria-label="close"
                onClick={movePopover.handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {moveText.moveInfo}
                </DialogContentText>
                </DialogContent>
            </Dialog>
                </BaseLayout>
            )

}

export default Page