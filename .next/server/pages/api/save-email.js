"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/save-email";
exports.ids = ["pages/api/save-email"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./lib/supabaseClient.js":
/*!*******************************!*\
  !*** ./lib/supabaseClient.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst supabaseUrl = \"https://twspukplfarufdkatlkm.supabase.co\";\nconst supabaseKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3c3B1a3BsZmFydWZka2F0bGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Njg2OTYsImV4cCI6MjA2MDE0NDY5Nn0.hKlupIPpNW2-Qec4P7p_TfB0mHO-pO92w9fZsxrEk1U\";\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseKey);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvc3VwYWJhc2VDbGllbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBRXJELE1BQU1DLGNBQWNDLDBDQUFvQztBQUN4RCxNQUFNRyxjQUFjSCxrTkFBeUM7QUFFdEQsTUFBTUssV0FBV1AsbUVBQVlBLENBQUNDLGFBQWFJLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0YW5kb2FpLy4vbGliL3N1cGFiYXNlQ2xpZW50LmpzPzVmMGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG5jb25zdCBzdXBhYmFzZUtleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZO1xuXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlS2V5KTsiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VLZXkiLCJORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSIsInN1cGFiYXNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/supabaseClient.js\n");

/***/ }),

/***/ "(api)/./pages/api/save-email.js":
/*!*********************************!*\
  !*** ./pages/api/save-email.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(api)/./lib/supabaseClient.js\");\n\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            error: \"M\\xe9todo n\\xe3o permitido\"\n        });\n    }\n    const { email } = req.body;\n    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (!email || typeof email !== \"string\" || !emailRegex.test(email)) {\n        return res.status(400).json({\n            error: \"E-mail inv\\xe1lido\"\n        });\n    }\n    try {\n        const { data: existing, error: fetchError } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_0__.supabase.from(\"cadastro_testandoai\").select(\"id\").eq(\"email\", email).maybeSingle();\n        if (fetchError) {\n            console.error(\"Erro ao verificar e-mail:\", fetchError.message);\n            return res.status(500).json({\n                error: \"Erro ao verificar e-mail\"\n            });\n        }\n        if (existing) {\n            return res.status(200).json({\n                message: \"E-mail j\\xe1 cadastrado\"\n            });\n        }\n        const { error: insertError } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_0__.supabase.from(\"cadastro_testandoai\").insert([\n            {\n                email\n            }\n        ]);\n        if (insertError) {\n            console.error(\"Erro ao salvar e-mail:\", insertError.message);\n            return res.status(500).json({\n                error: \"Erro ao salvar e-mail\"\n            });\n        }\n        return res.status(200).json({\n            message: \"E-mail salvo com sucesso!\"\n        });\n    } catch (err) {\n        console.error(\"Erro inesperado:\", err);\n        return res.status(500).json({\n            error: \"Erro inesperado no servidor\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc2F2ZS1lbWFpbC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFnRDtBQUVqQyxlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUc7SUFDNUMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXVCO0lBQzlEO0lBRUEsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR04sSUFBSU8sSUFBSTtJQUUxQixNQUFNQyxhQUFhO0lBQ25CLElBQUksQ0FBQ0YsU0FBUyxPQUFPQSxVQUFVLFlBQVksQ0FBQ0UsV0FBV0MsSUFBSSxDQUFDSCxRQUFRO1FBQ2xFLE9BQU9MLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFrQjtJQUN6RDtJQUVBLElBQUk7UUFDRixNQUFNLEVBQUVLLE1BQU1DLFFBQVEsRUFBRU4sT0FBT08sVUFBVSxFQUFFLEdBQUcsTUFBTWQseURBQVFBLENBQ3pEZSxJQUFJLENBQUMsdUJBQ0xDLE1BQU0sQ0FBQyxNQUNQQyxFQUFFLENBQUMsU0FBU1QsT0FDWlUsV0FBVztRQUVkLElBQUlKLFlBQVk7WUFDZEssUUFBUVosS0FBSyxDQUFDLDZCQUE2Qk8sV0FBV00sT0FBTztZQUM3RCxPQUFPakIsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUEyQjtRQUNsRTtRQUVBLElBQUlNLFVBQVU7WUFDWixPQUFPVixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFYyxTQUFTO1lBQXVCO1FBQ2hFO1FBRUEsTUFBTSxFQUFFYixPQUFPYyxXQUFXLEVBQUUsR0FBRyxNQUFNckIseURBQVFBLENBQzFDZSxJQUFJLENBQUMsdUJBQ0xPLE1BQU0sQ0FBQztZQUFDO2dCQUFFZDtZQUFNO1NBQUU7UUFFckIsSUFBSWEsYUFBYTtZQUNmRixRQUFRWixLQUFLLENBQUMsMEJBQTBCYyxZQUFZRCxPQUFPO1lBQzNELE9BQU9qQixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQXdCO1FBQy9EO1FBRUEsT0FBT0osSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFYyxTQUFTO1FBQTRCO0lBQ3JFLEVBQUUsT0FBT0csS0FBSztRQUNaSixRQUFRWixLQUFLLENBQUMsb0JBQW9CZ0I7UUFDbEMsT0FBT3BCLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUE4QjtJQUNyRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdGFuZG9haS8uL3BhZ2VzL2FwaS9zYXZlLWVtYWlsLmpzPzk4MGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VwYWJhc2UgfSBmcm9tICdAL2xpYi9zdXBhYmFzZUNsaWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuanNvbih7IGVycm9yOiAnTcOpdG9kbyBuw6NvIHBlcm1pdGlkbycgfSk7XG4gIH1cblxuICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcblxuICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XG4gIGlmICghZW1haWwgfHwgdHlwZW9mIGVtYWlsICE9PSAnc3RyaW5nJyB8fCAhZW1haWxSZWdleC50ZXN0KGVtYWlsKSkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiAnRS1tYWlsIGludsOhbGlkbycgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgZGF0YTogZXhpc3RpbmcsIGVycm9yOiBmZXRjaEVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ2NhZGFzdHJvX3Rlc3RhbmRvYWknKVxuICAgICAgLnNlbGVjdCgnaWQnKVxuICAgICAgLmVxKCdlbWFpbCcsIGVtYWlsKVxuICAgICAgLm1heWJlU2luZ2xlKCk7XG5cbiAgICBpZiAoZmV0Y2hFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJybyBhbyB2ZXJpZmljYXIgZS1tYWlsOicsIGZldGNoRXJyb3IubWVzc2FnZSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0Vycm8gYW8gdmVyaWZpY2FyIGUtbWFpbCcgfSk7XG4gICAgfVxuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiAnRS1tYWlsIGrDoSBjYWRhc3RyYWRvJyB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGVycm9yOiBpbnNlcnRFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKCdjYWRhc3Ryb190ZXN0YW5kb2FpJylcbiAgICAgIC5pbnNlcnQoW3sgZW1haWwgfV0pO1xuXG4gICAgaWYgKGluc2VydEVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvIGFvIHNhbHZhciBlLW1haWw6JywgaW5zZXJ0RXJyb3IubWVzc2FnZSk7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0Vycm8gYW8gc2FsdmFyIGUtbWFpbCcgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogJ0UtbWFpbCBzYWx2byBjb20gc3VjZXNzbyEnIH0pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvIGluZXNwZXJhZG86JywgZXJyKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogJ0Vycm8gaW5lc3BlcmFkbyBubyBzZXJ2aWRvcicgfSk7XG4gIH1cbn0iXSwibmFtZXMiOlsic3VwYWJhc2UiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiZW1haWwiLCJib2R5IiwiZW1haWxSZWdleCIsInRlc3QiLCJkYXRhIiwiZXhpc3RpbmciLCJmZXRjaEVycm9yIiwiZnJvbSIsInNlbGVjdCIsImVxIiwibWF5YmVTaW5nbGUiLCJjb25zb2xlIiwibWVzc2FnZSIsImluc2VydEVycm9yIiwiaW5zZXJ0IiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/save-email.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/save-email.js"));
module.exports = __webpack_exports__;

})();