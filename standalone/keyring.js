;(function(){

var slice = [].slice;

function bind(obj, fn){
  if ('string' === typeof fn) fn = obj[fn];
  if ('function' !== typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function() {
    return fn.apply(obj, args.concat(slice.call(arguments)));
  };
}

var addListener = window.addEventListener ? 'addEventListener' : 'attachEvent',
    removeListener = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = addListener !== 'addEventListener' ? 'on' : '',
    listener = {};

listener.add = function(el, type, fn, capture){
  el[addListener](prefix + type, fn, capture || false);
  return fn;
};

listener.remove = function(el, type, fn, capture){
  el[removeListener](prefix + type, fn, capture || false);
  return fn;
};

var styleEl = document.createElement('style'),
    css = 'a, button, input, select, textarea, iframe, [tabindex] { outline: none; }';

function setStyle(css) {
  if (!!styleEl.styleSheet) styleEl.styleSheet.cssText = css; // IE8-
  else styleEl.innerHTML = css;
}

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

Keyring.prototype.hideRing = function() {
  if (this.isFocusVisible) setStyle(css);
  this.isFocusVisible = false;
};

Keyring.prototype.showRing = function() {
  if (!this.isFocusVisible) setStyle('');
  this.isFocusVisible = true;
};

// Export to browser global
this["Keyring"] = Keyring;

})();
