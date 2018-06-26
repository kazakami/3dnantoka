import "imports-loader?THREE=three!three/examples/js/exporters/GLTFExporter.js";
import "imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js";
import "imports-loader?THREE=three!three/examples/js/loaders/OBJLoader.js";
import { AmbientLight, Camera, Light, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import { DirectionalLight, GLTFExporter, Group, LoadingManager, MTLLoader, OBJLoader} from "three";

import { GUI } from "dat.gui";

const renderer: WebGLRenderer = new WebGLRenderer();
renderer.setSize(window.innerWidth - 50, window.innerHeight - 100);
const canvas: HTMLCanvasElement = renderer.domElement;
const scene: Scene = new Scene();
const camera: Camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
document.body.appendChild(canvas);

const directionalLight: Light = new DirectionalLight(0xffffff);
directionalLight.position.set(100, 100, 100);
scene.add(directionalLight);

const ambientLight: Light = new AmbientLight(0x888888);
scene.add(ambientLight);

const models: { [key: string]: Group; } = {};

const exporter: GLTFExporter = new GLTFExporter();

LoadObjMtl("data/body1.obj", "data/body1.mtl", "body1");
LoadObjMtl("data/head1.obj", "data/head1.mtl", "head1");
LoadObjMtl("data/body.obj", "data/body.mtl", "body");
LoadObjMtl("data/head.obj", "data/head.mtl", "head");

const link = document.createElement("a");
link.style.display = "none";
document.body.appendChild( link );
function saveString(str, filename) {
    const blob = new Blob([str], {type: "text/plain"});
    // console.log(blob);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
function saveBin(bin, filename) {
    const blob = new Blob([bin], {type: "application/glb"});
    // console.log(blob);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
function buttonClick() {
    exporter.parse(scene, (result) => {
        // console.log("str: " + JSON.stringify(result));
        if (text.bin) {
            // console.log("bin: " + result);
            saveBin(result, "output.glb");
        } else {
            // console.log("str: " + result);
            saveString(JSON.stringify(result), "output.gltf");
        }
    }, {binary: text.bin});
}
const button = document.createElement("button");
button.onclick = buttonClick;
button.innerText = "save";
document.body.appendChild(button);

class Fiz {
    public head: string;
    public body: string;
    public bin: boolean;
    constructor() {
        this.head = "head";
        this.body = "body";
        this.bin = false;
    }
}

const text = new Fiz();
const g = new GUI();
g.add(text, "head", ["head", "head1"]);
g.add(text, "body", ["body", "body1"]);
g.add(text, "bin");

let modelAdded = false;
let beforeHead = "head";
let beforeBody = "body";
let frame = 0;

const animate = () => {
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
        camera.position.x = 10 * Math.sin(frame / 30.0);
        camera.position.z = 10 * Math.cos(frame / 30.0);
        camera.lookAt(0, 0, 0);
    } else {
        let isNull = false;
        Object.keys(models).forEach((key) => {
            if (models[key] === null) {
                // console.log();
                isNull = true;
            }
        });
        if (!isNull) {
            // console.log("model added");
            const keyHead = "head";
            const keyHead1 = "head1";
            const keyBody = "body";
            // const keyBody1 = "body1";
            models[keyHead].position.y = 5;
            models[keyHead1].position.y = 5;
            scene.add(models[keyHead]);
            scene.add(models[keyBody]);
            modelAdded = true;
        }
    }
};
animate();

function LoadObjMtl(objFilename: string, mtlFilename: string, name: string): void {
    models[name] = null;
    // console.log(name + " has started loading");
    const loadingManager = new LoadingManager();
    const objLoader = new OBJLoader(loadingManager);
    const mtlLoader = new MTLLoader(loadingManager);
    // ディレクトリ内を指していたらディレクトリパスとファイル名に分ける
    if (mtlFilename.indexOf("/") !== -1) {
        mtlLoader.setPath(mtlFilename.substr(0, mtlFilename.lastIndexOf("/")) + "/");
        mtlFilename = mtlFilename.slice(mtlFilename.indexOf("/") + 1);
    }
    mtlLoader.load(mtlFilename,
        (mtl) => {
            mtl.preload();
            // 上と同様にディレクトリ内を指していたらディレクトリパスとファイル名に分ける
            if (objFilename.indexOf("/") !== -1) {
                objLoader.setPath(objFilename.substr(0, objFilename.lastIndexOf("/")) + "/");
                objFilename = objFilename.slice(objFilename.indexOf("/") + 1);
            }
            objLoader.setMaterials(mtl);
            objLoader.load(objFilename,
                (grp) => {
                    // console.log(name + " is loaded.")
                    models[name] = grp;
                });
        });
}
