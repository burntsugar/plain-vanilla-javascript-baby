/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides a utility for encoding image data from a {Document.Element} to a base 64 dataUri which is returned as a {DOMString}. The result may then be persisted.
 */

/** RMP */
const imgUtils = (function() {
  /**
   *
   * @public
   * @param {Document.Element} imageNode the document element containing the image data to be processed.
   * @return {DOMString} containing base64 dataUri of the image data.
   */
  function imageToDataURL(imageNode) {
    return getBase64Image(imageNode);
  }

  /**
   * Constructs a Document Canvas element, upon which is drawn the provided Image Element and then encodes the result to a base64 data uri. The image's dimensions are preserved.
   * @private
   * @param {Document.Element} imageNode the document element containing the image data to be processed.
   * @return {DOMString} containing base64 dataUri of the image data.
   */
  function getBase64Image(imgNode) {
    var canvas = document.createElement("canvas");
    canvas.width = imgNode.width;
    canvas.height = imgNode.height;
    var context = canvas.getContext("2d");
    context.drawImage(imgNode, 0, 0, imgNode.width, imgNode.height);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }

  return {
    imageToDataURL: imageToDataURL
  };
})();

export { imgUtils };