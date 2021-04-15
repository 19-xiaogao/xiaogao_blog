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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("gEqT");


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

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

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

/***/ "T9yJ":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"home": "Article_home__hyZPg",
	"bottom": "Article_bottom__3j6PP",
	"year_list": "Article_year_list__1rbn4",
	"month_list": "Article_month_list__269f8",
	"month": "Article_month__sE7Xd",
	"day": "Article_day__2bc_l",
	"day_detail": "Article_day_detail__1Uee5",
	"char": "Article_char__18m8r",
	"item_r": "Article_item_r__3kYsv",
	"img": "Article_img__3A1q1",
	"page": "Article_page__AxUrG"
};


/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "gEqT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "getStaticProps", function() { return /* binding */ getStaticProps; });

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__("wy2R");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// EXTERNAL MODULE: ./components/Header/index.tsx
var Header = __webpack_require__("Gb8u");

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__("4Q3z");

// EXTERNAL MODULE: ./styles/Article/index.module.scss
var index_module = __webpack_require__("T9yJ");
var index_module_default = /*#__PURE__*/__webpack_require__.n(index_module);

// EXTERNAL MODULE: ./api/api.ts + 1 modules
var api = __webpack_require__("5KpL");

// EXTERNAL MODULE: ./types/response.ts
var response = __webpack_require__("nODP");

// CONCATENATED MODULE: ./util/mouthEN.ts
let mouthEN;

(function (mouthEN) {
  mouthEN[mouthEN["Jan"] = 1] = "Jan";
  mouthEN[mouthEN["Feb"] = 2] = "Feb";
  mouthEN[mouthEN["Mar"] = 3] = "Mar";
  mouthEN[mouthEN["Apr"] = 4] = "Apr";
  mouthEN[mouthEN["May"] = 5] = "May";
  mouthEN[mouthEN["Jun"] = 6] = "Jun";
  mouthEN[mouthEN["Jul"] = 7] = "Jul";
  mouthEN[mouthEN["Aug"] = 8] = "Aug";
  mouthEN[mouthEN["\u7396\u6708"] = 9] = "\u7396\u6708";
  mouthEN[mouthEN["Oct"] = 10] = "Oct";
  mouthEN[mouthEN["Nov"] = 11] = "Nov";
  mouthEN[mouthEN["Dec"] = 12] = "Dec";
})(mouthEN || (mouthEN = {}));
// CONCATENATED MODULE: ./pages/article.tsx



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









let pageSize = 10;

const Article = props => {
  const {
    0: blogList,
    1: setBlogList
  } = Object(external_react_["useState"])(props.blogAll);
  const {
    0: bottomChar,
    1: setBottomChar
  } = Object(external_react_["useState"])(false);
  const router = Object(router_["useRouter"])();
  Object(external_react_["useEffect"])(() => {
    // 判断是否出现滚动条
    const hasScrollbar = () => document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight); // 计算分类后数据的总长度


    const disposeArrLength = arr => arr.reduce((i, j) => i.data.length + j.data.length);

    setBottomChar(hasScrollbar());

    const moveBottom = async e => {
      if (props.total === disposeArrLength(blogList)) {
        return setBottomChar(true);
      }

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

      if (scrollTop + windowHeight == scrollHeight) {
        pageSize = pageSize + 5;
        const {
          data,
          success
        } = await Object(api["a" /* blogCategorize */])({
          pageNo: 0,
          pageSize: pageSize
        });
        if (!success) return;
        setBlogList(disposeBlogFiled(data.list));

        if (props.total === data.list.length) {
          return setBottomChar(true);
        }
      }
    };

    window.addEventListener('scroll', moveBottom, false);
    return () => window.removeEventListener('scroll', moveBottom, false);
  }, []);

  const jumpPage = id => {
    router.push(`/${id}`);
  };

  const renderMonth = blog => blog.map((item, index) => /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
    className: index_module_default.a.year_list,
    children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("ul", {
      className: index_module_default.a.month_list,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("li", {
        className: index_module_default.a.month,
        children: item.month
      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("ul", {
        className: index_module_default.a.day,
        children: renderListBlog(item.data)
      })]
    })
  }, index + '1'));

  const renderListBlog = blog => blog.map(item => /*#__PURE__*/Object(jsx_runtime_["jsxs"])("li", {
    className: index_module_default.a.day_detail,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: index_module_default.a.img,
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("img", {
        src: item.imgUrl,
        alt: "",
        onClick: () => jumpPage(item.id)
      })
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
      className: index_module_default.a.char,
      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h3", {
        onClick: () => jumpPage(item.id),
        children: item.title
      }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
        children: [item.likeCount, " LIKE / ", item.viewCount, " READ"]
      })]
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("span", {
      className: index_module_default.a.item_r,
      children: [item.day, "Day"]
    })]
  }, item.id));

  return /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
    className: index_module_default.a.page,
    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Header["a" /* default */], {
      type: response["a" /* headerType */].blog_detail
    }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("section", {
      className: index_module_default.a.home,
      children: [renderMonth(blogList), bottomChar ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: index_module_default.a.bottom,
        children: "\u545C\u545C,\u5DF2\u7ECF\u88AB\u638F\u7A7A\u4E86"
      }) : null]
    })]
  });
};

/* harmony default export */ var article = __webpack_exports__["default"] = (Article);

const disposeBlogFiled = list => {
  const mapAddMouth = list.map(item => _objectSpread(_objectSpread({}, item), {}, {
    day: external_moment_default()(item.createDate).format('DD'),
    createDate: external_moment_default()(item.createDate).format('YYYY-MM-DD'),
    month: external_moment_default()(item.createDate).format('YYYY-MM')
  }));
  const classify = mapAddMouth.reduce((last, item) => {
    if (last[item.month]) {
      last[item.month].push(item);
    } else {
      last[item.month] = [item];
    }

    return last;
  }, {});
  const arr = [];

  for (const iterator in classify) {
    let fistChar = iterator.split('-')[0];
    let lastChar = Number(iterator.split('-')[1]);
    arr.push({
      month: mouthEN[lastChar] + ',' + fistChar,
      data: classify[iterator]
    });
  }

  return arr;
};

const getStaticProps = async () => {
  const {
    data,
    success
  } = await Object(api["a" /* blogCategorize */])({
    pageNo: 1,
    pageSize: pageSize
  });
  if (!success) return;
  return {
    props: {
      blogAll: disposeBlogFiled(data.list),
      total: data.total
    }
  };
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