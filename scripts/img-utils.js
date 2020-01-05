export function imageToDataURL(imageNode) {
    return getBase64Image(imageNode)
}

function getBase64Image(imgNode) {
    var canvas = document.createElement('canvas');
    canvas.width = imgNode.width;
    canvas.height = imgNode.height;
    var context = canvas.getContext('2d');
    context.drawImage(imgNode, 0, 0, imgNode.width, imgNode.height)
    var dataURL = canvas.toDataURL('image/png');
    return dataURL
}