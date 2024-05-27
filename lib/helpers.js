export function errorHandle(code, name) {
    return {
        error: name,
        code,
        data: {}
    }
}

export function successHandle(data) {
    return {
        error: {},
        code: 200,
        data
    }
}

export const includeRezeptObj = {
    tags: {
        select: {
            name: true,
            kategorie: {
                select: {
                    name: true,
                }
            }
        }
    },
    zutaten: {
        select: {
            quantity: true,
            zutat: {
                select:  {
                    name: true
                }
            },
            einheit: {
                select: {
                    name: true
                }
            }
        }
    }
}

export function compare ( a, b ) {
    const name1 = a.name.toLowerCase()
    const name2 = b.name.toLowerCase()

    if ( name1 < name2 ) return -1
    if ( name1 > name2 ) return 1
    return 0
}