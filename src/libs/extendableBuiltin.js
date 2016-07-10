// This function makes it possible to extend native classes
module.exports = function extendableBuiltin (klass) {
  function ExtendableBuiltin () {
    klass.apply(this, arguments);
  }
  ExtendableBuiltin.prototype = Object.create(klass.prototype);
  Object.setPrototypeOf(ExtendableBuiltin, klass);

  return ExtendableBuiltin;
};
