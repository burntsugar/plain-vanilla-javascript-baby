'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for adding h1 element nodes to the document.
 */

 /**
  * RMP
  */
const headingNodeUtils = (function() {
    /**
     * @public
     * Prepares a h1 element node which is then attached to the given parent node.
     * @param {string} parentNodeID the id of the parent node
     * @param {string[]} nodeAttributes attributes belonging to the new h1 node
     * @param {string} text text contents of the h1 node
     */
  function h1Heading(parentNodeID, nodeAttributes, text) {
    var h1 = document.createElement('h1');

    Object.keys(nodeAttributes).forEach(element => {
      h1.setAttribute(element, nodeAttributes[element]);
    });

    var textNode = document.createTextNode(text);
    h1.appendChild(textNode);
    document.getElementById(parentNodeID).appendChild(h1);
  }

  return {
    h1Heading: h1Heading
  };
})();

export { headingNodeUtils };
