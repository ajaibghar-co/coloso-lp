import { sort } from "/src/modules/sort.js";
import { css } from "/src/modules/color.js";
import { map, fract, clamp, sign, mix } from "/src/modules/num.js";
import { vec2, dot, add, sub, length } from "/src/modules/vec2.js";

// export const settings = {
//   // rows: 28,
//   // color : 'white',
//   // backgroundColor : 'rgb(100, 0, 300)'
// };

const { sin, cos, floor, PI } = Math;
const density = sort(" ○•◘█", "Simple Console", false);

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3


export function pre(context, cursor, buffer) {
  const a = context.metrics.aspect;
}
export function main(coord, context,cursor) {
  const a = context.metrics.aspect;
  const m = Math.min(context.cols, context.rows);
  const t1 = context.time * 0.00009;
  const t2 = context.time * 0.00003;
  const t = context.time * 0.0008;

  let st = {
    x: ((2.0 * (coord.x - context.cols / 2)) / m) * a,
    y: (2.0 * (coord.y - context.rows / 2)) / m,
  };
  const center = vec2(sin(-t1), cos(-t1));
  const v1 = sin(dot(coord, vec2(sin(t1), cos(t1))) * 0.08);
  const v2 = cos(length(sub(st, center)) * 4.0);
  const v3 = v1 + v2;

 
  const colors_wha = [ '#ADD5AE', '#E0C7A3', '#EEBC32', '#EDC8CB', '#B94982', '#B7AAD0', '#7495B1'] //'#CDD8E3', '#586945', 

  const x = coord.x;
  const y = coord.y;
  // console.log(coord.x)
  const c = context.cols;

  const posCenter = floor((c - density.length) * 0.4)+8;
  const c2 = context.rows;
  const posX = floor((c2 - density.length) * 0.5);

  //SMOKE 1 https://play.ertdfgcvb.xyz/#/src/contributed/emoji_wave
  const wave1 = sin(x * y * 0.0017 + y * 0.0033 + t) * 20;
  const wave2 = cos(y * x * 0.002 ) * 5;
  const i = floor(x + wave1) - posCenter;
  let j = floor(x + wave2) - posCenter;

  const k = x + j;

  const idx = floor(map(v3, -2, 2, 0, 1) * density.length);

  //this is the index value of the image derived from data  passed in can.cover and var color
//   const index = Math.floor(color.v * (density.length - 1));

  const quant = 5;
  const mult = 255 / (quant - 1);
  const r = floor(map(sin(v3 * PI + t1), -1, 1, 0, quant)) * mult;
  const g = floor(map(sin(v3 * PI23 + t2), -1, 1, 0, quant)) * mult;
  const b = floor(map(sin(v3 * PI43 - t1), -1, 1, 0, quant)) * mult;
  // Note: “undefined” is rendered as a space…
  return {
		char : y/context.rows < 0.5 ? density[j] : '',
    color: colors_wha[r*20 % colors_wha.length],
  };
}


