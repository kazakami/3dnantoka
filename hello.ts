import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js";
import "imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js";
import "imports-loader?THREE=three!three/examples/js/exporters/GLTFExporter.js";
//import { WebGLRenderer, Scene, Camera, PerspectiveCamera, Light, DirectionalLight, JSONLoader, MeshFaceMaterial, Mesh, OBJLoader, MTLLoader, LoadingManager, Group, AmbientLight } from "three";
import { WebGLRenderer, Scene, Camera, PerspectiveCamera, Light, DirectionalLight, JSONLoader, MeshFaceMaterial, Mesh, OBJLoader, MTLLoader, LoadingManager, Group, AmbientLight, GLTFExporter } from "three";
import * as dat from 'dat.gui/build/dat.gui.js';
//import { GLTFExporter } from "./GLTFExporter";

let renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth - 50, window.innerHeight - 100);
let canvas: HTMLCanvasElement = renderer.domElement;
let scene: Scene = new Scene();
let camera: Camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
document.body.appendChild(canvas);


let directionalLight: Light = new DirectionalLight(0xffffff);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

let ambientLight: Light = new AmbientLight(0x888888);
scene.add(ambientLight);

let models: { [key: string]: Group; } = {};

let exporter = new GLTFExporter();

LoadObjMtl("data/body1.obj", "data/body1.mtl", "body1");
LoadObjMtl("data/head1.obj", "data/head1.mtl", "head1");
LoadObjMtl("data/body.obj", "data/body.mtl", "body");
LoadObjMtl("data/head.obj", "data/head.mtl", "head");

let link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link );
function saveString(text, filename) {
    let blob = new Blob([text], {type: 'text/plain'});
    //console.log(blob);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
function saveBin(bin, filename) {
    let blob = new Blob([bin], {type: 'application/glb'});
    //console.log(blob);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
function buttonClick() {
    exporter.parse(scene, (result) => {
        //console.log("str: " + JSON.stringify(result));
        if (text.bin) {
            //console.log("bin: " + result);
            saveBin(result, "output.glb");
        } else {
            //console.log("str: " + result);
            saveString(JSON.stringify(result), "output.gltf");
        }
    }, {binary: text.bin});
}
let button = document.createElement('button');
button.onclick = buttonClick;
button.innerText = "save";
document.body.appendChild(button);

class Fiz {
    head;
    body;
    bin;
    constructor() {
        this.head = 'head';
        this.body = 'body';
        this.bin = false;
    }
}

let text = new Fiz();
let g = new dat.GUI();
g.add(text, 'head', ['head', 'head1']);
g.add(text, 'body', ['body', 'body1']);
g.add(text, 'bin');

let modelAdded = false;
let beforeHead = 'head';
let beforeBody = 'body';
let frame = 0;

let animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (modelAdded) {
        if (beforeHead !== text.head) {
            scene.remove(models[beforeHead]);
            scene.add(models[text.head]);
            beforeHead = text.head;
        }
        if (beforeBody !== text.body) {
            scene.remove(models[beforeBody]);
            scene.add(models[text.body]);
            beforeBody = text.body;
        }
        frame++;
        camera.position.x = 10*Math.sin(frame/30.0);
        camera.position.z = 10*Math.cos(frame/30.0);
        camera.lookAt(0, 0, 0);
    } else {
        let isNull = false;
        Object.keys(models).forEach(key => {
            if (models[key] === null) {
                //console.log();
                isNull = true;
            }
        });
        if (!isNull) {
            console.log("model added");
            models["head"].position.y = 5;
            models["head1"].position.y = 5;
            scene.add(models["head"]);
            scene.add(models["body"]);
            modelAdded = true;
        }
    }
};
animate();

function LoadObjMtl(obj_filename: string, mtl_filename: string, name: string): void {
    models[name] = null;
    //console.log(name + " has started loading");
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
                    //console.log(name + " is loaded.")
                    models[name] = grp;
                }
            );
        }
    );
}
