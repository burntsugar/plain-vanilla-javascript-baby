'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods to append ul element node to the document.
 */

/**
 * RMP
 */
const ulNodeUtils = (() => {
  /**
   * Appends a ul element node, containing the given data as list items, to the
   * given parent element node.
   * @param {object} dataObject the data to be displayed as list items
   * @param {string[]} nodeAttributes attributes belonging to the list
   * @param {string} parentNodeID id of the parent node to append the ul to.
   */
  const ulList = (dataObject, nodeAttributes, parentNodeID) => {
    const ul = document.createElement('ul');

    Object.keys(nodeAttributes).forEach((element) => {
      ul.setAttribute(element, nodeAttributes[element]);
    });

    document.getElementById(parentNodeID).appendChild(ul);
    Object.keys(dataObject).forEach((element) => {
      const li = document.createElement('li');
      li.setAttribute('class', 'item');
      ul.appendChild(li);
      li.innerHTML =
        li.innerHTML + element + ': ' + formatText(dataObject[element]);
    });
  };

  /**
   *
   * @param {*} str
   * @return {string}
   */
  const formatText = (str) => {
    if (typeof str == 'string' && str.length > 80) {
      return str.substring(0, 80) + '...';
    } else {
      return str;
    }
  };

  return {
    ulList: ulList,
  };
})();

export {ulNodeUtils};
