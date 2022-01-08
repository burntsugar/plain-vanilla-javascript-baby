'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for adding and updating h1 element nodes.
 */

/**
 * RMP
 */
const headingNodeUtils = (() => {
  /**
   * @public
   * Prepares a h1 element node which is then attached to the given parent node.
   * @param {string} parentNodeID the id of the parent node
   * @param {string[]} nodeAttributes attributes belonging to the new h1 node
   * @param {string} text text contents of the h1 node
   */
  const h1Heading = (parentNodeID, nodeAttributes, text) => {
    const h1 = document.createElement('h1');

    Object.keys(nodeAttributes).forEach((element) => {
      h1.setAttribute(element, nodeAttributes[element]);
    });

    const textNode = document.createTextNode(text);
    h1.appendChild(textNode);
    document.getElementById(parentNodeID).appendChild(h1);
  };

  /**
   * Update a h1 node with the given text
   * @public
   * @param {String} nodeID
   * @param {String} text
   */
  const updateH1 = (nodeID, text) => {
    const h1 = document.getElementById(nodeID);
    h1.innerHTML = text;
  };

  return {
    h1Heading: h1Heading,
    updateH1: updateH1,
  };
})();

export {headingNodeUtils};
