function Environment(filepath, textures, width, height, container){
    //Artifact properies 
    this.mixers = [];
    this.object = null;
    this.actions = [];
    this.activeAction = 0;

    //creating threeJS clock
    this.clock = new THREE.Clock();

    //creating animation scene.
    this.scene = new THREE.Scene();

    //dom element properties
    this.container = document.getElementById(container);

    //create stats and set it properties
    this.stats = new Stats();
    this.stats.setMode(0);
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0';
    this.stats.domElement.style.top = '0';
    this.container.appendChild(this.stats.dom);

    //create light for the scene and add it to the scene
    var ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.6);
    this.scene.add(ambientLight);

    //creating camera for the scene
    //creating a point light and add it to the camera
    //set camera position
    //then add the camera to the scene
    this.camera = new THREE.PerspectiveCamera(45, (width / height), 1,2000);
    var pointLight = new THREE.PointLight(0xFFFFFF,1.2);
    this.camera.position.set( 0, 0, 300 );
    this.camera.add(pointLight);
    this.scene.add(this.camera);

    //create the renderer variable and set its tranparency
    //set the pixel ratio and the size of the renderer
    this.renderer = new THREE.WebGLRenderer({ antialis: true, alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height );
    this.container.appendChild(this.renderer.domElement);

    //get the fbx Object with its mixture and add it to the scene.
    this.fbxObject = new Artifact(filepath);
    this.mixers = this.fbxObject.mixers;
    this.object = this.fbxObject.object;
    this.actions = this.fbxObject.actions;
    this.scene.add(this.fbxObject.object);
    
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
    controls.maxPolarAngle = Math.PI * 0.5;
	controls.minDistance = 200;
	controls.maxDistance = 600;     
    controls.update();

    //function to start the animation loop
	var run = function() {
		//this updates the animations
		for (var i = 0; i < this.mixers.length; i++) {
			this.mixers[i].update(this.clock.getDelta());
        }
        
        //render the scene and the camera 
        //recursivly call teh animate funcation
        //update the stats element
        this.renderer.render(this.scene, this.camera);	
        requestAnimationFrame(run); 
        this.stats.update();
    }.bind(this);
    
    // Swap animation action to the provided index in the actions list
	var swapAnimationAction = function(index) {
        this.activeAction = index;
        var action = this.object.children[0].mixer;
        action.stopAllAction();

        if(index < this.object.children[0].animations.length){
			this.object.children[0].mixer.clipAction( this.object.children[0].animations[ index ] ).fadeIn(0.3).play(); 
        }else if(index < 0 || index >= this.object.children[0].animations.length){
			this.object.children[0].mixer.clipAction( this.object.children[0].animations[ 0 ] ).fadeIn(0.3).play(); 
        }
    }.bind(this);

    //update both the texture on the mesh and the wireframe value
    var updateMesh = function(texture, wireframe){
        this.object.children[0].traverse(function(child){
            if(child.isMesh){
                child.material = new THREE.MeshPhongMaterial({
                    map : new THREE.TextureLoader().load(textures[texture]),
                    displacementMap: new THREE.TextureLoader().load(textures[texture]),
                    displacementScale: 0.1,
                    normalMap: new THREE.TextureLoader().load(textures[texture]),
                    wireframe: wireframe,
                    skinning: true,
                    shininess: 100,
                    emissiveIntensity: 1
                })
            }
        }.bind(this));;
    }.bind(this);

    var pauseAnimation = function(){
        this.actions[this.activeAction].paused = true;
    }.bind(this);

    var resumeAnimation = function(){
        this.actions[this.activeAction].paused = false;
    }.bind(this);

    // Update learning metrics, and change associated avatar factors
	var update = function(data_obj) {
        this.animation; 
        this.texture ;
        this.wireframe ;

		// update go to new animation syquence.
		if(data_obj.animation || data_obj.animation === 0){
			this.animation = data_obj.animation;
			swapAnimationAction(this.animation);
        }
        
        // update the texture 
        if(data_obj.texture || data_obj.texture === 0){
            this.texture = data_obj.texture;
            updateMesh(this.texture, this.wireframe);
        }

        if(data_obj.wireframe || data_obj.wireframe == false){
            this.wireframe = data_obj.wireframe;
            updateMesh(this.texture, this.wireframe);
        }
		
    }.bind(this);

    //returning functions created inside the thing function
    return {
        run: run, //return animate function
        update: update,
        pauseAnimation: pauseAnimation,
        resumeAnimation: resumeAnimation
    }
}
