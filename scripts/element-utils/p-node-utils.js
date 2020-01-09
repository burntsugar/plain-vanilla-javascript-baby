
'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for adding p element nodes to the document.
 */

 /**
  * RMP
  */
 const pNodeUtils = (function() {

    /**
     * @public
     * Appends a new p element node to the parent element node belonging to the given id.
     * @param {string} parentNodeID id of the parent element node
     * @param {object} nodeAttributes attributes for the new p element node
     * @param {string} text the text to be displayed in the new p element node
     */
    function pText(parentNodeID, nodeAttributes, text) {
        var p = document.createElement('p');
    
        Object.keys(nodeAttributes).forEach(element => {
            p.setAttribute(element, nodeAttributes[element]);
        });
        
        var textNode = document.createTextNode(text);
        p.appendChild(textNode);
        document.getElementById(parentNodeID).appendChild(p);
    }

    return {
        pText: pText,
    }

 }());

 export {pNodeUtils};
 