/**
@author opheliagame
@title  monument 3
@desc   block chain
*/

export const settings = {
	fontSize: '18px',
  // once: true,
}

const density = '9876543210?!abc;:+=-,._ '
// const density = '/\;:+=-,._ '


import { sdCircle, sdSegment, opSmoothUnion } from '/src/modules/sdf.js'
import { sort } from '/src/modules/sort.js'
import { length, max, vec2, add, sub, mulN } from '/src/modules/vec2.js'
import { vec3 } from '/src/modules/vec3.js'
import { mix, map, smoothstep, smootherstep, fract } from '/src/modules/num.js';
import { fill, stroke } from '/src/programs/test/draw.js';
import { CGA } from '/src/modules/color.js' 
import { random, gnoise } from '/src/programs/test/generative.js'
const { floor, sin, cos, tan, PI } = Math


export function main(coord, context, cursor, buffer) {
	const t  = context.time * 0.001
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	
	
	let pt = {
		x : fract(st.x * 2.0) - 0.5,
		y : fract(st.y * 4.0) - 0.5
	}

  let fy = Math.floor((st.y*4.0))
  let rn = gnoise(fy+t)
  
  // let sdf1 = sdSegment(st, vec2(-rn, fract(st.y*4.0)*fy), vec2(rn, fract(st.y*4.0)*fy), 0.6)
  let sdf1 = sdSegment(st, vec3(-rn, st.y, 0.0), vec3(rn, st.y, 0.0), 0.1)

  return sdf1 < 0.0 ? density[Math.floor(Math.abs(st.x*10.0+random(st.y)+t))] : ''
  // return fract(st.y*4.0)*fy < 1.0 ? ':' : ''
  return rn
}
