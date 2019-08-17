function Thing(filepath, width, height, container){
    //thing properies 
    this.mixers = [];
    this.actions = [];
    this.textures = [];
    this.object = null;

    //dom element properties
    this.width = width;
    this.height = height;
    this.container = document.getElementById(container);

    //create stats and set it properties
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0';
    this.stats.domElement.style.top = '0';

    //creating threeJS clock
    this.clock = new THREE.Clock();

    //creating animation scene.
    this.scene = new THREE.Scene();

    //create light for the scene and add it to the scene
    var ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.6);
    this.scene.add(ambientLight);

    //creating camera for the scene
    //creating a point light and add it to the camera
    //set camera position
    //then add the camera to the scene
    this.camera = new THREE.PerspectiveCamera(45, (this.width / this.height), 1,1000);
    var pointLight = new THREE.PointLight(0xFFFFFF,1.2);
    this.camera.position.set( 0, 0, 300 );
    this.camera.add(pointLight);
    this.scene.add(this.camera);

    //create the renderer variable and set its tranparency
    //set the pixel ratio and the size of the renderer
    this.renderer = new THREE.WebGLRenderer({ antialis: true, alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height );

    //get the fbx Object with its mixture and add it to the scene.
    var fbxObject = new Loader(filepath);
    this.mixers = fbxObject.mixers;
    this.scene.add(fbxObject.group);
 
    //add renderer and stats to this containter
    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.stats.dom);

    //add resizing to the dom element
    new ResizeSensor(jQuery('#'+container), function(){ 
        this.camera.aspect = $('#'+container).width() / $('#'+container).height();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize($('#'+container).width(), $('#'+container).height());
    }.bind(this));

    //orbital controls allows us to change the orientation of the object
    //pan zoom is disable to prevent pursive control bug 
    //https://github.com/mrdoob/three.js/issues/10373
    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enablePan = false; 
    controls.enableZoom = false;     
    controls.update();

    //function to start the animation loop
	var animate = function() {
		//this updates the animations
		for (var i = 0; i < this.mixers.length; i++) {
			this.mixers[i].update(this.clock.getDelta());
        }
        
        //render the scene and the camera 
        //recursivly call teh animate funcation
        //update the stats element
        this.renderer.render(this.scene, this.camera);	
        requestAnimationFrame(animate); 
        this.stats.update();
	}.bind(this);

    //returning functions created inside the thing function
    return {
        animate: animate //return animate function
    }
}