import { css } from '/src/modules/color.js'
import { map,fract,clamp,sign,mix } from '/src/modules/num.js'
import { sort } from '/src/modules/sort.js'

// export const settings = {
	// color : 'white',
	// backgroundColor : 'white'
// }

const {sin, round,abs, cos, floor} = Math
const densityArr = ['| |.|,|:|;|x|K|Ñ|R|a|+|=|-|_',  "█▓▒░000111_ ", '/\\MXYZabc!?=-. ']
// const density = sort('/\\MXYZabc!?=-. ', 'Simple Console', false)
const density = 
    "█▓▒░000111_ "

export function main(coord, context) {
	const t = context.time * 0.0005
    
	const x = coord.x
	const y = coord.y

	const c = context.cols
	const posCenter = floor((c - density.length) * 0.5)
	// const c2 = context.rows
	// const posX = floor((c2 - density2.length) * 0.5)

	const wave1 = sin(y * sin(t) * 0.03 + y * 0.01) * 5
	const wave2 = sin(y * x  * 0.01) * 20
	

	const direction = coord.y

	const f = context.frame * 0.05

    //color option 1
    const colors = ['black', 'magenta', 'lightgrey', 'lightgreen'];

    //color option 2
    const r1 = map(cos(direction * 0.06 + 1 -f), -1, 1, 0, 255)
    const g1 = map(cos(direction * 0.07 + 2 -f), -1, 1, 0, 255)
    const b1 = map(cos(direction * 0.08 + 3 -f), -1, 1, 0, 255)
    const r2 = map(cos(direction * 0.03 + 1 -f), -1, 1, 0, 255)
    const g2 = map(cos(direction * 0.04 + 2 -f), -1, 1, 0, 255)
    const b2 = map(cos(direction * 0.05 + 3 -f), -1, 1, 0, 255)


    //sine waves
    const o = sin(y * x * sin(t) * 0.003 + y * 0.01 + t) * 20
	const a = round(abs(x + y)) % density.length

    //index numbers
    const i = floor(x+ wave1) //- posCenter
	const j = floor(i +wave2) 
    
	// Note: “undefined” is rendered as a space…
	return {
		char: densityArr[a],
		color: colors % colors.length,
		backgroundColor : 'white',
	}
}