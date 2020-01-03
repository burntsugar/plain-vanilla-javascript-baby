export function imgImage(parentNodeID, nodeAttributes, imageURL) {
    var img = document.createElement('img');

    Object.keys(nodeAttributes).forEach(element => {
        img.setAttribute(element, nodeAttributes[element]);
    });

    img.src = imageURL;
    document.getElementById(parentNodeID).appendChild(img);
}