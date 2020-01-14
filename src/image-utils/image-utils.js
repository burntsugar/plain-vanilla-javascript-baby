'use strict';

/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides a utility for encoding image data from a {Document.Element} to a base 64 dataUri which is returned as a {DOMString}. The result may then be persisted.
 */

/** RMP */
const imgUtils = (() => {
  /**
   *
   * @public
   * @param {documentElement} imageDocumentElement the image document element containing the image data to be processed.
   * @return {DOMString} implicit return, containing base64 dataUri of the image data.
   */
  const imageToDataURL = imageDocumentElement =>
    getBase64Image(imageDocumentElement);

  /**
   * Constructs a Document Canvas element, upon which is drawn the provided Image Element and then encodes the result to a base64 data uri. The image's dimensions are preserved.
   * @private
   * @param {Document.Element} imageDocumentElement the document element containing the image data to be processed.
   * @return {DOMString} containing base64 dataUri of the image data.
   */
  const getBase64Image = imageDocumentElement => {
    const canvas = document.createElement('canvas');
    canvas.width = imageDocumentElement.width;
    canvas.height = imageDocumentElement.height;
    const context = canvas.getContext('2d');
    context.drawImage(
      imageDocumentElement,
      0,
      0,
      imageDocumentElement.width,
      imageDocumentElement.height
    );
    return canvas.toDataURL('image/png');
  };

  return {
    imageToDataURL: imageToDataURL
  };
})();

export { imgUtils };
