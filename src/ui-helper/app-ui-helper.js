
'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for adding and removing DOM elements to the app document.
 */

import { removeNodeUtils } from '../element-utils/remove-node-utils.js';
import { commonProps } from '../common-props.js';
import { headingNodeUtils } from '../element-utils/heading-node-utils.js';
import { ulNodeUtils } from '../element-utils/ul-node-utils.js';
import { imageNodeUtils } from '../element-utils/image-node-utils.js';
import { toggleViz } from './toggle-viz.js';
import { pNodeUtils } from '../element-utils/p-node-utils.js';


/** RMP */
const appUiHelper = (function() {

    /**
     * @public
     * Adds nodes to the document which display the user profile, after removing any present error nodes.
     * @param {object} userProfile the UserProfile object.
     */
    function prepareSuccessNodes(userProfile) {
        removeNodeUtils.removeNode(
          commonProps.elementIds.ID_PARENT_WRAPPER,
          commonProps.elementIds.ID_NODE_ERROR_NODE
        );
        // headingNodeUtils.h1Heading(
        //   commonProps.elementIds.ID_PARENT_WRAPPER,
        //   { id: commonProps.elementIds.ID_HEADING_USERNAME },
        //   userProfile.body.login
        // );
        imageNodeUtils.imgImage(
          commonProps.elementIds.ID_USER_IMAGE,
          { id: commonProps.elementIds.ID_IMAGE_USER, crossorigin: 'anonymous' },
          userProfile.body.avatar_url
        );
        headingNodeUtils.h1Heading(
          commonProps.elementIds.ID_USER_NAME,
          { id: commonProps.elementIds.ID_HEADING_USERNAME },
          userProfile.body.login
        );
        ulNodeUtils.ulList(
          userProfile.body,
          { id: commonProps.elementIds.ID_UL_USER_DEETS },
          commonProps.elementIds.ID_PARENT_WRAPPER
        );
        // imageNodeUtils.imgImage(
        //   commonProps.elementIds.ID_PARENT_WRAPPER,
        //   { id: commonProps.elementIds.ID_IMAGE_USER, crossorigin: 'anonymous' },
        //   userProfile.body.avatar_url
        // );
        
      }


      /**
       * @public
       * Adds a node to the document which displays an error message, after removing any present error node.
       * @param {string} parentElementId id of the parent node
       * @param {string} errorNodeId id belonging to the new error node
       * @param {string} errorMessage error message text
       */
      function prepareErrorNode(parentElementId, errorNodeId, errorMessage) {
        removeNodeUtils.removeNode(
            parentElementId,
            errorNodeId
        );
        pNodeUtils.pText(
            parentElementId,
          { id: errorNodeId },
          errorMessage
        );
      }

      /**
       * @public
       * Removes all nodes for a user profile.
       * @param {string} parentElementId id of the parent node.
       * @param {string[]} childElementIds ids of the child nodes.
       */
      function removeUserDeetsNodes(parentElementId, childElementIds) {
        removeNodeUtils.removeChildNodes(parentElementId, childElementIds);
      }

      /**
       * @public 
       * For the given elements, makes it visible if it is not, or vice-versa.
       * @param {string[]} elementIds id's of the elements upon which to toggle visibility.
       */
      function toggleControlsVisibility(elementIds) {
        toggleViz.toggleDisplayControls(elementIds);
      }

      /**
       * 
       * TODO: can these 2 methods be combined safely?
       */
      /**
       * @public 
       * For the given element, makes it visible if it is not, or vice-versa.
       * @param {string} elementId id of the elements upon which to toggle visibility.
       */
      function toggleControlVisibility(elementId) {
        toggleViz.toggleDisplay(elementId);
      }

      return {
        prepareSuccessNodes: prepareSuccessNodes,
        prepareErrorNode: prepareErrorNode,
        removeUserDeetsNodes: removeUserDeetsNodes,
        toggleControlsVisibility: toggleControlsVisibility,
      };

}());

export {appUiHelper};