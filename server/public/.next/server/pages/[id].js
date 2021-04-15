module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("X5zB");


/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "5KpL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ getIndexPageData; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ getBlogDetail; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ goodLikeBlog; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ blogCategorize; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ subscribe_email; });
__webpack_require__.d(__webpack_exports__, "h", function() { return /* binding */ subscribe_verify; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ blog_createComment; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ get_blogComment; });

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./util/request.ts

const http = external_axios_default.a.create({
  baseURL: 'http://localhost:3003/'
});
http.interceptors.request.use(config => {
  return config;
}, err => Promise.reject(err));
http.interceptors.response.use(res => {
  return res.data;
}, err => Promise.reject(err));
/* harmony default export */ var request = (http);
// CONCATENATED MODULE: ./api/api.ts

// 查找博客列表
const getIndexPageData = params => request.get('/api/web/list_blog', {
  params
}); // 查找博客详情

const getBlogDetail = params => request.get('/api/web/blog_detail', {
  params
});
// 喜欢博客 和查看博客
const goodLikeBlog = data => request.post('/api/web/blog_goodLike', data);
// 获取博客 按年份分类
const blogCategorize = params => request.get('/api/web/blog_categorize', {
  params
});
// 邮箱订阅
const subscribe_email = params => request.post('/api/web/subscribe_email', params);
// 邮箱验证
const subscribe_verify = params => request.post('/api/web/subscribe_verify', params);
//创建博客
const blog_createComment = params => request.post('/api/web/blog_createComment', params); // 获取博客评论

const get_blogComment = params => request.get('/api/web/blog_comment', {
  params
});

/***/ }),

/***/ "Exp3":
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "Fluc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Email; });
const Email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

/***/ }),

/***/ "Gb8u":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("rhhu");
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("nZwT");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _types_response__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("nODP");








const Header = props => {
  const {
    0: pageUOffset,
    1: setPageUOffset
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(0);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();

  const jumpHomePage = e => {
    e.preventDefault();
    const body = document.querySelector('body');
    body.style.overflowY = "";
    router.push('/');
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    if (props.type !== _types_response__WEBPACK_IMPORTED_MODULE_5__[/* headerType */ "a"].blog_detail) {
      return () => ({});
    }

    let rememberPageYOffset = window.pageYOffset;

    const onScroll = e => {
      rememberPageYOffset = window.pageYOffset;
      setPageUOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  });

  const onClickLike = () => props.onOk();

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("header", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.header,
    style: props.type === _types_response__WEBPACK_IMPORTED_MODULE_5__[/* headerType */ "a"].subscribe ? {
      backgroundColor: '#ffffff21'
    } : {},
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.logo,
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("i", {
        className: "web-font",
        onClick: jumpHomePage,
        style: props.type === _types_response__WEBPACK_IMPORTED_MODULE_5__[/* headerType */ "a"].subscribe ? {
          color: '#fff'
        } : {
          color: "black"
        },
        children: "\u5C0F \xB7 \u818F"
      })
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
      className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.title,
      style: pageUOffset < 20 ? {
        display: 'none'
      } : {
        display: 'block'
      },
      children: props.title
    }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
      className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.menuIcon,
      children: [props.logo ? /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__["HeartFilled"], {
        onClick: onClickLike,
        className: props.likeTody ? _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.like : ''
      }) : null, /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("span", {
        className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.img,
        children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("img", {
          src: "/image/4.jpg",
          alt: "",
          onClick: () => router.push('/aboutMe')
        })
      })]
    })]
  });
};

/* harmony default export */ __webpack_exports__["a"] = (Header);

/***/ }),

/***/ "HWFp":
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),

