function Artifact(artifact, x,y,z){

    //animation mixer is a player for animations on a certain object
    //each object has it's own mixer, group is a container for each object
    this.object = new THREE.Object3D();
    this.mixers = [];
    this.actions = [];

    //adding a load manager variable
    var manager = new THREE.LoadingManager();

    //during the starting process
    manager.onStart = function(url, itemsLoaded, itemsTotal){
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

        //show the load screen when loading artifact.
        $('#loading').attr("hidden", false);
    }.bind(this);

    //when the loading process has completed
    manager.onLoad = function(){
        console.log("loading complete");

        //hide the loading screen when artifact has loaded.
        $('#loading').attr("hidden",true);
    }.bind(this);

    //as the loading process is going on
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    }.bind(this);
    
    //if there is an error loading the artifact.
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    }.bind(this);
    
    //load the fbx file from the obtained place
    new THREE.FBXLoader(manager).load(artifact,  function(object){
        //update the position of the object
        object.position.set(x,y,z);
   
        //create instance varible for object called mixer and assign animation mixter to it
        object.mixer = new THREE.AnimationMixer(object);
        object.mixer.timeScale = 1;
        this.mixers.push(object.mixer);

        //prepare all the animation action for playing 
        for(var i = 0; i<object.animations.length; i++){
            var action = object.mixer.clipAction(object.animations[i]);
            action.play();
            this.actions.push(action);

            if(i){
                action.paused = true;
            }
        }
        //traverse through all items in the object 
        //find item with type mesh  
        //set the mesh properties 
        object.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.setDrawRange(0, child.geometry.drawRange.count);
            }	
        }.bind(this));
        
        this.object.add(object);

    }.bind(this), null, function(err){console.log(err); });

    
    //return animation mixer
    //return group containing object
    return {
        object : this.object,
        mixers: this.mixers,
        actions: this.actions
    }
}
