
/**
 * Module dependencies
 */

var listener = require('listener'),
    bind = require('bind');

/**
 * Expose Keyring
 */

module.exports = Keyring;

/**
 * Private variables
 */

var styleEl = document.createElement('style'),
    css = 'a, button, input, select, textarea, iframe, [tabindex] { outline: none; }';

/**
 * Set the contents of the style element in the document head.
 *
 * @param {String} css
 * @api private
 */
function setStyle(css) {
  if (!!styleEl.styleSheet) styleEl.styleSheet.cssText = css; // IE8-
  else styleEl.innerHTML = css;
}

/**
 * Create new Keyring singleton for the document.
 *
 * @api public
 */

function Keyring() {
  if ( Keyring.prototype._singletonInstance ) {
    return Keyring.prototype._singletonInstance;
  }
  Keyring.prototype._singletonInstance = this;

  this.isFocusVisible = true;

  document.getElementsByTagName('head')[0].appendChild(styleEl);

  listener.add( document, 'mousedown', bind(this, this.hideRing) );
  listener.add( document, 'keydown', bind(this, this.showRing) );
}

/**
 * Hide visible focus rings for focusable elements.
 *
 * @api public
 */

Keyring.prototype.hideRing = function() {
  if (this.isFocusVisible) setStyle(css);
  this.isFocusVisible = false;
};

/**
 * Restore visible focus rings for focusable elements.
 *
 * @api public
 */

Keyring.prototype.showRing = function() {
  if (!this.isFocusVisible) setStyle('');
  this.isFocusVisible = true;
};
