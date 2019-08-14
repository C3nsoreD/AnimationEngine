//scene
var scene = new THREE.Scene();

//camera
var camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);

//renderer to specific html element
var renderer = new THREE.WebGLRenderer(
    {
        canvas: document.getElementById('myCanvas'),
         antialias: true
    });
myCanvas = document.getElementById('myCanvas');
//renderer.setSize($(myCanvas).width(), $(myCanvas).height());
renderer.setSize(300,300);

//renderer.setSize(width, height);
//The cude used to test ThreeJS application
var geometry = new THREE.BoxGeometry(1,1,2);
var material = new THREE.MeshBasicMaterial(
    {
        color: 0x00ff00
    });
var cube = new THREE.Mesh( geometry, material);
scene.add(cube);
camera.position.z = 5;


//next we have to call the reneder animation to loop the will cause rendering of the animation every 
//time the screne is refeshed
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    renderer.render( scene, camera);
}
animate();