

export const nameFirstLetterToUpperrCase = (value: string | null, upperCase: boolean) => {
    if (!value) {
        return ''
    }

    return upperCase
    ? value.charAt(0) + value.slice(1).toLowerCase()
    : value.charAt(0).toUpperCase() + value.slice(1)

}