/***/ "Huyj":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"bigBox": "blogDetail_bigBox__1WsBm",
	"mask": "blogDetail_mask__3KY6y",
	"section": "blogDetail_section__2onO2",
	"stuff": "blogDetail_stuff__3R8DV",
	"content": "blogDetail_content__2qLi0",
	"comment": "blogDetail_comment__12k1M",
	"comment_section": "blogDetail_comment_section__b75MY",
	"comment_form": "blogDetail_comment_form__rn2sM",
	"commentInput": "blogDetail_commentInput__3v-4I",
	"subBtn": "blogDetail_subBtn__-uUly",
	"mark": "blogDetail_mark__2YdAi",
	"charts": "blogDetail_charts__1seHz",
	"more": "blogDetail_more__3nbnf",
	"loadingBtn": "blogDetail_loadingBtn__3f6Ne",
	"bottomTest": "blogDetail_bottomTest__2qNxJ",
	"comment_title": "blogDetail_comment_title__1jWh_",
	"scrollbar": "blogDetail_scrollbar__2GjmW",
	"width": "blogDetail_width__3Cl12",
	"comment_user": "blogDetail_comment_user__1STOQ",
	"comment_user_list": "blogDetail_comment_user_list___-HYk",
	"describe": "blogDetail_describe__3PADV",
	"describe_left": "blogDetail_describe_left__25MlE",
	"describe_right": "blogDetail_describe_right__sZBlh",
	"jump": "blogDetail_jump__NoXij"
};


/***/ }),

/***/ "MfSh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("lE8U");
/* harmony import */ var _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_module_scss__WEBPACK_IMPORTED_MODULE_2__);



 // css loading 效果

const LoadingDOM = () => {
  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
    className: _index_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a.loadingBox,
    children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {}), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {})]
  });
};

/* harmony default export */ __webpack_exports__["a"] = (LoadingDOM);

/***/ }),

/***/ "RdOy":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"container": "puzzleVerify_container__2GqEr",
	"fadeInDown": "puzzleVerify_fadeInDown__1-iOw",
	"header": "puzzleVerify_header__3jski",
	"char": "puzzleVerify_char__2pfxg",
	"icon": "puzzleVerify_icon__2KU1g",
	"verify": "puzzleVerify_verify__3paNH",
	"negative": "puzzleVerify_negative__2JQRN",
	"puzzle_lost_box": "puzzleVerify_puzzle_lost_box___wX3N",
	"ver_tips": "puzzleVerify_ver_tips__1whKO",
	"slider": "puzzleVerify_slider__38LbZ",
	"bar": "puzzleVerify_bar__2WDrH",
	"btn": "puzzleVerify_btn__285I-"
};


/***/ }),

/***/ "X5zB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getStaticPaths", function() { return /* binding */ getStaticPaths; });
__webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return /* binding */ getStaticProps; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: ./styles/blogDetail/index.module.scss
var index_module = __webpack_require__("Huyj");
var index_module_default = /*#__PURE__*/__webpack_require__.n(index_module);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: external "marked"
var external_marked_ = __webpack_require__("HWFp");
var external_marked_default = /*#__PURE__*/__webpack_require__.n(external_marked_);

// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__("Exp3");

// EXTERNAL MODULE: ./components/Header/index.tsx
var Header = __webpack_require__("Gb8u");

// EXTERNAL MODULE: ./components/puzzleVerify/index.module.scss
var puzzleVerify_index_module = __webpack_require__("RdOy");
var puzzleVerify_index_module_default = /*#__PURE__*/__webpack_require__.n(puzzleVerify_index_module);

// CONCATENATED MODULE: ./components/puzzleVerify/index.tsx




let saveIntervalX = 0;
let saveIntervalY = 0;

