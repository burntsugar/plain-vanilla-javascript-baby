
export function pText(parentNodeID, nodeAttributes, text) {
    var p = document.createElement('P');

    Object.keys(nodeAttributes).forEach(element => {
        p.setAttribute(element, nodeAttributes[element]);
    });
    
    var textNode = document.createTextNode(text);
    p.appendChild(textNode);
    document.getElementById(parentNodeID).appendChild(p);
}