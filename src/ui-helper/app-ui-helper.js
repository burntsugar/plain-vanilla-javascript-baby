'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for adding and removing DOM elements to the
 * app document.
 */

import {removeNodeUtils} from '../element-utils/remove-node-utils.js';
import {commonProps} from '../common-props.js';
import {headingNodeUtils} from '../element-utils/heading-node-utils.js';
import {ulNodeUtils} from '../element-utils/ul-node-utils.js';
import {imageNodeUtils} from '../element-utils/image-node-utils.js';
import {toggleViz} from './toggle-viz.js';
import {pNodeUtils} from '../element-utils/p-node-utils.js';

/** RMP */
const appUiHelper = (() => {
  /**
   * @public
   * Adds nodes to the document which display the user profile.
   * @param {object} userProfile the UserProfile object.
   */
  const prepareSuccessNodes = (userProfile) => {
    imageNodeUtils.updateImage( commonProps.elementIds.ID_PROFILE_DISPLAY_IMAGE_IMG, userProfile.body.avatar_url,
    );

    headingNodeUtils.updateH1(
      commonProps.elementIds.ID_PROFILE_DISPLAY_USERNAME_H2,
      userProfile.body.login,
    );

    ulNodeUtils.updateUL(
      commonProps.elementIds.ID_PROFILE_DATA, commonProps.elementIds.ID_UL_USER_DEETS,
      userProfile.body,
    );
  };

  /**
   * @public
   * Adds a node to the document which displays an error message, after
   * removing any present error node.
   * @param {string} parentElementId id of the parent node
   * @param {string} errorNodeId id belonging to the new error node
   * @param {string} errorMessage error message text
   */
  const prepareErrorNode = (parentElementId, errorNodeId, errorMessage) => {
    removeNodeUtils.removeNode(parentElementId, errorNodeId);
    pNodeUtils.pText(parentElementId, {id: errorNodeId}, errorMessage);
  };

  /**
   * @public
   * Removes all nodes for a user profile.
   * @param {string} parentElementId id of the parent node.
   * @param {string[]} childElementIds ids of the child nodes.
   * @return {undefined}
   */
  const removeUserDeetsNodes = (parentElementId, childElementIds) =>
    void removeNodeUtils.removeChildNodes(parentElementId, childElementIds);

  /**
   * @public
   * For the given elements, makes it visible if it is not, or vice-versa.
   * @param {string[]} elementIds id's of the elements upon which to toggle
   * visibility.
   * @return {undefined}
   */
  const toggleControlsVisibility = (elementIds) =>
    void toggleViz.toggleDisplayControls(elementIds);

  return {
    prepareSuccessNodes: prepareSuccessNodes,
    prepareErrorNode: prepareErrorNode,
    removeUserDeetsNodes: removeUserDeetsNodes,
    toggleControlsVisibility: toggleControlsVisibility,
  };
})();

export {appUiHelper};
