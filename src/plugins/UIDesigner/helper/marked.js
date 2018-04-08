
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

var rendererMD = new marked.Renderer()
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

function markHtml(htmlCode) {
  return marked('```html\n' + htmlCode + '\n```')
}

function markJson(jsonCode) {
  return marked('```json\n' + jsonCode + '\n```')
}

function markJs(jsCode) {
  return marked('```js\n' + jsCode + '\n```')
}

const markJavascript = markJs

const markVue = markHtml

export default {
  marked,
  markHtml,
  markJson,
  markJavascript,
  markJs,
  markVue
}

export {
  marked,
  markHtml,
  markJson,
  markJavascript,
  markJs,
  markVue
}
