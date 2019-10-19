function LoadingManager(){
    
    //adding a load manager variable
    var manager = new THREE.LoadingManager();

    //show loading animation when the process starts.
    manager.onStart = function(url, itemsLoaded, itemsTotal){
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        $('#loading').attr("hidden", false);
        $('#datGUI').attr("hidden", true);
    }.bind(this);

    //hide loading animation when loaded
    manager.onLoad = function(){
        console.log("loading complete");
        $('#loading').attr("hidden",true);
        $('#datGUI').attr("hidden", false);
    }.bind(this);

    //show loading animation on progress
    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        $('#loading').attr("hidden", false);
    }.bind(this);
    
    //if there is an error loading the artifact.
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    }.bind(this);
    
    return {
        manager: manager
    }
}