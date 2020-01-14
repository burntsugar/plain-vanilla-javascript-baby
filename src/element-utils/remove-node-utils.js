'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for removing nodes from the document.
 */

/**
 * RMP
 */
const removeNodeUtils = (() => {
  /**
   * @public
   * Removes a node of the given child node id from the parent with the given parent node id. Does not remove the parent.
   * @param {string} parentid id of the parent node
   * @param {string} childid id of the child node
   */
  const removeNode = (parentid, childid) => {
    if (document.getElementById(parentid) != null) {
      if (document.getElementById(childid) != null) {
        document
          .getElementById(parentid)
          .removeChild(document.getElementById(childid));
      }
    }
  };

  /**
   * @public
   * Removes nodes of the given child node ids from the parent with the given parent node id. Does not remove the parent.
   * @param {string} parentid id of the parent node
   * @param {string[]} childids id of the child nodes
   */
  const removeChildNodes = (parentid, childNodes) => {
    childNodes.forEach(element => {
      removeNode(parentid, element);
    });
  };

  return {
    removeNode: removeNode,
    removeChildNodes: removeChildNodes
  };
})();

export { removeNodeUtils };
