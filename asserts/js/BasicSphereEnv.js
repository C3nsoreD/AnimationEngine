
var artifact = 'fbx/Sphere.fbx';
var container = 'basicSphereEnv';
var datContainer = '.datGUI';

var textures = [
    'texture/bluecrack.jpg',
    'texture/Bluefeathers.jpg',
    'texture/blueOcean.jpg'
];

var datGUI = new dat.GUI({ autoPlace: false});


//create the environment variable
var basicSphereEnv = new Environment( 
    artifact,
    textures, 
    $('#'+container).width(),
    $('#'+container).height(),
    container);

//run the environment.
basicSphereEnv.run();

//creating a list of parameters
var params = {
    animation : 0,
    texture: 0,
    paused : false,
    wireframe: false
};

//adding the animation switcher 
datGUI.add(params, 'animation').min(0).max(1).step(1).onFinishChange(function(){
    basicSphereEnv.update({animation: params.animation});
});

//adding the texture slider
datGUI.add(params, 'texture').min(0).max(2).step(1).onFinishChange(function(){
    basicSphereEnv.update({texture : params.texture});
});

//adding the pause button
datGUI.add(params, 'paused').onFinishChange(function(){
    if(params.paused) 
        basicSphereEnv.pauseAnimation();
    else
        basicSphereEnv.resumeAnimation();
}); 

//adding the wireframe option
datGUI.add(params, 'wireframe').onFinishChange(function(){
    basicSphereEnv.update({wireframe : params.wireframe});   
});

//add datGUI to the dom Element
$(datContainer).append($(datGUI.domElement));



