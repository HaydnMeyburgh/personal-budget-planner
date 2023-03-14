"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkproject_planner_frontend"] = self["webpackChunkproject_planner_frontend"] || []).push([["src_components_transactions_transactionDetails_transactionDetails_js"],{

/***/ "./src/components/transactions/transactionDetails/transactionDetails.js":
/*!******************************************************************************!*\
  !*** ./src/components/transactions/transactionDetails/transactionDetails.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/dist/index.js\");\n/* harmony import */ var _transactionDetails_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transactionDetails.css */ \"./src/components/transactions/transactionDetails/transactionDetails.css\");\n\n\n\n\nconst TransactionDetails = () => {\n  const [transactionDetails, setTransactionDetails] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [tempTransaction, setTempTransaction] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [changed, setChanged] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();\n  const {\n    id\n  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useParams)();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchTransactionDetails = async () => {\n      const response = await fetch(`http://localhost:3000/api/transactions/${id}`);\n      const transactionDetailsData = await response.json();\n      setTransactionDetails(transactionDetailsData.data);\n      setTempTransaction(transactionDetailsData.data);\n    };\n    fetchTransactionDetails();\n  }, []);\n  const updateTransaction = async () => {\n    const response = await fetch(`http://localhost:3000/api/transactions/${id}`, {\n      method: \"PUT\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(tempTransaction)\n    });\n    await response.json();\n    setTransactionDetails(tempTransaction);\n    setChanged(false);\n    navigate(\"/transactions\");\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"btn\",\n    onClick: () => navigate(-1)\n  }, \"Go Back\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"details-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"transaction-details-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: tempTransaction.id\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"transaction-details-recipient\",\n    type: \"text\",\n    value: tempTransaction.recipient,\n    onChange: e => {\n      setChanged(true);\n      setTempTransaction({\n        ...tempTransaction,\n        recipient: e.target.value\n      });\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"transaction-details-amount\",\n    type: \"text\",\n    value: tempTransaction.amount,\n    onChange: e => {\n      setChanged(true);\n      setTempTransaction({\n        ...tempTransaction,\n        amount: e.target.value\n      });\n    }\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    className: \"transaction-details-date\",\n    type: \"date\",\n    value: tempTransaction.date,\n    onChange: e => {\n      setChanged(true);\n      setTempTransaction({\n        ...tempTransaction,\n        date: e.target.value\n      });\n    }\n  })), changed ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"changed-buttons\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"cancel-button\",\n    onClick: e => {\n      setTempTransaction({\n        ...transactionDetails\n      });\n      setChanged(false);\n    }\n  }, \"Cancel\"), \" \", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"save-button\",\n    onClick: updateTransaction\n  }, \"Save\")) : null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"button\", {\n    className: \"delete-button\",\n    onClick: e => {\n      fetch(`http://localhost:3000/api/transactions/${id}`, {\n        method: \"DELETE\"\n      }).then(response => {\n        if (!response.ok) {\n          throw new Error(\"Something went wrong\");\n        }\n        navigate(\"/transactions\");\n      }).catch(() => {\n        console.log(e);\n      });\n    }\n  }, \"Delete\")));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransactionDetails);\n\n//# sourceURL=webpack://project-planner-frontend/./src/components/transactions/transactionDetails/transactionDetails.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/transactions/transactionDetails/transactionDetails.css":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/transactions/transactionDetails/transactionDetails.css ***!
  \*********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".btn {\\r\\n  text-align: start;\\r\\n  border-radius: 4px;\\r\\n  border: none;\\r\\n  color: #6495ed;\\r\\n  padding: 8px;\\r\\n  background-color: white;\\r\\n  font-size: 15px;\\r\\n  margin-left: 50px;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.details-container {\\r\\n  display: flex;\\r\\n  flex-direction: column;\\r\\n  align-items: center;\\r\\n}\\r\\n\\r\\n.transaction-details-container {\\r\\n  display: grid;\\r\\n  align-items: center;\\r\\n  justify-content: center;\\r\\n  border-radius: 10px;\\r\\n  background-color: #f0f0f0;\\r\\n  height: 280px;\\r\\n  width: 350px;\\r\\n  transition: box-shadow .3s;\\r\\n  border: 0.5px solid #6494ed65;\\r\\n}\\r\\n\\r\\n.transaction-details-recipient, .transaction-details-amount, .transaction-details-date  {\\r\\n  display: flex;\\r\\n  margin: 25px;\\r\\n  width: 200px;\\r\\n  height: 40px;\\r\\n  font-size: 20px;\\r\\n  padding-left: 15px;\\r\\n  border-radius: 4px;\\r\\n  border: 0.5px solid #6494ed65;\\r\\n}\\r\\n\\r\\n.changed-buttons {\\r\\n  display: flex;\\r\\n  flex-direction: row;\\r\\n  justify-content: center;\\r\\n}\\r\\n\\r\\n.cancel-button, .save-button {\\r\\n  margin: 10px;\\r\\n  width: 80px;\\r\\n  height: 30px;\\r\\n  border-radius: 4px;\\r\\n  border: 0.5px solid #6494ed65;\\r\\n  color: #6495ed;\\r\\n  cursor: pointer;\\r\\n}\\r\\n\\r\\n.delete-button {\\r\\n  margin-top: 30px;\\r\\n  width: 80px;\\r\\n  height: 30px;\\r\\n  border-radius: 4px;\\r\\n  cursor: pointer;\\r\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://project-planner-frontend/./src/components/transactions/transactionDetails/transactionDetails.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./src/components/transactions/transactionDetails/transactionDetails.css":
/*!*******************************************************************************!*\
  !*** ./src/components/transactions/transactionDetails/transactionDetails.css ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_transactionDetails_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../node_modules/css-loader/dist/cjs.js!./transactionDetails.css */ \"./node_modules/css-loader/dist/cjs.js!./src/components/transactions/transactionDetails/transactionDetails.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_transactionDetails_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_transactionDetails_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_transactionDetails_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_transactionDetails_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://project-planner-frontend/./src/components/transactions/transactionDetails/transactionDetails.css?");

/***/ })

}]);