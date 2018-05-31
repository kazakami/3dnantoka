import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js";
import "imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js";
import { WebGLRenderer, Scene, Camera, PerspectiveCamera, Light, DirectionalLight, JSONLoader, MeshFaceMaterial, Mesh, OBJLoader, MTLLoader, LoadingManager, Group } from "three";
import * as dat from 'dat.gui/build/dat.gui.js';

let renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
let canvas: HTMLCanvasElement = renderer.domElement;
let scene: Scene = new Scene();
let camera: Camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
document.body.appendChild(canvas);

let directionalLight: Light = new DirectionalLight(0xffffff);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

let models: { [key: string]: Group; } = {};

LoadObjMtl("data/body1.obj", "data/body1.mtl", "body1");
LoadObjMtl("data/head1.obj", "data/head1.mtl", "head1");
LoadObjMtl("data/body.obj", "data/body.mtl", "body");
LoadObjMtl("data/head.obj", "data/head.mtl", "head");
camera.position.x = 10;
camera.position.z = 10;
camera.lookAt(0, 0, 0);


class Fiz {
    message;
    constructor() {
        this.message = 'hoge';
    }
}

let text = new Fiz();
let g = new dat.GUI();
g.add(text, 'message');


let animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    let isNull = false;
    Object.keys(models).forEach(key => {
        if (models[key] === null) {
            //console.log();
            isNull = true;
        }
    });
    if (!isNull) {
        models["head"].position.y = 5;
        models["head1"].position.y = 5;
        scene.add(models["head"]);
        scene.add(models["body"]);
        requestAnimationFrame(animate2);
    }
};
let animate2 = () => {
    requestAnimationFrame(animate2);
    renderer.render(scene, camera);
};
animate();

function LoadObjMtl(obj_filename: string, mtl_filename: string, name: string): void {
    models[name] = null;
    console.log(name + " has started loading");
    let loadingManager = new LoadingManager();
    let objLoader = new OBJLoader(loadingManager);
    let mtlLoader = new MTLLoader(loadingManager);
    //ディレクトリ内を指していたらディレクトリパスとファイル名に分ける
    if (mtl_filename.indexOf("/") !== -1)
    {
        mtlLoader.setPath(mtl_filename.substr(0, mtl_filename.lastIndexOf("/")) + "/");
        mtl_filename = mtl_filename.slice(mtl_filename.indexOf("/") + 1);
    }
    mtlLoader.load(mtl_filename,
        mtl => {
            mtl.preload();
            //上と同様にディレクトリ内を指していたらディレクトリパスとファイル名に分ける
            if (obj_filename.indexOf("/") !== -1) {
                objLoader.setPath(obj_filename.substr(0, obj_filename.lastIndexOf("/")) + "/");
                obj_filename = obj_filename.slice(obj_filename.indexOf("/") + 1);
            }
            objLoader.setMaterials(mtl);
            objLoader.load(obj_filename,
                grp => {
                    console.log(name + " is loaded.")
                    models[name] = grp;
                }
            );
        }
    );
}