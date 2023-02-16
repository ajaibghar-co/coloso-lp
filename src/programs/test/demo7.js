/**
[header]
@author ertdfgcvb
@title  Camera grayscale
@desc   Grayscale input from camera
*/

import { sort } from '/src/modules/sort.js'
import Camera from '/src/modules/camera.js'
import Canvas from '/src/modules/canvas.js'
import { css } from '/src/modules/color.js'
import { map,fract,clamp,sign,mix } from '/src/modules/num.js'
import { vec2, dot, add, sub, length } from '/src/modules/vec2.js'

// export const settings = {
	// color : 'white',
	// backgroundColor : 'white'
// }

const {sin, cos, floor, PI} = Math

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3
// const cam = Camera.init()
const can = new Canvas()
// For a debug view uncomment the following line:
// can.display(document.body, 10, 10)
const image = new Image();
// image.src = '/src/coloso.jpg';
// image.src = '/src/colo-striaght-honey-drip-21.jpg';
image.src = '/src/building.jpeg';

// document.body.appendChild(image);

// image.onload = function (e) {
//         console.log("loaded!");
//     };

const density = sort(' ○•◘██', 'Simple Console', true)
// const density = sort('█▓▒░ ', 'Simple Console','true')

// const density =  ' ○•◘█'
const data = []

export function pre(context, cursor, buffer) {
	const a = context.metrics.aspect

	// The canvas is resized so that 1 cell -> 1 pixel
	can.resize(context.cols, context.rows)
	// The cover() function draws an image (cam) to the canvas covering
	// the whole frame. The aspect ratio can be adjusted with the second
	// parameter.
	can.cover(image, a).normalize().writeTo(data)
    // console.log(data)
}

export function main(coord, context, cursor, buffer) {

    
    const t = context.time * 0.0005
    const colors = ['orange', 'magenta', 'lightgrey', 'lightgreen'];

	const x = coord.x
	const y = coord.y
    const mouseX = Math.floor(cursor.x)
    const mouseY = Math.floor(cursor.y)

	const c = context.cols
	const posCenter = floor((c - density.length) * 0.5)
	const c2 = context.rows
	// const posX = floor((c2 - density2.length) * 0.5)
    

	//SMOKE 1 https://play.ertdfgcvb.xyz/#/src/contributed/emoji_wave
	const wave1 = sin(x * y * 0.0017 + y * 0.0033 + t ) * 40 
	const wave2 = cos(y*100) * 2
	const i = floor(x + wave1) - posCenter
	const j = floor(x + wave2) - posCenter

	//STACKED SIN WAVE SMOKE 2 https://play.ertdfgcvb.xyz/#/src/contributed/stacked_sin_waves
    const v0 = context.cols / 4 + wave(t, y, [0.15, 0.13, 0.37], [10,8,5]) * 0.9;
	const v1 = v0 + wave(t, y, [0.12, 0.14, 0.27], [3,6,5]) * 0.8;
	const v2 = v1 + wave(t, y, [0.089, 0.023, 0.217], [2,4,2]) * 0.3;
	const v3 = v2 + wave(t, y, [0.167, 0.054, 0.147], [4,6,7]) * 0.4;
	const s = x > v3 ? 4
		: x > v2 ? 3
		: x > v1 ? 2
		: x > v0 ? 1
		: 0;

	// Coord also contains the index of each cell (this gives the data from the image source 'img')
	const color = data[coord.index]
    //this is the index value of the image derived from data  passed in can.cover and var color
	const index = Math.floor(color.v * (density.length-1))

	//this is hte plasma color example https://play.ertdfgcvb.xyz/#/src/demos/plasma 
	const t1 = context.time * 0.0009
	const t2 = context.time * 0.00003
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	const center = vec2(sin(-t1), cos(-t1))
	const w1 = sin(dot(coord, vec2(sin(t1), cos(t1))) * 0.08)
	const w2 = cos(length(sub(st, center)) * 4.0)
	const w3 = w1 + w2
	const idx = floor(map(w3, -2, 2, 0, 1) * density.length)


	// Colors are quantized for performance:
	// lower value = harder gradient, better performance
	const quant = 2
	const mult  = 255 / (quant - 1)
	const r = floor(map(sin(v3 * PI   + t1), -1, 1, 0, quant)) * mult
	const g = floor(map(sin(v3 * PI23 + t2), -1, 1, 0, quant)) * mult
	const b = floor(map(sin(v3 * PI43 - t1), -1, 1, 0, quant)) * mult

	return {
		char: density[index],
		// color: colors[idx],
		color: colors[i%colors.length],
		backgroundColor: 'white'
		
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

