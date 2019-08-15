function Thing(filepath, width, height, container){
    //thing properies 
    this.mixers = [];
    this.actions = [];
    this.textures = [];
    this.object = null;

    //dom element properties
    this.width = width;
    this.height = height;

    //creating threeJS clock
    this.clock = new THREE.Clock();

    //creating animation scene.
    this.scene = new THREE.Scene();

    //create light for the scene and add it to the scene
    var ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.6);
    this.scene.add(ambientLight);

    //creating camera for the scene
    //set its position
    //creating a point light and add it to the camera
    //then add the camera to the scene
    this.camera = new THREE.PerspectiveCamera(45, (this.width / this.height), 1,1000);
    this.camera.position.set( 0, 0, 300 );
    var pointLight = new THREE.PointLight(0xFFFFFF,1.2);
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
    this.scene.add(fbxObject.scene);

    //add a container to render the dom element
    document.getElementById(container).appendChild(this.renderer.domElement);

    //add resizing to the dom element
    new ResizeSensor(jQuery('#'+container), function(){ 
        this.camera.aspect = $('#'+container).width() / $('#'+container).height();
        this.camera.updateProjectionMatrix();
        this.renderer.setSize($('#'+container).width(), $('#'+container).height());
    }.bind(this));


    //adding orbital controls to change the orientation of the camera
    var controls = new THREE.OrbitControls(this.camera);
    controls.target.set(0, 0, 0);
    controls.enablePan = false; 
    controls.enableZoom = false;     
    controls.update();

   // function to start the animation loop
	var animate = function() {
		//this updates the animations
		for (var i = 0; i < this.mixers.length; i++) {
			this.mixers[i].update(this.clock.getDelta());
		}
		// draw
		this.renderer.render(this.scene, this.camera);			
		requestAnimationFrame(animate); //a safer way to call the animation function.
	}.bind(this);

    //returning functions created inside the think function
    return {
        animate: animate //return animate function
    }
}