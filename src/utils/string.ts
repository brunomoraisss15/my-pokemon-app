

export const nameFirstLetterToUpperrCase = (value: string | null, upperCase: boolean) => {
    if (!value) {
        return ''
    }

    return upperCase
    ? value.charAt(0) + value.slice(1).toLowerCase()
    : value.charAt(0).toUpperCase() + value.slice(1)

}


export const splitByHiphenAndFirstLetterUpperrCase = (value: string) => {
    
    const arrayValue = value.split('-')
    if (arrayValue.length === 1) {
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
    else {
        return `${arrayValue[0].charAt(0).toUpperCase()+ arrayValue[0].slice(1)} ${arrayValue[1].charAt(0).toUpperCase() + arrayValue[1].slice(1)}`
    }

}

export const getFirstLetter = (value:any) => {
    return value ? value[0].toUpperCase() : ''
}