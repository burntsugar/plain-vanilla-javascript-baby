const toggleViz = (function () {

    function toggleDisplayControls(controlz) {
        controlz.forEach(element => {
            document.getElementById(element).classList.toggle('hidden');
        });
    }

    function toggleDisplay(elementID){
        document.getElementById(elementID).classList.toggle('hidden');
    }

    return {
        toggleDisplayControls: toggleDisplayControls,
        toggleDisplay: toggleDisplay
    };

}());

export { toggleViz };




