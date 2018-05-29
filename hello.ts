import { WebGLRenderer } from "three";
let renderer: WebGLRenderer = new WebGLRenderer();
let canvas: HTMLCanvasElement = renderer.domElement;
document.body.appendChild(canvas);

console.log("hello");