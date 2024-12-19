"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-stream";
exports.ids = ["vendor-chunks/is-stream"];
exports.modules = {

/***/ "(action-browser)/./node_modules/is-stream/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-stream/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("\n\nvar isStream = module.exports = function (stream) {\n\treturn stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';\n};\n\nisStream.writable = function (stream) {\n\treturn isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';\n};\n\nisStream.readable = function (stream) {\n\treturn isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';\n};\n\nisStream.duplex = function (stream) {\n\treturn isStream.writable(stream) && isStream.readable(stream);\n};\n\nisStream.transform = function (stream) {\n\treturn isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9pcy1zdHJlYW0vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2pzbV9iYW5raW5nLy4vbm9kZV9tb2R1bGVzL2lzLXN0cmVhbS9pbmRleC5qcz82ZTJkIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3RyZWFtID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG5cdHJldHVybiBzdHJlYW0gIT09IG51bGwgJiYgdHlwZW9mIHN0cmVhbSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHN0cmVhbS5waXBlID09PSAnZnVuY3Rpb24nO1xufTtcblxuaXNTdHJlYW0ud3JpdGFibGUgPSBmdW5jdGlvbiAoc3RyZWFtKSB7XG5cdHJldHVybiBpc1N0cmVhbShzdHJlYW0pICYmIHN0cmVhbS53cml0YWJsZSAhPT0gZmFsc2UgJiYgdHlwZW9mIHN0cmVhbS5fd3JpdGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHN0cmVhbS5fd3JpdGFibGVTdGF0ZSA9PT0gJ29iamVjdCc7XG59O1xuXG5pc1N0cmVhbS5yZWFkYWJsZSA9IGZ1bmN0aW9uIChzdHJlYW0pIHtcblx0cmV0dXJuIGlzU3RyZWFtKHN0cmVhbSkgJiYgc3RyZWFtLnJlYWRhYmxlICE9PSBmYWxzZSAmJiB0eXBlb2Ygc3RyZWFtLl9yZWFkID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzdHJlYW0uX3JlYWRhYmxlU3RhdGUgPT09ICdvYmplY3QnO1xufTtcblxuaXNTdHJlYW0uZHVwbGV4ID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuXHRyZXR1cm4gaXNTdHJlYW0ud3JpdGFibGUoc3RyZWFtKSAmJiBpc1N0cmVhbS5yZWFkYWJsZShzdHJlYW0pO1xufTtcblxuaXNTdHJlYW0udHJhbnNmb3JtID0gZnVuY3Rpb24gKHN0cmVhbSkge1xuXHRyZXR1cm4gaXNTdHJlYW0uZHVwbGV4KHN0cmVhbSkgJiYgdHlwZW9mIHN0cmVhbS5fdHJhbnNmb3JtID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzdHJlYW0uX3RyYW5zZm9ybVN0YXRlID09PSAnb2JqZWN0Jztcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/is-stream/index.js\n");

/***/ })

};
;