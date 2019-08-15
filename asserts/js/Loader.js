function Loader(filepath){

    this.object = null;
    this.mixers = [];
    this.actions = [];

    this.scene = new THREE.Scene();

    //load the fbx file from the obtained place
    new THREE.FBXLoader().load(filepath, function(object){

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
            this.actions.push(action);
            action.play();

            if(i){
                action.paused = true;
            }
        }

        //traverse through the object
        this.object.traverse(function(child){
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.geometry.setDrawRange(0, child.geometry.drawRange.count);
            }	
        }.bind(this));

        //add the object to the scene
        this.scene.add(object);

    }.bind(this), null, function(err){
        console.log(err);
    });

    return {
        object: this.object,
        mixers: this.mixers,
        scene : this.scene
    }
}