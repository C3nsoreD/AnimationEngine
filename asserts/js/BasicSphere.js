
var object = 'fbx/Sphere.fbx';
var container = 'basicSphere';

var basicSphere = new Artifact( object, 
    $('#'+container).width(),
    $('#'+container).height(),
    container);

basicSphere.animate();




