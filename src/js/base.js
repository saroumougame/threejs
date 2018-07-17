// styles

import '../scss/index.scss';



// three.js

import * as THREE from 'three';

import 'three/examples/js/controls/PointerLockControls';


import 'three/examples/js/shaders/CopyShader';
import 'three/examples/js/shaders/DotScreenShader';
import 'three/examples/js/shaders/RGBShiftShader';
import 'three/examples/js/postprocessing/EffectComposer';
import 'three/examples/js/postprocessing/RenderPass';
import 'three/examples/js/postprocessing/ShaderPass';



let camera, scene, renderer, geometry, material, mesh, controls, composer;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


var verticalSpeed = 0;

var keys = [];



document.onkeydown = function(e){

    e = e || window.event;

    keys[e.keyCode] = true;

};



document.onkeyup = function(e){

    e = e || window.event;

    keys[e.keyCode] = false;

};


window.addEventListener("click",()=>{
    raycaster.setFromCamera(new THREE.Vector2(), camera);

    var intersects = raycaster.intersectObjects(scene.children);


    for ( var i = 0; i<intersects.length; i++){


        intersects[i].object.material.transparent = false;

        //scene.remove( intersects[i].object );
        break;
        //intersects[i].object.material.color.set(0xff0000);
    }
}, false)





function init() {




    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xffffff );

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

    var texture = new THREE.TextureLoader().load('/images/crate.gif');


    var geometry = new THREE.BoxGeometry(2, 2, 2);


    for (var x = 0; x<10; x++){

        for (var y = 0; y<10; y++){

            for (var z = 0; z<10; z++) {



                var material = new THREE.MeshBasicMaterial({

                    color: Math.floor(Math.random() * 16777215),

                    map: texture,
                    transparent: true,
                    opacity: 0.0,
                });



                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.x += x * 2;

                mesh.position.z += z * 2;

                mesh.position.y += y * 2;



                scene.add(mesh);
            }
        }



    }



    for (var x = 0; x<30; x++){
        for (var y = 0; y<30; y++){
            var geometry = new THREE.BoxGeometry(2,2,2);
            var material = new THREE.MeshBasicMaterial({
                map: texture,
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = x * 2;
            mesh.position.z = y * 2;
            mesh.position.y = -2;
            scene.add(mesh);
        }

    }


    // postprocessing
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

   composer = new THREE.EffectComposer( renderer );
   //composer.addPass( new THREE.RenderPass( scene, camera ) );
    var toto = new THREE.RenderPass( scene, camera );
   // var effect = new THREE.ShaderPass( THREE.DotScreenShader );
   // effect.uniforms[ 'scale' ].value = 4;
   // composer.addPass( effect );
 //   var effect = new THREE.ShaderPass( THREE.RGBShiftShader );
    //effect.uniforms[ 'amount' ].value = 0.0015;
    //effect.renderToScreen = true;
    toto.renderToScreen = true;
    composer.addPass( toto );


    //



    // var geometry = new THREE.Geometry();

    // geometry.vertices.push(
    //     new THREE.Vector3(-10,10,0),
    //     new THREE.Vector3(-10,-10,0),
    //     new THREE.Vector3(10,-10,0),
    //     new THREE.Vector3(10,10,0),
    // )
    // geometry.faces.push(new THREE.Face3(0,1,2), new THREE.Face3(0,2,3));
    // var material = new THREE.MeshBasicMaterial({color : 0xff00000})

    // var mesh = new THREE.Mesh(geometry, material )
    // mesh.drawMode = THREE.TrianglesDrawMode;

    // mesh.position.x -= 3;

    // mesh.position.z -=  30;

    // mesh.position.y = 2;

    // scene.add(mesh);

    // var geometry2=  new THREE.BufferGeometry();
    // var vertices = new Float32Array([
    //     -1.0, -1.0, 1.0,
    //     1.0,-1.0,1.0,
    //     1.0,1.0,1.0,
    //     1.0,1.0,1.0,
    //     -1.0,1.0,1.0,
    //     -1.0,-1.0, 1.0
    // ])
    // geometry2.addAttribute('position', new THREE.BufferAttribute(vertices, 3))
    // var material2 = new THREE.MeshBasicMaterial({color: 0x00ff00})
    // var mesh2 = new THREE.Mesh(geometry2, material2)

    // mesh2.position.x += 10;

    // mesh2.position.z -=  20;

    // mesh2.position.y = 2;

    // scene.add(mesh2)

    //camera.position.z = 1000;



    //geometry = new THREE.BoxGeometry(200, 200, 200);

    /*material = new THREE.MeshBasicMaterial({

        color: 0xff0000,

        wireframe: true

    });*/



    //mesh = new THREE.Mesh(geometry, material);

    //scene.add(mesh);



    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);



    document.body.appendChild(renderer.domElement);



    controls = new THREE.PointerLockControls(camera);

    scene.add(controls.getObject());



    // pointer lock

    var pointerlockchange = function (event) {

        if (document.pointerLockElement == element) {

            controls.enabled = true;

        } else {

            controls.enabled = false;

        }



    };

    var pointerlockerror = function (event) {};



    // hook pointer lock state change events

    document.addEventListener('pointerlockchange', pointerlockchange, false);

    document.addEventListener('pointerlockerror', pointerlockerror, false);

    var element = document.body;



    element.addEventListener('click', function () {

        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        element.requestPointerLock();

    }, false);



}



