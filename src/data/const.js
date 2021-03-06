export const MAX_NUMBER = 4096;
export const WIDTH = 10;
export const CAMERA = {ANGLE:100,NEAR:0.1,FAR:10000}; // NEAR < 1.4 (<sqrt2) if we want to see the gradient
export const USE_FOG = true; // If set to true and Webgl, don't forget to bind the uniforms
export const UPDATE_FPS_RATE = 100;
export const SCALE={x:5,y:5,z:5}
export const CENTER = {x:0.0,y:+15.0,z:-90.0}; // Center for the Single Jellyfish
export const ROTATE = {x:0.0,y:0.1}
export const RADIUS = {min:11,max:150,anglePHI:0.2}

export const DISPLAY = "circle";

export const BLEND = {fGodraysIntensity: 0.3, fGlowIntensity: 0.0}

export const OPACITY = {jellyfish : 0.6, surface:0.1};

export const SKY = {
	distance: 400000,
	phi:Math.PI/2,
	theta:Math.PI*2/3,// Sky is perfectly in front of us
	luminance:1,
	turbidity:2,
	reileigh:1,
	mieCoefficient:0.005,
	mieDirectionalG:0.8,
	sunSize:1.0
	} 

/*
 * The smoothstepHigh and smoothstepLow help constrasting the depthMap or the godrays
 * 0.2 -> 0
 * 0.8 -> 1
 */

export const DEPTH_MAP = {
 	near:0.1,
 	far:200.0,
 	smoothstepHigh: 0.7,
 	smoothstepLow:0.1
}

export const GODRAYS = {
 	smoothstepHigh: 1.0,
 	smoothstepLow:0.85,
 	density:  0.8,
	weight: 0.01,
	decay: 1.0,
	exposure: 1.0,
	numSamples: 100
}
