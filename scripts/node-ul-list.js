export function ulList(jsonObj, nodeAttributes, parentNodeID) {
    var ul = document.createElement('ul');

    Object.keys(nodeAttributes).forEach(element => {
        ul.setAttribute(element, nodeAttributes[element]);
    });


    document.getElementById(parentNodeID).appendChild(ul);
    Object.keys(jsonObj).forEach(element => {
        var li = document.createElement('li');
        li.setAttribute('class', 'item');
        ul.appendChild(li);
        li.innerHTML = li.innerHTML + element + ": " + jsonObj[element];
    });
}