var clock = new THREE.Clock();


var particules = [];
function animate() {


    if (keys[70]) {

        var texture2 = new THREE.TextureLoader().load('/images/crate.gif');

        raycaster.setFromCamera(new THREE.Vector2(), camera);

        var intersects = raycaster.intersectObjects(scene.children);

        var ParticuleGeometry = new THREE.Geometry();
        var particule;
        for (var cpt = 0; cpt < 15; cpt++){
            particule =  new THREE.Vector3();
            particule.x =  Math.random() *10;
            particule.z =  Math.random() * 10;
            particule.y =  Math.random() * 10;
            particule.time = 10;
            particules.push(particule);
            ParticuleGeometry.vertices.push(particule);
        }
        console.log(particule);


for (var p in particules){
    if (particules[p].time > 0){
        particules[p].time -= 1;
    } else {
        scene.remove(particules[p]);
    }
}

      var ParticuleMaterial = new THREE.PointsMaterial({

            map: texture2,
            size: 1});

        var ParticuleGroupement = new THREE.Points(ParticuleGeometry, ParticuleMaterial);

        scene.add(ParticuleGroupement);

        for ( var i = 0; i<intersects.length; i++){
            console.log("found");

            intersects[i].object.material.transparent = true;
           scene.remove( intersects[i].object );
            break;
            //intersects[i].object.material.color.set(0xff0000);
        }

    }


    if (keys[71]) {


    }



    requestAnimationFrame(animate);



    const delta = clock.getDelta();

    var speed = 10;



    //Déplacement avant (Z)

    if (keys[90]) {

        controls.getObject().translateZ(-delta * speed);

    }



    //Déplacement arrière (S)

    if (keys[83]) {

        controls.getObject().translateZ(delta * speed);

    }

// console.log(controls.getObject().position.y);
    if (keys[32] && controls.getObject().position.y == 1) {

        verticalSpeed = 30

    }

    if(verticalSpeed != 0){
        controls.getObject().translateY(delta * verticalSpeed);
    }

    if(controls.getObject().position.y > 1){
        verticalSpeed--;
    }else{
        controls.getObject().position.y = 1;
        verticalSpeed == 0;
    }

    //Déplacement gauche (Q)

    if (keys[81]) {

        controls.getObject().translateX(-delta * speed);

    }






    //Déplacement droite (D)

    if (keys[68]) {

        controls.getObject().translateX(delta * speed);

    }

    // raycaster.setFromCamera(new THREE.Vector2(), camera);

    // var intersects = raycaster.intersectObjects(scene.children);

    // for ( var i = 0; i<intersects.length; i++){
    //     // console.log("found");
    //     intersects[i].object.material.color.set(0xff0000);
    // }

    composer.render();
  //  renderer.render(scene, camera);

};



// window resize

window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);



init();

animate();