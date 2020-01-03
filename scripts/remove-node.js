export function removeNode(parentid, childid) {
    if (document.getElementById(parentid) != null) {
        if (document.getElementById(childid) != null) {
            document.getElementById(parentid).removeChild(document.getElementById(childid))
        }
    }
} 

export function removeChildNodes(parentid, childNodes) {
    childNodes.forEach(element => {
        removeNode(parentid, element)
    });
} 