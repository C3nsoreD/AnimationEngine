function Loader(filepath){
    
    //animation mixer is a player for animations on a certain object
    //each object has it's own mixer, group is a container for each object
    this.mixers = [];
    this.group = new THREE.Group();

    //load the fbx file from the obtained place
    new THREE.FBXLoader().load(filepath, function(object){

        //store object to be accessed later
        this.object = object;

        //update the position of the object
        this.object.position.set(0,0,0);
       
        //create instance varible for object called mixer and assign animation mixter to it
        this.object.mixer = new THREE.AnimationMixer(object);
        this.object.mixer.timeScale = 1;
        this.mixers.push(this.object.mixer);

        //prepare all the animation action for playing 
        for(var i = 0; i < this.object.animations.length; i++){
            var action = this.object.mixer.clipAction(this.object.animations[i]);
            action.play();

            if(i){
                action.paused = true;
            }
        }

        //traverse through all items in the object 
        //find item with type mesh  
        //set the mesh properties 
        this.object.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.setDrawRange(0, child.geometry.drawRange.count);
            }	
        }.bind(this));

        //add the object to the group
        this.group.add(this.object);

    }.bind(this), null, function(err){
        console.log(err);
    });

    //return animation mixer
    //return group containing object
    return {
        mixers: this.mixers,
        group : this.group
    }
}