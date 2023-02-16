/**
[header]
@author Raurir
@title  Stacked sin waves
@desc   noob at frag shaders
*/

const chars = "█▓▒░ ".split('')
const {sin, cos, floor, PI} = Math

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3

import { map, fract, clamp, sign, mix } from "/src/modules/num.js";
import { vec2, dot, add, sub, length } from "/src/modules/vec2.js";

export function main(coord, context, cursor, buffer){
	const t = context.time * 0.002
	const x = coord.x
	const y = coord.y
	//const index = coord.index
    const colors_wha = [ '#ADD5AE', '#E0C7A3', '#EEBC32', '#EDC8CB', '#B94982', '#B7AAD0', '#7495B1'] //'#CDD8E3', '#586945', 

    const a2 = context.metrics.aspect

    const m = Math.min(context.cols, context.rows)

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a2,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	//const o = Math.sin(y * Math.sin(t) * 0.2 + x * 0.04 + t) * 20
	//const i = Math.round(Math.abs(x + y + o)) % chars.length
	const v0 = context.cols / 4 + wave(t, y, [0.15, 0.13, 0.37], [10,8,5]) * 0.9;
	const v1 = v0 + wave(t, y, [0.12, 0.14, 7], [3,6,5]) * 0.8;
	const v2 = v1 + wave(t, y, [0.089, 0.023, 2], [2,4,2]) * 0.3;
	const v3 = v2 + wave(t, y, [0.007, 0.054, 0.147], [4,6,7]) * 0.4;
	const i = x > v3 ? 4
		: x > v2 ? 3
		: x > v1 ? 2
		: x > v0 ? 1
		: 0;

        const t1 = context.time * 0.00009
	const t2 = context.time * 0.00003
    const a = context.metrics.aspect
	const center = vec2(sin(-t1), cos(-t1))
	const w1 = sin(dot(coord, vec2(sin(t1), cos(t1))) * 0.08)
	const w2 = cos(length(sub(st, center)) * 4.0)
	const w3 = w1 +w2 

        const quant = 5;
        const mult = 255 / (quant - 1);
        const r = floor(map(sin(w3 * PI + t1), -1, 1, 0, quant)) * mult;
	// return chars[i];
    return {
        char : y/context.rows < 0.5 ? chars[1/i] : '',
        color: colors_wha[r*20 % colors_wha.length],

    }
}

function wave(t, y, seeds, amps) {
	return (
		(Math.sin(t + y * seeds[0]) + 1) * amps[0]
		+ (Math.sin(t + y * seeds[1]) + 1) * amps[1]
		+ (Math.sin(t + y * seeds[2])) * amps[2]
	)
}

import { drawInfo } from '/src/modules/drawbox.js'
export function post(context, cursor, buffer) {
	drawInfo(context, cursor, buffer)
}

