
var object = 'fbx/Sphere.fbx';
var container = 'thing';

var thing = new Thing( object, 
    $('#'+container).width(),
    $('#'+container).height(),
    container);

thing.animate();




