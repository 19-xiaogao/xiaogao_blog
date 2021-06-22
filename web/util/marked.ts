import marked from "marked";
import hljs from "highlight.js";
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

export default marked;
