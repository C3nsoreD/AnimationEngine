function Artifact(filepath){
    
    //animation mixer is a player for animations on a certain object
    //each object has it's own mixer, group is a container for each object
    this.mixers = [];
    this.object = new THREE.Object3D();

    
    //load the fbx file from the obtained place
    new THREE.FBXLoader().load(filepath, function(object){
        //console.log(object);
        //update the position of the object
        object.position.set(0,0,0);
        objectStore = object;
       
        //create instance varible for object called mixer and assign animation mixter to it
        object.mixer = new THREE.AnimationMixer(object);
        object.mixer.timeScale = 1;
        this.mixers.push(object.mixer);

        //prepare all the animation action for playing 
        var action = object.mixer.clipAction(object.animations[1]);
        action.play();
      
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

        //add the object to the global objec varible 
        this.object.add(object);

    }.bind(this), null, function(err){console.log(err); });
  
    //return animation mixer
    //return group containing object
    return {
        mixers: this.mixers,
        object : this.object
    }
}