const PuzzleVerify = props => {
  const sliderBtn = Object(external_react_["useRef"])(null);
  const sliderBar = Object(external_react_["useRef"])(null);
  const puzzleBox = Object(external_react_["useRef"])(null);
  const puzzleShow = Object(external_react_["useRef"])(null);
  const puzzle_lost_box = Object(external_react_["useRef"])(null);
  const verTips = Object(external_react_["useRef"])(null);
  const {
    0: moveLeft,
    1: setMoveLeft
  } = Object(external_react_["useState"])(-130);
  const {
    0: verifyStatus,
    1: setVerifyStatus
  } = Object(external_react_["useState"])(false);
  let moveStart = 0;
  Object(external_react_["useEffect"])(() => {
    initBgCanvas();
  }, []);

  const startMove = e => {
    e = e || window.event;
    moveStart = e.pageX || e.targetTouches[0].pageX;
    addMouseMoveListener();
  };

  const moving = e => {
    e = e || window.event;
    const moveX = e.pageX || e.targetTouches[0].pageX; // 线的总长度

    const sliderClientWidth = sliderBar.current.clientWidth; // 移动的距离

    const moveDistance = moveX - moveStart; // btn 按钮移动的最大偏移量
    //  0 > 移动的距离  >  总长度 - 按钮的宽度

    if (moveDistance >= sliderClientWidth - 40 || moveDistance < 0) {
      return;
    } // 图片移动的最偏移量
    // 0> (随机图片的x 位置 + 55 =  图片距离 左边的偏移量) + 移动的距离  > 总长度


    if (saveIntervalX + 55 + moveDistance > sliderClientWidth) {
      return;
    }

    setMoveLeft(moveLeft + moveDistance);
    sliderBtn.current.style.transition = 'inherit';
    puzzle_lost_box.current.style.transition = 'inherit';
    sliderBtn.current.style.left = moveDistance + 'px';
  };

  const endMove = e => {
    const left = puzzle_lost_box.current.style.left.substr(0, 1);
    verTips.current.style.bottom = '0px';

    if (left == 0) {
      setVerifyStatus(true);
      props.verifyResponse(true);
    } else {
      setVerifyStatus(false);
      props.verifyResponse(false);
    }

    removeMouseMoveListener();
    setTimeout(() => {
      sliderBtn.current.style.left = 0 + 'px';
      sliderBtn.current.style.transition = 'left .5s';
      puzzle_lost_box.current.style.transition = 'left .5s';
      verTips.current.style.bottom = '-40px';
      setMoveLeft(-130);
    }, 500);
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min));
  };

  const initBgCanvas = () => {
    const ctx = puzzleBox.current.getContext('2d');
    saveIntervalX = random(0, 70); //  随机x位置

    saveIntervalY = random(25, -25); //  随机y位置

    const d = 55 / 3; // 绘制小方块 /3 

    renderCanvas(puzzleBox.current, saveIntervalX, saveIntervalY, d);
    renderCanvas(puzzleShow.current, saveIntervalX, saveIntervalY, d);
    ctx.restore();
  };

  const renderCanvas = (type, x, y, d) => {
    const canvas = type.getContext('2d');
    canvas.clearRect(0, 0, 260, 160);
    canvas.save();
    canvas.translate(130, 80);

    if (type.id === 'puzzle_box') {
      canvas.globalCompositeOperation = "xor";
      canvas.fillStyle = "#fff";
    }

    canvas.beginPath();
    canvas.moveTo(x, y);
    canvas.lineTo(x + d, y);
    canvas.bezierCurveTo(x + d, y - d, x + 2 * d, y - d, x + 2 * d, y);
    canvas.lineTo(x + 3 * d, y);
    canvas.lineTo(x + 3 * d, y + d);
    canvas.bezierCurveTo(x + 2 * d, y + d, x + 2 * d, y + 2 * d, x + 3 * d, y + 2 * d);
    canvas.lineTo(x + 3 * d, y + 3 * d);
    canvas.lineTo(x, y + 3 * d);
    canvas.closePath();

    if (type.id === 'puzzleShow') {
      canvas.clip();
      canvas.fill();
    } else {
      canvas.strokeStyle = "rgba(0,0,0,0)";
      canvas.stroke();
      canvas.fill();
    }

    canvas.restore();
  };

  const refresh = () => {
    initBgCanvas();
  };

  const addMouseMoveListener = () => {
    document.addEventListener("mousemove", moving);
    document.addEventListener("touchmove", moving);
    document.addEventListener("mouseup", endMove);
    document.addEventListener("touchend", endMove);
  };

  const removeMouseMoveListener = () => {
    document.removeEventListener("mousemove", moving);
    document.removeEventListener("touchmove", moving);
    document.removeEventListener("mouseup", endMove);
    document.removeEventListener("touchend", endMove);
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: puzzleVerify_index_module_default.a.container,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: puzzleVerify_index_module_default.a.header,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        className: puzzleVerify_index_module_default.a.char,
        children: "\u62D6\u52A8\u4E0B\u65B9\u6ED1\u5757\u5B8C\u6210\u62FC\u56FE"
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: puzzleVerify_index_module_default.a.icon,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("i", {
          className: "iconfont icon-shuaxin",
          onClick: refresh
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("i", {
          className: "iconfont icon-close",
          onClick: () => props.close()
        })]
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: puzzleVerify_index_module_default.a.verify,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: puzzleVerify_index_module_default.a.negative,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
          src: "/image/bg.png",
          alt: ""
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("canvas", {
          width: "260",
          height: "160",
          id: "puzzle_box",
          ref: puzzleBox
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: puzzleVerify_index_module_default.a.puzzle_lost_box,
        ref: puzzle_lost_box,
        style: {
          left: moveLeft + 'px'
        },
        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("canvas", {
          width: "260",
          height: "160",
          id: "puzzleShow",
          ref: puzzleShow
        })
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: puzzleVerify_index_module_default.a.ver_tips,
        ref: verTips,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("i", {
          className: `iconfont ${verifyStatus ? 'icon-Success' : 'icon-x'}`
        }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
          children: verifyStatus ? "验证通过" : '验证失败，请移动到正确位置！'
        })]
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: puzzleVerify_index_module_default.a.slider,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: puzzleVerify_index_module_default.a.bar,
        id: "sliderBar",
        ref: sliderBar
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: puzzleVerify_index_module_default.a.btn,
        onMouseDown: startMove,
        onTouchStart: startMove,
        ref: sliderBtn,
        id: "sliderBtn",
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {})]
      })]
    })]
  });
};

