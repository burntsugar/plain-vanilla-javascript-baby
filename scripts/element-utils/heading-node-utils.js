'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */


export function h1Heading(parentNodeID, nodeAttributes, text) {
    var h1 = document.createElement('h1');

    Object.keys(nodeAttributes).forEach(element => {
        h1.setAttribute(element, nodeAttributes[element]);
    });

    var textNode = document.createTextNode(text);
    h1.appendChild(textNode);
    document.getElementById(parentNodeID).appendChild(h1);
}