export const platform = require('platform')

export let mobiles: string[] = [
    'Android',
    'Windows Phone',
    'iOS',
    'BlackBerry'
]

mobiles = mobiles.map((value: string) => value.toString())

export function isMobile() {
    if (!platform || !platform.os || !platform.os.family) return false
    if (mobiles.indexOf(platform.os.family.toString()) === -1) {
        return false
    }

    return true
}
