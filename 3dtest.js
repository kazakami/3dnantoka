var init = function() {

    // レンダラーを作成
    var renderer = new THREE.WebGLRenderer();
    // レンダラーのサイズを設定
    renderer.setSize(800, 600);
    // canvasをbodyに追加
    document.body.appendChild(renderer.domElement);

    // シーンを作成
    var scene = new THREE.Scene();

    // カメラを作成
    var camera = new THREE.PerspectiveCamera(45, 800 / 600, 1, 1000);

    httpObj = new XMLHttpRequest();
    httpObj.open('GET', "model/box.mqo", false);
    httpObj.send(null);
    mqoLoad(httpObj.responseText);
    return;
    // 箱を作成
    //var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    //var geometry = new THREE.CircleGeometry(1, 32);
    var geometry = new THREE.CylinderBufferGeometry( 1, 1, 20, 32 );

    var material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    var box = new THREE.Mesh(geometry, material);
    box.position.z = -50;
    scene.add(box);

    // 平行光源を生成
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    // 描画
    renderer.render(scene, camera);
    //*
    // フレーム毎の更新処理
    var update = function() {
	requestAnimationFrame(update);
	// 立方体を回転させる
	box.rotation.x += 0.01;
	box.rotation.y += 0.01;
	// 描画
	renderer.render(scene, camera);
    };
    // 初回実行
    update();
//*/
}
window.addEventListener('DOMContentLoaded', init);
