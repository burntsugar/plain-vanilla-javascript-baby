'use strict';
/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview does stuff.
 */

 /**
  * RMP
  */
 const imageNodeUtils = (function() {
     /**
      * @public
      * Prepares an img element node, with the given image source, and appends it to the given parent node.
      * @param {string} parentNodeID the id of the parent node
      * @param {string[]} nodeAttributes attributes belonging to the new img node
      * @param {*} imageURL source of the image data. This may be a relative url or data uri.
      */
    function imgImage(parentNodeID, nodeAttributes, imageURL) {
        var img = document.createElement('img');
    
        Object.keys(nodeAttributes).forEach(element => {
            img.setAttribute(element, nodeAttributes[element]);
           
        });
        img.width = 300;
        img.src = imageURL;
        document.getElementById(parentNodeID).appendChild(img);
    }

    return {
        imgImage: imgImage,
    }
 }());

 export {imageNodeUtils};


