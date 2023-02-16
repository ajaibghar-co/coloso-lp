import { sdBox } from '/src/modules/sdf.js'
import { vec2, dot, add, sub, length } from '/src/modules/vec2.js'
import * as v3 from '/src/modules/vec3.js'
import { map } from '/src/modules/num.js'
import { css } from '/src/modules/color.js'

const {sin, cos, floor, PI} = Math

// const density = ' -=+abcdX'
const density = ' -=+abcdX▐░▒▓'
// const density = '▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟'
// const density = '▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▉ ▊ ▋ ▌ ▍ ▎ ▏ ▐ ░ ▒ ▓'

export const settings = {
    // cols: 10
    fps:12
}

// const { sin, cos, floor, abs, exp, min } = Math

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3

export function main(coord, context, cursor, buffer) {
    const t = context.time * 0.0001
    const f = context.frame
    const cols = context.cols
    const rows = context.rows
    const m = map(rows, 0, rows, 2, 10)
    const x = coord.x
    const y = coord.y
    const wave =sin(y*cos(t))*40
    const alt_x = (y % 2 * 2 - 1)
    //    const o = Math.sin(y * Math.sin(t) * 0.2 + x * 0.04 + t) * 20

    const index = (cols + y+ x/2 *alt_x + f) % density.length
    
    const colors = ['black', 'magenta', 'lightgrey', 'lightgreen'];

    const t1 = context.time * 0.0009
	const t2 = context.time * 0.0003
    const quant = 2
	const mult  = 255 / (quant - 1)
	const r = floor(map(sin( PI   + t1), -1, 1, 0, quant)) * mult
	const g = floor(map(sin(PI23 + t2), -1, 1, 0, quant)) * mult
	const b = floor(map(sin(PI43 - t1), -1, 1, 0, quant)) * mult
    return {
		color:  css(r, g, b) ,
        char: density[index],
		// backgroundColor : css(r, g, b) // r, g, b are floats

    }

}

// export function sdBox1(vec3 p, vec b){

// }