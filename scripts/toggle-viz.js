/**
 * @author Rachael Colley <rcolley@rcolley>
 * @fileoverview Provides methods for toggling visibility of Document.documentElement.
 * Toggle is achieved via Document.documentElement.classList.toggle('hidden-class-name').
 * Relies upon the implementation of .hidden { display: none; } in app.css.
 */

/** RMP */
const toggleViz = (function() {
  /**
   * Toggles .hidden class for a given array of Document.documentElement id's.
   * @public
   * @param {string[]} controlz array of Document.documentElement id's of which to toggle .hidden class.
   * @return {undefined}
   */
  function toggleDisplayControls(controlz) {
    controlz.forEach(element => {
      toggleDisplay(element);
    });
  }

  /**
   * Toggles .hidden class for a given Document.documentElement.
   * @public
   * @param {string} elementID Document.documentElement id of which to toggle .hidden class.
   * @return {undefined}
   */
  function toggleDisplay(elementID) {
    document.getElementById(elementID).classList.toggle('hidden');
  }

  return {
    toggleDisplayControls: toggleDisplayControls,
    toggleDisplay: toggleDisplay
  };
})();

export { toggleViz };
