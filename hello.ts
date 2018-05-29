import { WebGLRenderer, Scene, Camera, PerspectiveCamera } from "three";
let renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
let canvas: HTMLCanvasElement = renderer.domElement;
let scene: Scene = new Scene();
let camera: Camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
document.body.appendChild(canvas);




let animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();