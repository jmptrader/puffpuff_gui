export function addState(data: any, state) {
    if (typeof data.length === 'number') {
        for (let item of data) {
            state = checkAdd(item, state)
        }
        return state
    }
    return checkAdd(data, state)
}

export function checkAdd(data: any, state) {
    for(let item of state) {
        if (item.id === data.id) return state
    }

    if (state.indexOf(data) === -1) state.push(data)
    return state
}