
var artifact = 'fbx/Sphere.fbx';
var container = 'basicSphereEnv';
var datContainer = '.datGUI';

var datGUI = new dat.GUI({ autoPlace: false});


//create the environment variable
var basicSphereEnv = new Environment( artifact, 
    $('#'+container).width(),
    $('#'+container).height(),
    container);

//run the environment.
basicSphereEnv.run();

//creating a list of parameters
var params = {
    animation : 0,
    paused : false
};

//adding the animation switcher 
datGUI.add(params, 'animation').min(0).max(1).step(1).onFinishChange(function(){
    basicSphereEnv.update({animation: params.animation});
});

//adding th pause button
datGUI.add(params, 'paused').onFinishChange(function(){
    if(params.paused) 
        basicSphereEnv.pauseAnimation();
    else
        basicSphereEnv.resumeAnimation();
    
}); 

//add datGUI to the dom Element
$(datContainer).append($(datGUI.domElement));



