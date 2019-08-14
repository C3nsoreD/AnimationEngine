function Thing(filepath, height, width, container){
    //thing properies 
    this.mixers = [];
    this.actions = [];
    this.textures = [];

    this.object = null;

    //constructor properties
    this.width = width;
    this.height = height;

    //creating threeJS clock
    this.clock = new THREE.Clock();

    //creating animation scene.
    this.scene = new THREE.Scene();

    //create light for the scene and add it to the scene
    var ambientLight = new THREE.AmbientLight(
        0xCCCCCC, 0.6
    );
    this.scene.add(ambientLight);

    //creating camera for the scene
    this.camera = new THREE.PerspectiveCamera(
        75,
        (this.height/this.width),
        0.1,
        1000
    );
    this.camera.position.z = 200;

    //creating a point light and add it to the camera
    //then add the camera to the scene
    var pointLight = new THREE.PointLight(0xFFFFFF,1.2);
    this.camera.add(pointLight);
    this.scene.add(this.camera);

    //create the renderer variable and set its tranparency
    this.renderer = new THREE.WebGLRenderer({
        antialis: true,
        alpha: true
    });

    //set the pixel ratio to match the resolution of the current display 
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width,height);

    //add a container to render the dom element
    document.getElementById(container).appendChild(this.renderer.domElement);

    var fbxObject = new Loader(filepath);
    this.mixers = fbxObject.mixers;
    this.scene.add(fbxObject.scene);
    console.log(this.scene);

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