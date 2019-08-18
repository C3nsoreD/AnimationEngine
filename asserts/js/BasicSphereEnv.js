
var artifact = 'fbx/Sphere.fbx';
var container = 'basicSphereEnv';

var basicSphereEnv = new Environment( artifact, 
    $('#'+container).width(),
    $('#'+container).height(),
    container);

basicSphereEnv.run();