/* harmony default export */ var puzzleVerify = (PuzzleVerify);
// EXTERNAL MODULE: ./api/api.ts + 1 modules
var api = __webpack_require__("5KpL");

// EXTERNAL MODULE: ./components/loading/index.tsx
var loading = __webpack_require__("MfSh");

// EXTERNAL MODULE: ./types/response.ts
var response = __webpack_require__("nODP");

// EXTERNAL MODULE: ./util/RegExp.ts
var RegExp = __webpack_require__("Fluc");

// CONCATENATED MODULE: ./pages/[id].tsx















const BlogDetail = props => {
  let section = null;
  const {
    0: comment,
    1: setComment
  } = Object(external_react_["useState"])([]);
  const {
    0: total,
    1: setTotal
  } = Object(external_react_["useState"])(0);
  const {
    0: likeTody,
    1: setLikeTody
  } = Object(external_react_["useState"])(false);
  const {
    0: scrollWidth,
    1: setScrollWidth
  } = Object(external_react_["useState"])('0%');
  const {
    0: commentName,
    1: setCommentName
  } = Object(external_react_["useState"])('');
  const {
    0: commentEmail,
    1: setCommentEmail
  } = Object(external_react_["useState"])('');
  const {
    0: context,
    1: setContext
  } = Object(external_react_["useState"])('');
  const {
    0: errorInfo,
    1: setErrorInfo
  } = Object(external_react_["useState"])('~认真和用心是一种态度, 感谢支持~');
  const {
    0: openValidation,
    1: setValidation
  } = Object(external_react_["useState"])(false);
  const {
    0: pageSize,
    1: setPageSize
  } = Object(external_react_["useState"])(5);
  const {
    0: loadingMore,
    1: SetLoading
  } = Object(external_react_["useState"])(false);
  const {
    blogDetail
  } = props;
  Object(external_react_["useEffect"])(() => {
    section = document.getElementById('section');
    Object(api["f" /* goodLikeBlog */])({
      id: blogDetail.id,
      like: false
    });
    disposeLikeTody();
    window.addEventListener('scroll', scrollBar, false);
    return () => window.removeEventListener('scroll', scrollBar, false);
  }, []); // 获取评论数据

  Object(external_react_["useEffect"])(() => {
    (async () => {
      const {
        success,
        data
      } = await Object(api["e" /* get_blogComment */])({
        id: props.blogDetail.id,
        pageNo: 1,
        pageSize: pageSize
      });
      if (!success) return external_antd_["message"].warn('请求错误---getStaticProps');
      setComment(data.list);
      setTotal(data.total);
    })();
  }, []);

  const scrollBar = () => {
    const absolutely = window.scrollY / section.scrollHeight * 100;
    setScrollWidth(absolutely.toFixed(2) + '%');
  };

  const disposeLikeTody = () => {
    if (!localStorage.getItem('currentLike')) {
      localStorage.setItem('currentLike', JSON.stringify([]));
      setLikeTody(false);
    } else {
      const currentLike = JSON.parse(localStorage.getItem('currentLike'));

      if (currentLike.find(item => item.id === props.blogDetail.id)) {
        setLikeTody(true);
      }
    }
  };

  const renderContent = () => /*#__PURE__*/Object(jsx_runtime_["jsxs"])(jsx_runtime_["Fragment"], {
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h1", {
      children: blogDetail.title
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: index_module_default.a.stuff,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        children: external_moment_default()(blogDetail.createDate).format('YYYY-MM-DD')
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        children: ["\u9605\u8BFB\xA0", blogDetail.viewCount]
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        children: ["\u5B57\u7B26\xA0", blogDetail.number_words]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
        children: "\u8BC4\u8BBA\xA01920"
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        children: ["\u559C\u6B22\xA0", blogDetail.likeCount]
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: index_module_default.a.content,
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: index_module_default.a.blogDetail,
        dangerouslySetInnerHTML: {
          __html: external_marked_default()(blogDetail.content, {
            gfm: true,
            xhtml: false
          })
        }
      })
    })]
  });

  const onOk = () => {
    const {
      id
    } = props.blogDetail;
    const currentLike = JSON.parse(localStorage.getItem('currentLike'));

    if (currentLike.find(item => item.id === id)) {
      setLikeTody(true);
      return external_antd_["message"].warn('你已经点过赞了');
    }

    currentLike.push({
      id,
      todyLike: true
    });
    setLikeTody(true);
    localStorage.setItem('currentLike', JSON.stringify(currentLike));
    Object(api["f" /* goodLikeBlog */])({
      id: blogDetail.id,
      like: true
    });
    external_antd_["message"].success('good.');
  };

  const submitComment = async () => {
    if (commentName.trim() === '') {
      return setErrorInfo('×请留下你的大名.');
    }

    if (!RegExp["a" /* Email */].test(commentEmail.trim())) {
      return setErrorInfo('×请输入正确的邮箱.');
    }

    if (context.trim() === '') {
      return setErrorInfo('×0分作文');
    }

    setValidation(true);
  };

  const inputContext = e => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == 'name') {
      setCommentName(value);
    } else if (name == 'email') {
      setCommentEmail(value);
    }
  };

  const textareaInputContext = e => {
    setContext(e.target.value);
  };

  const renderComment = () => /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: index_module_default.a.comment_user,
    children: comment.map(item => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: index_module_default.a.comment_user_list,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
        className: index_module_default.a.describe,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: index_module_default.a.describe_left,
          children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
            src: "/image/4.jpg",
            alt: ""
          })
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: index_module_default.a.describe_right,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
            children: item.commentName
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
            children: external_moment_default()(item.createTime).format('HH:MM YYYY-MM-DD')
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: index_module_default.a.content,
        children: item.context
      })]
    }, item.id))
  });

  const verifyResponse = async flg => {
    if (!flg) return;
    setTimeout(() => setValidation(false), 600);
    const {
      success
    } = await Object(api["b" /* blog_createComment */])({
      articleId: props.blogDetail.id,
      commentName,
      commentEmail,
      createTime: external_moment_default()(new Date()).format('YYYY-MM-DD HH:MM'),
      context
    });
    if (!success) return;
    setErrorInfo('~认真和用心是一种态度, 感谢支持~');
    setCommentName('');
    setCommentEmail('');
    setContext('');
    const {
      success: commentSuccess,
      data
    } = await Object(api["e" /* get_blogComment */])({
      id: props.blogDetail.id,
      pageNo: 1,
      pageSize: pageSize
    });
    if (!commentSuccess) return;
    setComment(data.list);
    setTotal(data.total);
  };

  const closeVerify = () => {
    setValidation(false);
  }; // 加载更多


  const loadMore = async e => {
    e.stopPropagation();
    SetLoading(true);
    const {
      success,
      data
    } = await Object(api["e" /* get_blogComment */])({
      id: props.blogDetail.id,
      pageNo: 1,
      pageSize: pageSize + 5
    });
    setPageSize(pageSize + 5);
    if (!success) return external_antd_["message"].warn('请求错误');
    SetLoading(false);
    setComment(data.list);
    setTotal(data.total);
  };

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: index_module_default.a.bigBox,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: index_module_default.a.scrollbar,
      style: {
        width: scrollWidth
      }
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])(Header["a" /* default */], {
      logo: true,
      title: blogDetail.title,
      likeTody: likeTody,
      onOk: onOk,
      blogId: blogDetail.id,
      type: response["a" /* headerType */].blog_detail
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("section", {
      className: index_module_default.a.section,
      id: "section",
      children: renderContent()
    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: index_module_default.a.comment,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("section", {
        className: index_module_default.a.comment_section,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: index_module_default.a.comment_form,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: index_module_default.a.commentInput,
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
              type: "text",
              placeholder: "Name",
              value: commentName,
              name: "name",
              onChange: inputContext
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
              type: "text",
              placeholder: "Email",
              value: commentEmail,
              name: "email",
              onChange: inputContext
            })]
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("textarea", {
            placeholder: "\u8BF4\u70B9\u4EC0\u4E48\u5462...",
            name: "context",
            value: context,
            onChange: textareaInputContext
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
            className: index_module_default.a.subBtn,
            children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
              onClick: submitComment,
              children: "SUBMIT"
            }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
              className: index_module_default.a.charts,
              style: errorInfo.length <= 17 ? {
                color: "red"
              } : {
                color: '#909090'
              },
              children: errorInfo
            })]
          })]
        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("h2", {
          className: index_module_default.a.comment_title,
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
            children: "Comment List"
          }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
            children: ["(", total, ")"]
          })]
        }), renderComment(), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
          className: index_module_default.a.more,
          children: total === comment.length ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: index_module_default.a.bottomTest,
            children: "\u5230\u5E95\u4E86"
          }) : loadingMore ? /*#__PURE__*/Object(jsx_runtime_["jsx"])(loading["a" /* default */], {}) : /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: index_module_default.a.loadingBtn,
            onClick: loadMore,
            children: "\u52A0\u8F7D\u66F4\u591A "
          })
        })]
      })
    }), openValidation ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: index_module_default.a.mask,
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(puzzleVerify, {
        verifyResponse: verifyResponse,
        close: closeVerify
      })
    }) : null]
  });
};

