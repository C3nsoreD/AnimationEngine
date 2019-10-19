var container = 'env';
var datContainer = '.datGUI';

//adding an array of artifacts
var artifacts = ['fbx/DragonFinal.fbx', 'fbx/Sphere.fbx'];

var textures = [
    'texture/bluecrack.jpg',
    'texture/Bluefeathers.jpg',
    'texture/blueOcean.jpg',
    'texture/blueWaveSkin.jpg',
    'texture/camoskin.jpg',
    'texture/darkbear.jpg',
    'texture/greenleaf.jpg',
    'texture/icetexture.jpg'
];

//Control UI element
var datGUI = new dat.GUI({ autoPlace: false});


//Initial Environment constructor.
var env =  new Environment( 
    artifacts,
    textures, 
    $('#'+container).width(),
    $('#'+container).height(),
    container,0,-70,0
);


//run the environment.
env.run();

//creating a list of parameters
var params = {
    artifact : 0,
    animation : 0,
    texture: 0,
    paused : false,
    wireframe: false
};

//ading the artifact switcher
datGUI.add(params, 'artifact').min(0).max(artifacts.length-1).step(1).onFinishChange(function(){
    env.swapAvatar(params.artifact);  
});

//adding the animation switcher 
datGUI.add(params, 'animation').min(0).max(1).step(1).onFinishChange(function(){
    env.update({animation: params.animation});
});

//adding the texture slider
datGUI.add(params, 'texture').min(0).max(7).step(1).onFinishChange(function(){
    env.update({texture : params.texture});
});

//adding the pause button
datGUI.add(params, 'paused').onFinishChange(function(){
    if(params.paused) 
        env.pauseAnimation();
    else
        env.resumeAnimation();
}); 

//adding the wireframe option
datGUI.add(params, 'wireframe').onFinishChange(function(){
    env.update({texture : params.texture});
    env.update({wireframe : params.wireframe});   
});

//add datGUI to the dom Element
$(datContainer).append($(datGUI.domElement));



