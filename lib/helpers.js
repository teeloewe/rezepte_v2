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