async function getStaticPaths() {
  const {
    data,
    success
  } = await Object(api["d" /* getIndexPageData */])();
  if (!success) return external_antd_["message"].warn('请求错误-getStaticPaths');
  const paths = data.list.map(item => ({
    params: {
      id: String(item.id)
    }
  }));
  return {
    paths,
    fallback: false
  };
}
async function getStaticProps({
  params
}) {
  const {
    success,
    data
  } = await Object(api["c" /* getBlogDetail */])({
    id: params.id
  });
  if (!success) return external_antd_["message"].warn('请求错误---getStaticProps');
  return {
    props: {
      blogDetail: data[0]
    }
  };
}
/* harmony default export */ var _id_ = __webpack_exports__["default"] = (BlogDetail);

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "lE8U":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"loadingBox": "loading_loadingBox__11ZFJ",
	"loading": "loading_loading__2KYhm"
};


/***/ }),

/***/ "nODP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return headerType; });
// 响应后端接口的数据格式
// 首页页面博客列表data数据格式
// 处理header 头部类型
let headerType;

(function (headerType) {
  headerType["blog_detail"] = "blog_detail";
  headerType["subscribe"] = "subscribe";
})(headerType || (headerType = {}));

/***/ }),

/***/ "nZwT":
/***/ (function(module, exports) {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ "rhhu":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"header": "Header_header__11G5T",
	"headerShow": "Header_headerShow__3239K",
	"logo": "Header_logo__3XHlx",
	"triangle": "Header_triangle__24g5g",
	"title": "Header_title__EwaWq",
	"menuIcon": "Header_menuIcon__3CqxM",
	"img": "Header_img__2UCSX",
	"like": "Header_like__2WB8b"
};


/***/ }),

/***/ "wy2R":
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });