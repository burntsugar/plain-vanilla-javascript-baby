export function toggleDisplayControls(controlz) {
    controlz.forEach(element => {
        document.getElementById(element).classList.toggle("hidden");
    });
}

export function toggleDisplay(elementID){
    document.getElementById(elementID).classList.toggle("hidden");
}