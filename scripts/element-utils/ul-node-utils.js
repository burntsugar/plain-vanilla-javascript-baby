'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods to append ul element node to the document.
 */

 /**
  * RMP
  */
 const ulNodeUtils = (function() {

    /**
     * Appends a ul element node, containing the given data as list items, to the given parent element node.
     * @param {object} dataObject the data to be displayed as list items
     * @param {string[]} nodeAttributes attributes belonging to the list
     * @param {string} parentNodeID id of the parent node to append the ul to.
     */
    function ulList(dataObject, nodeAttributes, parentNodeID) {
        var ul = document.createElement('ul');
    
        Object.keys(nodeAttributes).forEach(element => {
            ul.setAttribute(element, nodeAttributes[element]);
        });
    
        document.getElementById(parentNodeID).appendChild(ul);
        Object.keys(dataObject).forEach(element => {
            var li = document.createElement('li');
            li.setAttribute('class', 'item');
            ul.appendChild(li);
            li.innerHTML = li.innerHTML + element + ": " + dataObject[element];
        });
    }

    return {
        ulList: ulList,
    }
 }());

 export {ulNodeUtils};


