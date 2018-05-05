export default {
  MuAutoComplete: {
    name: 'MuAutoComplete',
    title: 'MuAutoComplete',
    tag: 'mu-auto-complete',
    props: {
      anchorOrigin: {
        name: 'anchorOrigin',
        type: [Object],
        title: 'anchorOrigin',
        default: { vertical: 'bottom', horizontal: 'left' },
        description: '锚点的位置定义，弹出补全列表是以这个点为基准定位'
      },
      targetOrigin: {
        name: 'targetOrigin',
        type: [Object],
        title: 'targetOrigin',
        default: { vertical: 'top', horizontal: 'left' },
        description: '锚点相对于弹出补全列表的位置'
      },
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件, 在滚动时会不断更新弹出框的位置'
      },
      maxHeight: {
        name: 'maxHeight',
        type: [Number],
        title: 'maxHeight',
        description: '弹出选择内容的最大高度, 超过这个高度会显示滚动条'
      },
      dataSource: {
        name: 'dataSource',
        type: [Array],
        title: 'dataSource',
        description: '必须，填充补全列表的数据'
      },
      dataSourceConfig: {
        name: 'dataSourceConfig',
        type: [Object],
        title: 'dataSourceConfig',
        default: { text: 'text', value: 'value' },
        description: 'dataSource 的配置信息，text 显示文本属性名称，value 值的属性名称'
      },
      disableFocusRipple: {
        name: 'disableFocusRipple',
        type: [Boolean],
        title: 'disableFocusRipple',
        default: true,
        description: '将 focus 时波纹效果设置为不可用'
      },
      filter: {
        name: 'filter',
        type: [String, Function],
        title: 'filter',
        default: 'caseSensitiveFilter',
        description: '过滤器配置，用于过滤 dataSource 里的数据，只显示于输入相关的数据。'
      },
      maxSearchResults: {
        name: 'maxSearchResults',
        type: [Number],
        title: 'maxSearchResults',
        description: '最多显示数据的条数'
      },
      openOnFocus: {
        name: 'openOnFocus',
        type: [Boolean],
        title: 'openOnFocus',
        default: false,
        description: '是否在 focus 时显示补全信息列表'
      },
      menuCloseDelay: {
        name: 'menuCloseDelay',
        type: [Number],
        title: 'menuCloseDelay',
        default: 300,
        description: '补全列表关闭的延迟时间，单位：ms'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '输入框的标签'
      },
      labelFloat: {
        name: 'labelFloat',
        type: [Boolean],
        title: 'labelFloat',
        default: false,
        description: '标签是否浮动'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      labelFocusClass: {
        name: 'labelFocusClass',
        type: [String, Object, Array],
        title: 'labelFocusClass',
        description: '输入框获取焦点时标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '输入框是否不可用'
      },
      hintText: {
        name: 'hintText',
        type: [String],
        title: 'hintText',
        description: '提示文字'
      },
      hintTextClass: {
        name: 'hintTextClass',
        type: [String, Object, Array],
        title: 'hintTextClass',
        description: '提示文字样式, 同 class 绑定方式一致'
      },
      helpText: {
        name: 'helpText',
        type: [String],
        title: 'helpText',
        description: '帮助文字'
      },
      helpTextClass: {
        name: 'helpTextClass',
        type: [String, Object, Array],
        title: 'helpTextClass',
        description: '帮助文字样式, 同 class 绑定方式一致'
      },
      errorText: {
        name: 'errorText',
        type: [String],
        title: 'errorText',
        description: '错误提醒文字，如果此参数有值，那么输入框会转为错误的状态, 显示效果将会更改'
      },
      errorColor: {
        name: 'errorColor',
        type: [String],
        title: 'errorColor',
        description: '错误状态的时的颜色，默认为红色'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%, 默认 256px'
      },
      underlineShow: {
        name: 'underlineShow',
        type: [Boolean],
        title: 'underlineShow',
        default: true,
        description: '是否显示底部的横线'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式, 同 class 绑定方式一致'
      },
      underlineFocusClass: {
        name: 'underlineFocusClass',
        type: [String, Object, Array],
        title: 'underlineFocusClass',
        description: '输入框获取焦点时底部横线样式, 同 class 绑定方式一致'
      },
      inputClass: {
        name: 'inputClass',
        type: [String, Object, Array],
        title: 'inputClass',
        description: '输入框样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '输入框的值，可不设置此参数，使用 v-model 指令代替'
      }
    },
    slots: {},
    events: {
      focus: {
        title: 'focus',
        name: 'focus',
        description: '输入框获取焦点事件'
      },
      blur: { title: 'blur', name: 'blur', description: '输入框失去焦点事件' },
      select: {
        title: 'select',
        name: 'select',
        description: '选择补全列表事件, 会传入这条数据和index值，(item, index)'
      },
      input: {
        title: 'input',
        name: 'input',
        description: '当value改变时触发事件，传入value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '用户输入或者选择补全选项时触发事件，传入输入框的 value'
      }
    }
  },
  MuAvatar: {
    name: 'MuAvatar',
    title: 'MuAvatar',
    tag: 'mu-avatar',
    props: {
      backgroundColor: {
        name: 'backgroundColor',
        type: [String],
        title: 'backgroundColor',
        description: '背景色'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '图标和文字的颜色'
      },
      src: {
        name: 'src',
        type: [String],
        title: 'src',
        description: '相当于 img 标签的 src 属性'
      },
      imgClass: {
        name: 'imgClass',
        type: [String, Object, Array],
        title: 'imgClass',
        description: '图片的样式, 同 class 绑定方式一致'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      iconSize: {
        name: 'iconSize',
        type: [Number],
        title: 'iconSize',
        description: '图标的大小'
      },
      size: {
        name: 'size',
        type: [Number],
        title: 'size',
        description: 'avatar 的大小, 默认 40px'
      }
    },
    slots: {
      default: { name: 'default', description: '用于放置 avatar 的文字' }
    },
    events: {}
  },
  MuBadge: {
    name: 'MuBadge',
    title: 'MuBadge',
    tag: 'mu-badge',
    props: {
      content: {
        name: 'content',
        type: [String],
        title: 'content',
        description: '内容文本'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '颜色'
      },
      primary: {
        name: 'primary',
        type: [Boolean],
        title: 'primary',
        default: false,
        description: '颜色是否为主色'
      },
      secondary: {
        name: 'secondary',
        type: [Boolean],
        title: 'secondary',
        default: false,
        description: '颜色是否为强调色'
      },
      circle: {
        name: 'circle',
        type: [Boolean],
        title: 'circle',
        default: false,
        description: '是否为圆形'
      },
      badgeClass: {
        name: 'badgeClass',
        type: [String, Object, Array],
        title: 'badgeClass',
        description: 'badge 样式, 同 class 绑定方式一致'
      }
    },
    slots: {
      content: {
        name: 'content',
        description: '用于分发内容，这个 slot 会覆盖掉 content 属性'
      },
      default: {
        name: 'default',
        description: '分发需要加入徽章的元素或者组件'
      }
    },
    events: {}
  },
  MuBottomNavigation: {
    name: 'MuBottomNavigation',
    title: 'MuBottomNavigation',
    tag: 'mu-bottom-navigation',
    props: {
      shift: {
        name: 'shift',
        type: [Boolean],
        title: 'shift',
        default: false,
        description: '是否使用 shift 模式'
      },
      value: {
        name: 'value',
        type: [],
        title: 'value',
        description: '必需，需要和子组件 bottomNavItem 配合'
      }
    },
    slots: {
      default: { name: 'default', description: '用于放置 bottomNavItem 组件' }
    },
    events: {
      change: {
        title: 'change',
        name: 'change',
        description: '当 value 改变的时触发，参数(value) value 新的value'
      }
    }
  },
  MuBottomSheet: {
    name: 'MuBottomSheet',
    title: 'MuBottomSheet',
    tag: 'mu-bottom-sheet',
    props: {
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否打开'
      },
      sheetClass: {
        name: 'sheetClass',
        type: [String, Object, Array],
        title: 'sheetClass',
        description: 'bottomSheet 样式, 同 class 绑定方式一致'
      },
      overlay: {
        name: 'overlay',
        type: [Boolean],
        title: 'overlay',
        default: true,
        description: '是否显示遮盖层'
      },
      overlayColor: {
        name: 'overlayColor',
        type: [String],
        title: 'overlayColor',
        default: '#000',
        description: '遮盖层的颜色'
      },
      overlayOpacity: {
        name: 'overlayOpacity',
        type: [Number],
        title: 'overlayOpacity',
        default: 0.4,
        description: '遮盖层的透明度'
      }
    },
    slots: { default: { name: 'default', description: '用于放置弹出内容' } },
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: '当点击遮盖层或者按 esc建触发，会触发close的动作作为参数传入，(reason) => {if(reason == \'overlay\') {// 执行关闭动作}}'
      },
      show: {
        title: 'show',
        name: 'show',
        description: '当 bottomSheet 弹出时(动画完成后)触发事件'
      },
      hide: {
        title: 'hide',
        name: 'hide',
        description: '当 bottomSheet 隐藏时(动画完成后)触发事件'
      }
    }
  },
  MuFlatButton: {
    name: 'MuFlatButton',
    title: 'MuFlatButton',
    tag: 'mu-flat-button',
    props: {
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '按钮上的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '按钮上的文字'
      },
      labelPosition: {
        name: 'labelPosition',
        type: [String],
        title: 'labelPosition',
        description: '文字的位置, before 在图标之前，after 在图标之后'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: 'label的样式, 同 class 绑定方式一致'
      },
      primary: {
        name: 'primary',
        type: [Boolean],
        title: 'primary',
        default: false,
        description: '颜色是否为主色'
      },
      secondary: {
        name: 'secondary',
        type: [Boolean],
        title: 'secondary',
        default: false,
        description: '颜色是否为强调色'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '按钮是否不可用'
      },
      type: {
        name: 'type',
        type: [String],
        title: 'type',
        description: '相当于button元素的type属性'
      },
      href: {
        name: 'href',
        type: [String],
        title: 'href',
        description: '相当于 a 标签的 href属性，设置之后会渲染成 a 标签，默认是使用button标签'
      },
      to: {
        name: 'to',
        type: [String, Object],
        title: 'to',
        description: '表示目标路由的链接。设置之后组件会被渲染成router-link, 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。'
      },
      tag: {
        name: 'tag',
        type: [String],
        title: 'tag',
        default: 'a',
        description: '有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。'
      },
      activeClass: {
        name: 'activeClass',
        type: [String],
        title: 'activeClass',
        default: 'router-link-active',
        description: '设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。'
      },
      event: {
        name: 'event',
        type: [String, Array],
        title: 'event',
        default: 'click',
        description: '声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组'
      },
      exact: {
        name: 'exact',
        type: [Boolean],
        title: 'exact',
        description: '"是否激活" 默认类名的依据是 inclusive match （全包含匹配）。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。'
      },
      append: {
        name: 'append',
        type: [Boolean],
        title: 'append',
        description: '设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b'
      },
      replace: {
        name: 'replace',
        type: [Boolean],
        title: 'replace',
        description: '设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。'
      },
      target: {
        name: 'target',
        type: [String],
        title: 'target',
        description: '相当于 a 标签的target属性'
      },
      backgroundColor: {
        name: 'backgroundColor',
        type: [String],
        title: 'backgroundColor',
        description: '按钮背景色'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '按钮颜色'
      },
      hoverColor: {
        name: 'hoverColor',
        type: [String],
        title: 'hoverColor',
        description: '鼠标移上去的背景色'
      },
      rippleColor: {
        name: 'rippleColor',
        type: [String],
        title: 'rippleColor',
        description: '波纹效果的颜色'
      },
      rippleOpacity: {
        name: 'rippleOpacity',
        type: [Number],
        title: 'rippleOpacity',
        description: '波纹效果的透明度'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置 input[type=file] 等特殊的按钮，或者自定义icon、文字'
      }
    },
    events: {
      click: { title: 'click', name: 'click', description: '按钮点击事件' },
      hover: {
        title: 'hover',
        name: 'hover',
        description: '鼠标移到按钮上的事件'
      },
      hoverExit: {
        title: 'hoverExit',
        name: 'hoverExit',
        description: '鼠标移出按钮上的事件'
      },
      keyboardFocus: {
        title: 'keyboardFocus',
        name: 'keyboardFocus',
        description: '键盘使按钮获取焦点的事件，第一个参数为true 时表示获取焦点，为 false 失去焦点, (isFocus)'
      }
    }
  },
  MuRaisedButton: {
    name: 'MuRaisedButton',
    title: 'MuRaisedButton',
    tag: 'mu-raised-button',
    props: {
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '按钮上的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '按钮上的文字'
      },
      labelPosition: {
        name: 'labelPosition',
        type: [String],
        title: 'labelPosition',
        description: '文字的位置, before 在图标之前，after 在图标之后'
      },
      labelClass: {
        name: 'labelClass',
        type: [String],
        title: 'labelClass',
        description: '标签的样式'
      },
      primary: {
        name: 'primary',
        type: [Boolean],
        title: 'primary',
        default: false,
        description: '背景色是否为主色'
      },
      secondary: {
        name: 'secondary',
        type: [Boolean],
        title: 'secondary',
        default: false,
        description: '背景色是否为强调色'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '按钮是否不可用'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%'
      },
      type: {
        name: 'type',
        type: [String],
        title: 'type',
        description: '相当于button元素的type属性'
      },
      href: {
        name: 'href',
        type: [String],
        title: 'href',
        description: '相当于 a 标签的 href属性，设置之后会渲染成 a 标签，默认是使用button标签'
      },
      to: {
        name: 'to',
        type: [String, Object],
        title: 'to',
        description: '表示目标路由的链接。设置之后组件会被渲染成router-link, 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。'
      },
      tag: {
        name: 'tag',
        type: [String],
        title: 'tag',
        default: 'a',
        description: '有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。'
      },
      activeClass: {
        name: 'activeClass',
        type: [String],
        title: 'activeClass',
        default: 'router-link-active',
        description: '设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。'
      },
      event: {
        name: 'event',
        type: [String, Array],
        title: 'event',
        default: 'click',
        description: '声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组'
      },
      exact: {
        name: 'exact',
        type: [Boolean],
        title: 'exact',
        description: '"是否激活" 默认类名的依据是 inclusive match （全包含匹配）。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。'
      },
      append: {
        name: 'append',
        type: [Boolean],
        title: 'append',
        description: '设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b'
      },
      replace: {
        name: 'replace',
        type: [Boolean],
        title: 'replace',
        description: '设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。'
      },
      target: {
        name: 'target',
        type: [String],
        title: 'target',
        description: '相当于 a 标签的target属性'
      },
      backgroundColor: {
        name: 'backgroundColor',
        type: [String],
        title: 'backgroundColor',
        description: '按钮背景色'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '按钮颜色'
      },
      rippleColor: {
        name: 'rippleColor',
        type: [String],
        title: 'rippleColor',
        description: '波纹效果的颜色'
      },
      rippleOpacity: {
        name: 'rippleOpacity',
        type: [Number],
        title: 'rippleOpacity',
        description: '波纹效果的透明度'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置 input[type=file] 等特殊的按钮，或者自定义icon、文字'
      }
    },
    events: {
      click: { title: 'click', name: 'click', description: '按钮点击事件' },
      hover: {
        title: 'hover',
        name: 'hover',
        description: '鼠标移到按钮上的事件'
      },
      hoverExit: {
        title: 'hoverExit',
        name: 'hoverExit',
        description: '鼠标移出按钮上的事件'
      },
      keyboardFocus: {
        title: 'keyboardFocus',
        name: 'keyboardFocus',
        description: '键盘使按钮获取焦点的事件，第一个参数为true 时表示获取焦点，为 false 失去焦点, (isFocus)'
      }
    }
  },
  MuIconButton: {
    name: 'MuIconButton',
    title: 'MuIconButton',
    tag: 'mu-icon-button',
    props: {
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '按钮上的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String],
        title: 'iconClass',
        description: '图标的样式'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '按钮是否不可用'
      },
      type: {
        name: 'type',
        type: [String],
        title: 'type',
        description: '相当于button元素的type属性'
      },
      href: {
        name: 'href',
        type: [String],
        title: 'href',
        description: '相当于 a 标签的 href属性，设置之后会渲染成 a 标签，默认是使用button标签'
      },
      to: {
        name: 'to',
        type: [String, Object],
        title: 'to',
        description: '表示目标路由的链接。设置之后组件会被渲染成router-link, 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。'
      },
      tag: {
        name: 'tag',
        type: [String],
        title: 'tag',
        default: 'a',
        description: '有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。'
      },
      activeClass: {
        name: 'activeClass',
        type: [String],
        title: 'activeClass',
        default: 'router-link-active',
        description: '设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。'
      },
      event: {
        name: 'event',
        type: [String, Array],
        title: 'event',
        default: 'click',
        description: '声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组'
      },
      exact: {
        name: 'exact',
        type: [Boolean],
        title: 'exact',
        description: '"是否激活" 默认类名的依据是 inclusive match （全包含匹配）。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。'
      },
      append: {
        name: 'append',
        type: [Boolean],
        title: 'append',
        description: '设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b'
      },
      replace: {
        name: 'replace',
        type: [Boolean],
        title: 'replace',
        description: '设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。'
      },
      target: {
        name: 'target',
        type: [String],
        title: 'target',
        description: '相当于 a 标签的target属性'
      },
      tooltip: {
        name: 'tooltip',
        type: [String],
        title: 'tooltip',
        description: '当鼠标移上去提示的文字'
      },
      tooltipPosition: {
        name: 'tooltipPosition',
        type: [String],
        title: 'tooltipPosition',
        default: 'bottom-center',
        description: '提示文字的位置, [垂直位置]-[水平位置]，垂直位置: top，middle, bottom; 水平位置: left, center, right'
      },
      touch: {
        name: 'touch',
        type: [Boolean],
        title: 'touch',
        default: false,
        description: '是否为 touch 的样式，一般用在移动端，提示框会大一些'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置 input[type=file] 等特殊的按钮，或者自定义icon'
      }
    },
    events: {
      click: { title: 'click', name: 'click', description: '按钮点击事件' },
      hover: {
        title: 'hover',
        name: 'hover',
        description: '鼠标移到按钮上的事件'
      },
      hoverExit: {
        title: 'hoverExit',
        name: 'hoverExit',
        description: '鼠标移出按钮上的事件'
      },
      keyboardFocus: {
        title: 'keyboardFocus',
        name: 'keyboardFocus',
        description: '键盘使按钮获取焦点的事件，第一个参数为true 时表示获取焦点，为 false 失去焦点, (isFocus)'
      }
    }
  },
  MuFloatingActionButton: {
    name: 'MuFloatingActionButton',
    title: 'MuFloatingActionButton',
    tag: 'mu-floating-action-button',
    props: {
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '按钮上的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String],
        title: 'iconClass',
        description: '图标的样式'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '按钮是否不可用'
      },
      type: {
        name: 'type',
        type: [String],
        title: 'type',
        description: '相当于button元素的type属性'
      },
      href: {
        name: 'href',
        type: [String],
        title: 'href',
        description: '相当于 a 标签的 href属性，设置之后会渲染成 a 标签，默认是使用button标签'
      },
      to: {
        name: 'to',
        type: [String, Object],
        title: 'to',
        description: '表示目标路由的链接。设置之后组件会被渲染成router-link, 当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。'
      },
      tag: {
        name: 'tag',
        type: [String],
        title: 'tag',
        default: 'a',
        description: '有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。'
      },
      activeClass: {
        name: 'activeClass',
        type: [String],
        title: 'activeClass',
        default: 'router-link-active',
        description: '设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 linkActiveClass 来全局配置。'
      },
      event: {
        name: 'event',
        type: [String, Array],
        title: 'event',
        default: 'click',
        description: '声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组'
      },
      exact: {
        name: 'exact',
        type: [Boolean],
        title: 'exact',
        description: '"是否激活" 默认类名的依据是 inclusive match （全包含匹配）。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。'
      },
      append: {
        name: 'append',
        type: [Boolean],
        title: 'append',
        description: '设置 append 属性后，则在当前（相对）路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b'
      },
      replace: {
        name: 'replace',
        type: [Boolean],
        title: 'replace',
        description: '设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。'
      },
      target: {
        name: 'target',
        type: [String],
        title: 'target',
        description: '相当于 a 标签的target属性'
      },
      secondary: {
        name: 'secondary',
        type: [Boolean],
        title: 'secondary',
        default: false,
        description: '颜色是否为强调色'
      },
      mini: {
        name: 'mini',
        type: [Boolean],
        title: 'mini',
        default: false,
        description: '如果设置为 true, 按钮将变得更小'
      },
      backgroundColor: {
        name: 'backgroundColor',
        type: [String],
        title: 'backgroundColor',
        default: '如果设置为true，按钮背景色变为强调色',
        description: '按钮背景色'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置 input[type=file] 等特殊的按钮，或者自定义icon'
      }
    },
    events: {
      click: { title: 'click', name: 'click', description: '按钮点击事件' },
      hover: {
        title: 'hover',
        name: 'hover',
        description: '鼠标移到按钮上的事件'
      },
      hoverExit: {
        title: 'hoverExit',
        name: 'hoverExit',
        description: '鼠标移出按钮上的事件'
      },
      keyboardFocus: {
        title: 'keyboardFocus',
        name: 'keyboardFocus',
        description: '键盘使按钮获取焦点的事件，第一个参数为true 时表示获取焦点，为 false 失去焦点, (isFocus)'
      }
    }
  },
  MuCard: {
    name: 'MuCard',
    title: 'MuCard',
    tag: 'mu-card',
    props: {},
    slots: { default: { name: 'default', description: '用于放置子组件' } },
    events: {}
  },
  MuChip: {
    name: 'MuChip',
    title: 'MuChip',
    tag: 'mu-chip',
    props: {
      showDelete: {
        name: 'showDelete',
        type: [Boolean],
        title: 'showDelete',
        default: false,
        description: '是否显示删除图标'
      },
      deleteIconClass: {
        name: 'deleteIconClass',
        type: [String],
        title: 'deleteIconClass',
        description: '删除图标的样式'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '设为true则不可点击'
      },
      backgroundColor: {
        name: 'backgroundColor',
        type: [String],
        title: 'backgroundColor',
        description: '背景色'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '文字的颜色'
      }
    },
    slots: {
      default: { name: 'default', description: '用于放置 avatar 和简短的文字' }
    },
    events: {
      delete: {
        title: 'delete',
        name: 'delete',
        description: '点击删除图标后触发'
      },
      click: { title: 'click', name: 'click', description: '点击时候触发' }
    }
  },
  MuDatePicker: {
    name: 'MuDatePicker',
    title: 'MuDatePicker',
    tag: 'mu-date-picker',
    props: {
      dateTimeFormat: {
        name: 'dateTimeFormat',
        type: [Object],
        title: 'dateTimeFormat',
        default: '内置 dateTimeFormat',
        description: '时间格式化对像，需要有以下属性:\n\nformatDisplay 用于格式化日期选择框头部显示;\nformatMonth 用于格式化日期选择框月份显示。'
      },
      autoOk: {
        name: 'autoOk',
        type: [Boolean],
        title: 'autoOk',
        default: false,
        description: '是否在选择日期后自动确定, 设为true则不显示确定按钮'
      },
      okLabel: {
        name: 'okLabel',
        type: [String],
        title: 'okLabel',
        default: '确定',
        description: '确定按钮的文字'
      },
      cancelLabel: {
        name: 'cancelLabel',
        type: [String],
        title: 'cancelLabel',
        default: '确定',
        description: '取消按钮的文字'
      },
      container: {
        name: 'container',
        type: [String],
        title: 'container',
        default: 'dialog',
        description: 'dialog/inline, 弹出日期的方式， dialog 弹出框， inline 内联弹出显示'
      },
      disableYearSelection: {
        name: 'disableYearSelection',
        type: [Boolean],
        title: 'disableYearSelection',
        default: false,
        description: '设置为 ture, 则不可选择年份'
      },
      firstDayOfWeek: {
        name: 'firstDayOfWeek',
        type: [Number],
        title: 'firstDayOfWeek',
        default: 1,
        description: '那一天作为一个星期的开始， 默认星期一， 有些情况可能会设置成星期日(0)'
      },
      mode: {
        name: 'mode',
        type: [String],
        title: 'mode',
        default: 'portrait',
        description: 'portrait 竖屏显示， landscape 横屏显示'
      },
      shouldDisableDate: {
        name: 'shouldDisableDate',
        type: [Function],
        title: 'shouldDisableDate',
        description: '判断日期是否不可用的函数'
      },
      format: {
        name: 'format',
        type: [String],
        title: 'format',
        default: 'YYYY-MM-DD',
        description: '时间格式化方式'
      },
      maxDate: {
        name: 'maxDate',
        type: [Date, String],
        title: 'maxDate',
        description: '可选择的最大日期, 需要符合 format 参数的格式'
      },
      minDate: {
        name: 'minDate',
        type: [Date, String],
        title: 'minDate',
        description: '可选择的最小日期, 需要符合 format 参数的格式'
      },
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: 'input 的 name 属性'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '日期选择框的标签'
      },
      labelFloat: {
        name: 'labelFloat',
        type: [Boolean],
        title: 'labelFloat',
        default: false,
        description: '标签是否浮动'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      labelFocusClass: {
        name: 'labelFocusClass',
        type: [String, Object, Array],
        title: 'labelFocusClass',
        description: '输入框获取焦点时标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '日期选择框是否不可用'
      },
      hintText: {
        name: 'hintText',
        type: [String],
        title: 'hintText',
        description: '提示文字'
      },
      hintTextClass: {
        name: 'hintTextClass',
        type: [String, Object, Array],
        title: 'hintTextClass',
        description: '提示文字样式, 同 class 绑定方式一致'
      },
      helpText: {
        name: 'helpText',
        type: [String],
        title: 'helpText',
        description: '帮助文字'
      },
      helpTextClass: {
        name: 'helpTextClass',
        type: [String, Object, Array],
        title: 'helpTextClass',
        description: '帮助文字样式, 同 class 绑定方式一致'
      },
      errorText: {
        name: 'errorText',
        type: [String],
        title: 'errorText',
        description: '错误提醒文字，如果此参数有值，那么日期选择框会转为错误的状态, 显示效果将会更改'
      },
      errorColor: {
        name: 'errorColor',
        type: [String],
        title: 'errorColor',
        description: '错误状态的时的颜色，默认为红色'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%, 默认 256px'
      },
      underlineShow: {
        name: 'underlineShow',
        type: [Boolean],
        title: 'underlineShow',
        default: true,
        description: '是否显示底部的横线'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式, 同 class 绑定方式一致'
      },
      underlineFocusClass: {
        name: 'underlineFocusClass',
        type: [String, Object, Array],
        title: 'underlineFocusClass',
        description: '输入框获取焦点时底部横线样式, 同 class 绑定方式一致'
      },
      inputClass: {
        name: 'inputClass',
        type: [String, Object, Array],
        title: 'inputClass',
        description: '输入框样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '日期选择框的值，可不设置此参数，使用 v-model 指令代替'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: 'value 发生改变触发的事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '由于用户行为(点击确定按钮)导致 value 值改变时触发事件, 传入 value 属性值'
      }
    }
  },
  MuDialog: {
    name: 'MuDialog',
    title: 'MuDialog',
    tag: 'mu-dialog',
    props: {
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否打开'
      },
      dialogClass: {
        name: 'dialogClass',
        type: [String, Object, Array],
        title: 'dialogClass',
        description: 'dialog 样式, 同 class 绑定方式一致'
      },
      title: {
        name: 'title',
        type: [String],
        title: 'title',
        description: '对话框的标题'
      },
      titleClass: {
        name: 'titleClass',
        type: [String, Object, Array],
        title: 'titleClass',
        description: '标题栏样式, 同 class 绑定方式一致'
      },
      bodyClass: {
        name: 'bodyClass',
        type: [String, Object, Array],
        title: 'bodyClass',
        description: '内容区样式, 同 class 绑定方式一致'
      },
      actionsContainerClass: {
        name: 'actionsContainerClass',
        type: [String, Object, Array],
        title: 'actionsContainerClass',
        description: '操作按钮容器样式, 同 class 绑定方式一致'
      },
      scrollable: {
        name: 'scrollable',
        type: [Boolean],
        title: 'scrollable',
        default: false,
        description: '内容是否可以滚动'
      }
    },
    slots: {
      title: { name: 'title', description: '用于自定义标题栏' },
      actions: { name: 'actions', description: '用于放置底部操作按钮' },
      default: { name: 'default', description: '对话框的内容部分' }
    },
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: '当点击遮盖层或者按下esc键时触发该事件，会传入一个 reason 作为参数，javascript\n (reason) => console.log(reason)'
      },
      show: {
        title: 'show',
        name: 'show',
        description: '当 dialog 显示时(动画完成后)触发事件'
      },
      hide: {
        title: 'hide',
        name: 'hide',
        description: '当 dialog 隐藏时(动画完成后)触发事件'
      }
    }
  },
  MuDivider: {
    name: 'MuDivider',
    title: 'MuDivider',
    tag: 'mu-divider',
    props: {
      inset: {
        name: 'inset',
        type: [Boolean],
        title: 'inset',
        default: false,
        description: '设置为true，将 margin-left 设为 72px'
      },
      shallowInset: {
        name: 'shallowInset',
        type: [Boolean],
        title: 'shallowInset',
        default: false,
        description: '设置为true，将 margin-left 设为 16px'
      }
    },
    slots: {},
    events: {}
  },
  MuDrawer: {
    name: 'MuDrawer',
    title: 'MuDrawer',
    tag: 'mu-drawer',
    props: {
      width: {
        name: 'width',
        type: [Number, String],
        title: 'width',
        description: 'drawer 的宽度'
      },
      zDepth: {
        name: 'zDepth',
        type: [Number],
        title: 'zDepth',
        default: 2,
        description: '阴影的深度'
      },
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否打开'
      },
      docked: {
        name: 'docked',
        type: [Boolean],
        title: 'docked',
        default: true,
        description: '是否固定 drawer， 设为 true， 将不会显示遮盖层，也不会触发 close 事件'
      },
      right: {
        name: 'right',
        type: [Boolean],
        title: 'right',
        default: false,
        description: '是否从右边弹出'
      }
    },
    slots: { default: { name: 'default', description: 'drawer 的内容放置' } },
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: '当点击遮盖层或者按下esc键时触发该事件，会传入一个 reason 作为参数，javascript\n (reason) => console.log(reason)'
      },
      show: {
        title: 'show',
        name: 'show',
        description: '当 drawer 弹出时(动画完成后)触发事件'
      },
      hide: {
        title: 'hide',
        name: 'hide',
        description: '当 drawer 隐藏时(动画完成后)触发事件'
      }
    }
  },
  MuGridList: {
    name: 'MuGridList',
    title: 'MuGridList',
    tag: 'mu-grid-list',
    props: {
      cellHeight: {
        name: 'cellHeight',
        type: [Number],
        title: 'cellHeight',
        default: 180,
        description: '每一个网格的高度'
      },
      cols: {
        name: 'cols',
        type: [Number],
        title: 'cols',
        default: 2,
        description: '每一行的列数'
      },
      padding: {
        name: 'padding',
        type: [Number],
        title: 'padding',
        default: 4,
        description: '每一个网的 padding 值'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用于放置子组件 gridTile 或者 subHeader'
      }
    },
    events: {}
  },
  MuIcon: {
    name: 'MuIcon',
    title: 'MuIcon',
    tag: 'mu-icon',
    props: {
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: 'icon的名称，不同的value 对应不同的icon， 可以去图表集中查找'
      },
      size: {
        name: 'size',
        type: [Number],
        title: 'size',
        default: 24,
        description: '图标的大小'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '图表的颜色'
      }
    },
    slots: {},
    events: {}
  },
  MuList: {
    name: 'MuList',
    title: 'MuList',
    tag: 'mu-list',
    props: {
      value: {
        name: 'value',
        type: [],
        title: 'value',
        description: '需要和子组件 listItem 配合使用时生效'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置 listItem 、 subHeader 、 divider 等组件'
      }
    },
    events: {
      change: {
        title: 'change',
        name: 'change',
        description: '当 value 需要被改变时触发'
      },
      itemClick: {
        title: 'itemClick',
        name: 'itemClick',
        description: 'listItem 组件被点击时触发, 会传入 listItem 组件对象'
      }
    }
  },
  MuMenu: {
    name: 'MuMenu',
    title: 'MuMenu',
    tag: 'mu-menu',
    props: {
      desktop: {
        name: 'desktop',
        type: [Boolean],
        title: 'desktop',
        default: false,
        description: '设置为 true, 菜单将被调整为桌面版的样式，缩小高度和调整padding'
      },
      multiple: {
        name: 'multiple',
        type: [Boolean],
        title: 'multiple',
        default: false,
        description: '是否可以多选'
      },
      autoWidth: {
        name: 'autoWidth',
        type: [Boolean],
        title: 'autoWidth',
        default: true,
        description: '设置为 true 会根据菜单内容自动设置宽度'
      },
      width: {
        name: 'width',
        type: [String, Number],
        title: 'width',
        description: '菜单宽度'
      },
      maxHeight: {
        name: 'maxHeight',
        type: [Number],
        title: 'maxHeight',
        description: '菜单的最大高度'
      },
      disableAutoFocus: {
        name: 'disableAutoFocus',
        type: [Boolean],
        title: 'disableAutoFocus',
        default: false,
        description: '是否关闭菜单项的自动获取焦点'
      },
      initiallyKeyboardFocused: {
        name: 'initiallyKeyboardFocused',
        type: [Boolean],
        title: 'initiallyKeyboardFocused',
        default: false,
        description: '初始化时是否获取焦点'
      },
      listClass: {
        name: 'listClass',
        type: [String, Object, Array],
        title: 'listClass',
        description: '菜单列表部分样式'
      },
      value: {
        name: 'value',
        type: [],
        title: 'value',
        description: '设置以后菜单将为可选择的菜单，当菜单项的value 和 当前 value相等，则菜单项为被选中状态'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置menuItem 、 subHeader 、 divider 等组件'
      }
    },
    events: {
      itemClick: {
        title: 'itemClick',
        name: 'itemClick',
        description: '当菜单项点击时触发事件,会传入 menuItem 组件对象'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '当value改变时触发事件，会传入新的 value'
      }
    }
  },
  MuIconMenu: {
    name: 'MuIconMenu',
    title: 'MuIconMenu',
    tag: 'mu-icon-menu',
    props: {
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示的按钮的图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标样式，同 class 绑定方式一致'
      },
      menuClass: {
        name: 'menuClass',
        type: [String, Object, Array],
        title: 'menuClass',
        description: '菜单样式，同 class 绑定方式一致'
      },
      menuListClass: {
        name: 'menuListClass',
        type: [String, Object, Array],
        title: 'menuListClass',
        description: '菜单列表部分样式，同 class 绑定方式一致'
      },
      multiple: {
        name: 'multiple',
        type: [Boolean],
        title: 'multiple',
        default: false,
        description: '是否可以多选'
      },
      desktop: {
        name: 'desktop',
        type: [Boolean],
        title: 'desktop',
        default: false,
        description: '设置为 true, 菜单将被调整为桌面版的样式，缩小高度和调整padding'
      },
      maxHeight: {
        name: 'maxHeight',
        type: [Number],
        title: 'maxHeight',
        description: '最大高度，超出则显示滚动条'
      },
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否显示菜单'
      },
      itemClickClose: {
        name: 'itemClickClose',
        type: [Boolean],
        title: 'itemClickClose',
        default: true,
        description: '是否在点击菜单项之后关闭'
      },
      anchorOrigin: {
        name: 'anchorOrigin',
        type: [Object],
        title: 'anchorOrigin',
        default: { vertical: 'top', horizontal: 'left' },
        description: '锚点的位置'
      },
      targetOrigin: {
        name: 'targetOrigin',
        type: [Object],
        title: 'targetOrigin',
        default: { vertical: 'top', horizontal: 'left' },
        description: '目标的的位置'
      },
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件, 在滚动时会不断更新弹出框的位置'
      },
      tooltip: {
        name: 'tooltip',
        type: [String],
        title: 'tooltip',
        description: '工具提示文本'
      },
      tooltipPosition: {
        name: 'tooltipPosition',
        type: [String],
        title: 'tooltipPosition',
        default: 'bottom-center',
        description: '提示文字文字, [垂直位置]-[水平位置]，垂直位置: top，middle, bottom; 水平位置: left, center, right'
      },
      value: {
        name: 'value',
        type: [],
        title: 'value',
        description: '设置以后菜单将为可选择的菜单，当菜单项的value 和 当前 value相等，则菜单项为被选中状态'
      }
    },
    slots: {
      icon: { name: 'icon', description: '用来放置图标' },
      default: {
        name: 'default',
        description: '用来放置menuItem 、 subHeader 、 divider 等组件'
      }
    },
    events: {
      itemClick: {
        title: 'itemClick',
        name: 'itemClick',
        description: '当菜单项点击时触发事件,会传入 menuItem 组件对象'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '当value改变时触发事件，会传入新的 value'
      },
      open: { title: 'open', name: 'open', description: '菜单打开时事件' },
      close: { title: 'close', name: 'close', description: '菜单关闭时事件' }
    }
  },
  MuDropDownMenu: {
    name: 'MuDropDownMenu',
    title: 'MuDropDownMenu',
    tag: 'mu-dropdown-menu',
    props: {
      autoWidth: {
        name: 'autoWidth',
        type: [Boolean],
        title: 'autoWidth',
        default: false,
        description: '是否自动计算菜单宽度'
      },
      maxHeight: {
        name: 'maxHeight',
        type: [Number],
        title: 'maxHeight',
        description: '菜单最大高度'
      },
      multiple: {
        name: 'multiple',
        type: [Boolean],
        title: 'multiple',
        default: false,
        description: '是否可以多选'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '设置为 true， 将不可使用'
      },
      openImmediately: {
        name: 'openImmediately',
        type: [Boolean],
        title: 'openImmediately',
        default: false,
        description: '是否在初始化的时候打开菜单'
      },
      anchorOrigin: {
        name: 'anchorOrigin',
        type: [Object],
        title: 'anchorOrigin',
        default: { vertical: 'top', horizontal: 'left' },
        description: '锚点的位置'
      },
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件, 在滚动时会不断更新弹出框的位置'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '文字样式，同 class 绑定方式一致'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标样式，同 class 绑定方式一致'
      },
      menuClass: {
        name: 'menuClass',
        type: [String, Object, Array],
        title: 'menuClass',
        description: '菜单样式，同 class 绑定方式一致'
      },
      menuListClass: {
        name: 'menuListClass',
        type: [String, Object, Array],
        title: 'menuListClass',
        description: '菜单列表部分样式，同 class 绑定方式一致'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式，同 class 绑定方式一致'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置menuItem 、 subHeader 、 divider 等组件'
      }
    },
    events: {
      change: {
        title: 'change',
        name: 'change',
        description: '当value改变时触发事件，会传入新的 value'
      },
      open: { title: 'open', name: 'open', description: '菜单打开时事件' },
      close: { title: 'close', name: 'close', description: '菜单关闭时事件' }
    }
  },
  MuPaper: {
    name: 'MuPaper',
    title: 'MuPaper',
    tag: 'mu-paper',
    props: {
      circle: {
        name: 'circle',
        type: [Boolean],
        title: 'circle',
        default: false,
        description: '是否为圆形的纸片'
      },
      rounded: {
        name: 'rounded',
        type: [Boolean],
        title: 'rounded',
        default: true,
        description: '是否为圆角的纸片'
      },
      zDepth: {
        name: 'zDepth',
        type: [Number],
        title: 'zDepth',
        default: 1,
        description: '1-6, 纸片的阴影程度'
      }
    },
    slots: { default: { name: 'default', description: '内容部分' } },
    events: {}
  },
  MuPopover: {
    name: 'MuPopover',
    title: 'MuPopover',
    tag: 'mu-popover',
    props: {
      trigger: {
        name: 'trigger',
        type: [Element],
        title: 'trigger',
        description: '触发popover 的元素，需要根据此元素的位置计算弹出的位置'
      },
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否打开'
      },
      popoverClass: {
        name: 'popoverClass',
        type: [String, Object, Array],
        title: 'popoverClass',
        description: 'popover 样式, 同 class 绑定方式一致'
      },
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件, 在滚动时会不断更新弹出框的位置'
      },
      autoPosition: {
        name: 'autoPosition',
        type: [Boolean],
        title: 'autoPosition',
        default: true,
        description: '是否自动计算位置'
      },
      anchorOrigin: {
        name: 'anchorOrigin',
        type: [Object],
        title: 'anchorOrigin',
        default: { vertical: 'bottom', horizontal: 'left' },
        description: '锚点的位置，会根据此点的位置计算弹出的位置'
      },
      targetOrigin: {
        name: 'targetOrigin',
        type: [Object],
        title: 'targetOrigin',
        default: { vertical: 'top', horizontal: 'left' },
        description: '锚点相对于弹出内容的位置，根据位置计算弹出的位置'
      },
      overlay: {
        name: 'overlay',
        type: [Boolean],
        title: 'overlay',
        default: false,
        description: '是否显示遮盖层'
      },
      overlayOpacity: {
        name: 'overlayOpacity',
        type: [Number],
        title: 'overlayOpacity',
        default: 0.01,
        description: '遮盖层透明度'
      },
      overlayColor: {
        name: 'overlayColor',
        type: [String],
        title: 'overlayColor',
        default: '#000',
        description: '遮盖层的位置'
      }
    },
    slots: { default: { name: 'default', description: '内容部分' } },
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: '当需要关闭时触发此事件，会传入一个 reason （关闭的原因） 作为参数， \n\noverlay: 点击了遮盖层; \noverflow: 滚动出窗口范围; \nclickOutSide: 点击了其它地方; \nesc: 按下 ESC 键.'
      },
      show: {
        title: 'show',
        name: 'show',
        description: '当 popover 显示时(动画完成后)触发事件'
      },
      hide: {
        title: 'hide',
        name: 'hide',
        description: '当 popover 隐藏时(动画完成后)触发事件'
      }
    }
  },
  MuLinearProgress: {
    name: 'MuLinearProgress',
    title: 'MuLinearProgress',
    tag: 'mu-linear-progress',
    props: {
      mode: {
        name: 'mode',
        type: [String],
        title: 'mode',
        default: 'indeterminate',
        description: '进度指示器的模式， indeterminate 不确定进度模式，这时 value、min、max 无效, determinate 需要通过改变value值来改变进度显示'
      },
      value: {
        name: 'value',
        type: [Number],
        title: 'value',
        description: '进度条的 value 值'
      },
      max: {
        name: 'max',
        type: [Number],
        title: 'max',
        default: 100,
        description: '最大值'
      },
      min: {
        name: 'min',
        type: [Number],
        title: 'min',
        default: 0,
        description: '最小值'
      },
      size: {
        name: 'size',
        type: [Number],
        title: 'size',
        description: '进度条的大小(高度)'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '进度条的颜色'
      }
    },
    slots: {},
    events: {}
  },
  MuCircularProgress: {
    name: 'MuCircularProgress',
    title: 'MuCircularProgress',
    tag: 'mu-circular-progress',
    props: {
      mode: {
        name: 'mode',
        type: [String],
        title: 'mode',
        default: 'indeterminate',
        description: '进度指示器的模式， indeterminate 不确定进度模式，这时 value、min、max 无效, determinate 需要通过改变value值来改变进度显示'
      },
      value: {
        name: 'value',
        type: [Number],
        title: 'value',
        description: '进度指示器的 value 值'
      },
      max: {
        name: 'max',
        type: [Number],
        title: 'max',
        default: 100,
        description: '最大值'
      },
      min: {
        name: 'min',
        type: [Number],
        title: 'min',
        default: 0,
        description: '最小值'
      },
      size: {
        name: 'size',
        type: [Number],
        title: 'size',
        description: '圆形的大小'
      },
      strokeWidth: {
        name: 'strokeWidth',
        type: [Number],
        title: 'strokeWidth',
        default: 3,
        description: '圆形线的宽度'
      },
      color: {
        name: 'color',
        type: [String],
        title: 'color',
        description: '圆形线的颜色'
      }
    },
    slots: {},
    events: {}
  },
  MuSelectField: {
    name: 'MuSelectField',
    title: 'MuSelectField',
    tag: 'mu-select-field',
    props: {
      autoWidth: {
        name: 'autoWidth',
        type: [Boolean],
        title: 'autoWidth',
        default: false,
        description: '是否自动计算菜单宽度'
      },
      maxHeight: {
        name: 'maxHeight',
        type: [Number],
        title: 'maxHeight',
        description: '菜单最大高度'
      },
      multiple: {
        name: 'multiple',
        type: [Boolean],
        title: 'multiple',
        default: false,
        description: '是否可以多选'
      },
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: 'input 的 name 属性'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '下拉框的标签'
      },
      labelFloat: {
        name: 'labelFloat',
        type: [Boolean],
        title: 'labelFloat',
        default: false,
        description: '标签是否浮动'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      labelFocusClass: {
        name: 'labelFocusClass',
        type: [String, Object, Array],
        title: 'labelFocusClass',
        description: '输入框获取焦点时标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '下拉框是否不可用'
      },
      hintText: {
        name: 'hintText',
        type: [String],
        title: 'hintText',
        description: '提示文字'
      },
      hintTextClass: {
        name: 'hintTextClass',
        type: [String, Object, Array],
        title: 'hintTextClass',
        description: '提示文字样式, 同 class 绑定方式一致'
      },
      helpText: {
        name: 'helpText',
        type: [String],
        title: 'helpText',
        description: '帮助文字'
      },
      helpTextClass: {
        name: 'helpTextClass',
        type: [String, Object, Array],
        title: 'helpTextClass',
        description: '帮助文字样式, 同 class 绑定方式一致'
      },
      errorText: {
        name: 'errorText',
        type: [String],
        title: 'errorText',
        description: '错误提醒文字，如果此参数有值，那么下拉框会转为错误的状态, 显示效果将会更改'
      },
      errorColor: {
        name: 'errorColor',
        type: [String],
        title: 'errorColor',
        description: '错误状态的时的颜色，默认为红色'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%, 默认 256px'
      },
      underlineShow: {
        name: 'underlineShow',
        type: [Boolean],
        title: 'underlineShow',
        default: true,
        description: '是否显示底部的横线'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式, 同 class 绑定方式一致'
      },
      underlineFocusClass: {
        name: 'underlineFocusClass',
        type: [String, Object, Array],
        title: 'underlineFocusClass',
        description: '输入框获取焦点时底部横线样式, 同 class 绑定方式一致'
      },
      dropDownIconClass: {
        name: 'dropDownIconClass',
        type: [String, Object, Array],
        title: 'dropDownIconClass',
        description: '下拉图标样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '下拉框的值，可不设置此参数，使用 v-model 指令代替'
      },
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件, 在滚动时会不断更新弹出框的位置'
      },
      separator: {
        name: 'separator',
        type: [String],
        title: 'separator',
        default: ',',
        description: '分隔符'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用来放置menuItem 、 subHeader 、 divider 等组件'
      }
    },
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: 'value 发生改变触发的事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '由于用户选择是value改变时触发事件，传入 value 属性值'
      },
      open: { title: 'open', name: 'open', description: '下拉菜单打开时事件' },
      close: {
        title: 'close',
        name: 'close',
        description: '下拉菜单关闭时事件'
      }
    }
  },
  MuCheckbox: {
    name: 'MuCheckbox',
    title: 'MuCheckbox',
    tag: 'mu-checkbox',
    props: {
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: '相当于 input[type=checkbox] 元素的 name 属性'
      },
      nativeValue: {
        name: 'nativeValue',
        type: [String],
        title: 'nativeValue',
        description: '相当于 input[type=checkbox] 元素的 value 属性'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '显示的标签文字'
      },
      labelLeft: {
        name: 'labelLeft',
        type: [Boolean],
        title: 'labelLeft',
        default: false,
        description: '标签文字是否在左边，默认在右边'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '设置为 true 后复选框将不可用'
      },
      uncheckIcon: {
        name: 'uncheckIcon',
        type: [String],
        title: 'uncheckIcon',
        default: 'check_box_outline_blank',
        description: '未选中时显示的icon, 必须在 material design icon 库中选择'
      },
      checkedIcon: {
        name: 'checkedIcon',
        type: [String],
        title: 'checkedIcon',
        default: 'check_box',
        description: '已选中时显示的icon, 必须在 material design icon 库中选择'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '用来使用v-model控制'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: '当value属性发生改变时触发事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '同 input[type=checkbox] 元素的change事件一致，传入 value 属性值'
      }
    }
  },
  MuRadio: {
    name: 'MuRadio',
    title: 'MuRadio',
    tag: 'mu-radio',
    props: {
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: '相当于 input[type=radio] 元素的 name 属性'
      },
      nativeValue: {
        name: 'nativeValue',
        type: [String],
        title: 'nativeValue',
        description: '相当于 input[type=radio] 元素的 value 属性'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '显示的标签文字'
      },
      labelLeft: {
        name: 'labelLeft',
        type: [Boolean],
        title: 'labelLeft',
        default: false,
        description: '标签文字是否在左边，默认在右边'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '设置为 true 后 radio 将不可用'
      },
      uncheckIcon: {
        name: 'uncheckIcon',
        type: [String],
        title: 'uncheckIcon',
        default: 'check_box_outline_blank',
        description: '未选中时显示的icon, 必须在 material design icon 库中选择'
      },
      checkedIcon: {
        name: 'checkedIcon',
        type: [String],
        title: 'checkedIcon',
        default: 'check_box',
        description: '已选中时显示的icon, 必须在 material design icon 库中选择'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '用来使用v-model控制'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: '当 value 属性发生改变时触发事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '同 input[type=radio] 元素的change事件一致, 传入 value 属性值'
      }
    }
  },
  MuSwitch: {
    name: 'MuSwitch',
    title: 'MuSwitch',
    tag: 'mu-switch',
    props: {
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '显示的标签文字'
      },
      labelLeft: {
        name: 'labelLeft',
        type: [Boolean],
        title: 'labelLeft',
        default: false,
        description: '标签文字是否在左边，默认在右边'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: 'label 样式，同 class 绑定方式一致'
      },
      trackClass: {
        name: 'trackClass',
        type: [String, Object, Array],
        title: 'trackClass',
        description: 'track 样式，同 class 绑定方式一致'
      },
      thumbClass: {
        name: 'thumbClass',
        type: [String, Object, Array],
        title: 'thumbClass',
        description: 'thumb 样式，同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '设置为 true, 将不可用'
      },
      value: {
        name: 'value',
        type: [Boolean],
        title: 'value',
        default: false,
        description: '组件的值，true/false'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: '当 value 属性发生改变时触发事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '同 input[type=checkbox] 元素的change事件一致，传入 value 属性值'
      }
    }
  },
  MuSlider: {
    name: 'MuSlider',
    title: 'MuSlider',
    tag: 'mu-slider',
    props: {
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: '表单元素的 name 属性'
      },
      max: {
        name: 'max',
        type: [Number],
        title: 'max',
        default: 100,
        description: '最大值'
      },
      min: {
        name: 'min',
        type: [Number],
        title: 'min',
        default: 100,
        description: '最小值'
      },
      step: {
        name: 'step',
        type: [Number],
        title: 'step',
        default: 0.1,
        description: '步长'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '是否禁用滑块'
      },
      value: {
        name: 'value',
        type: [Number],
        title: 'value',
        default: 0,
        description: '滑块的值'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: 'value 发生改变触发的事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '用于用户行为(点击，拖拽)导致value发生改变时, 触发事件，传入 value 属性值'
      }
    }
  },
  'MuSnackBar&Toast': {
    name: 'MuSnackBar&Toast',
    title: 'MuSnackBar&Toast',
    tag: 'mu-snackbar-&-toast',
    props: {
      message: {
        name: 'message',
        type: [String],
        title: 'message',
        description: '提示的信息'
      },
      action: {
        name: 'action',
        type: [String],
        title: 'action',
        description: '动作按钮上的文字'
      },
      actionColor: {
        name: 'actionColor',
        type: [String],
        title: 'actionColor',
        description: '动作按钮颜色'
      }
    },
    slots: {},
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: 'snackbar 需要被关闭时触发事件'
      },
      actionClick: {
        title: 'actionClick',
        name: 'actionClick',
        description: '动作按钮点击事件'
      }
    }
  },
  MuStepper: {
    name: 'MuStepper',
    title: 'MuStepper',
    tag: 'mu-stepper',
    props: {
      activeStep: {
        name: 'activeStep',
        type: [Number],
        title: 'activeStep',
        default: 0,
        description: '当前步骤'
      },
      linear: {
        name: 'linear',
        type: [Boolean],
        title: 'linear',
        default: true,
        description: '是否为线性步骤导航，设置为 false，将不再控制 step 组件的 completed 和 disabled 属性'
      },
      orientation: {
        name: 'orientation',
        type: [String],
        title: 'orientation',
        default: 'horizontal',
        description: 'horizontal: 水平步骤导航, vertical: 垂直的步骤导航'
      }
    },
    slots: { default: { name: 'default', description: '用于放置 step 组件' } },
    events: {}
  },
  MuSubHeader: {
    name: 'MuSubHeader',
    title: 'MuSubHeader',
    tag: 'mu-sub-header',
    props: {
      inset: {
        name: 'inset',
        type: [Boolean],
        title: 'inset',
        default: false,
        description: '是否向内缩进，设置为true 会调整padding-left 为 72px'
      }
    },
    slots: { default: { name: 'default', description: '放置副标题内容' } },
    events: {}
  },
  MuTable: {
    name: 'MuTable',
    title: 'MuTable',
    tag: 'mu-table',
    props: {
      fixedHeader: {
        name: 'fixedHeader',
        type: [Boolean],
        title: 'fixedHeader',
        default: false,
        description: '是否固定表头'
      },
      fixedFooter: {
        name: 'fixedFooter',
        type: [Boolean],
        title: 'fixedFooter',
        default: false,
        description: '是否固定表尾'
      },
      height: {
        name: 'height',
        type: [String],
        title: 'height',
        default: 'auto',
        description: '表格的高度'
      },
      enableSelectAll: {
        name: 'enableSelectAll',
        type: [Boolean],
        title: 'enableSelectAll',
        default: false,
        description: '是否允许选择全部'
      },
      allRowsSelected: {
        name: 'allRowsSelected',
        type: [Boolean],
        title: 'allRowsSelected',
        default: false,
        description: '是否默认选择全部，设置为true 会选择所有行'
      },
      multiSelectable: {
        name: 'multiSelectable',
        type: [Boolean],
        title: 'multiSelectable',
        default: false,
        description: '是否可以多选'
      },
      selectable: {
        name: 'selectable',
        type: [Boolean],
        title: 'selectable',
        default: true,
        description: '是否可以选择'
      },
      showCheckbox: {
        name: 'showCheckbox',
        type: [Boolean],
        title: 'showCheckbox',
        default: true,
        description: '是否显示复选框'
      }
    },
    slots: {
      header: { name: 'header', description: '用于放置 thead 组件' },
      footer: { name: 'footer', description: '用于放置 tfoot 组件' },
      default: { name: 'default', description: '用于放置 tbody 组件' }
    },
    events: {
      rowClick: {
        title: 'rowClick',
        name: 'rowClick',
        description: '某一行被点击时触发, 参数 (index, tr): \n\nindex 这一行的下标 \ntr tr 组件实体'
      },
      rowHover: {
        title: 'rowHover',
        name: 'rowHover',
        description: '鼠标在某一行上时触发， 参数同 rowClick 一致'
      },
      rowHoverExit: {
        title: 'rowHoverExit',
        name: 'rowHoverExit',
        description: '鼠标在从一行移出时触发， 参数同 rowClick 一致'
      },
      rowSelection: {
        title: 'rowSelection',
        name: 'rowSelection',
        description: '当某一行被选择时触发，参数 (selectedRowsIndex) \n selectedRowsIndex 是一个被选择行下标，如果 multiSelectable 为 true , selectedRowsIndex 是一个数组'
      },
      cellClick: {
        title: 'cellClick',
        name: 'cellClick',
        description: 'td被点击时触发, 参数 (rowIndex, columnName, td, tr) \n\nrowIndex 所在行的下标 \ncolumnName td组件的name属性 \ntd 组件实体 \ntr tr组件实体'
      },
      cellHover: {
        title: 'cellHover',
        name: 'cellHover',
        description: '鼠标在这个 td 上时触发, 参数同 cellClick 一致'
      },
      cellHoverExit: {
        title: 'cellHoverExit',
        name: 'cellHoverExit',
        description: '鼠标从这个 td 移出时触发, 参数同 cellClick 一致'
      }
    }
  },
  MuTabs: {
    name: 'MuTabs',
    title: 'MuTabs',
    tag: 'mu-tabs',
    props: {
      lineClass: {
        name: 'lineClass',
        type: [String, Object, Array],
        title: 'lineClass',
        description: '高亮线的样式，同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [],
        title: 'value',
        description: '必需，需要和子组件 tab 配合'
      }
    },
    slots: { default: { name: 'default', description: '用于放置 tab 组件' } },
    events: {
      change: {
        title: 'change',
        name: 'change',
        description: '当 value 改变的时触发，参数(value) value 新的value'
      }
    }
  },
  MuTextField: {
    name: 'MuTextField',
    title: 'MuTextField',
    tag: 'mu-text-field',
    props: {
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: 'input/textarea 的name属性'
      },
      type: {
        name: 'type',
        type: [String],
        title: 'type',
        description: '输入框的类型，在单行输入时有效 text, password, email, url, number'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '输入框图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '输入框的标签'
      },
      labelFloat: {
        name: 'labelFloat',
        type: [Boolean],
        title: 'labelFloat',
        default: false,
        description: '标签是否浮动'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      labelFocusClass: {
        name: 'labelFocusClass',
        type: [String, Object, Array],
        title: 'labelFocusClass',
        description: '输入框获取焦点时标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '输入框是否不可用'
      },
      hintText: {
        name: 'hintText',
        type: [String],
        title: 'hintText',
        description: '提示文字'
      },
      hintTextClass: {
        name: 'hintTextClass',
        type: [String, Object, Array],
        title: 'hintTextClass',
        description: '提示文字样式, 同 class 绑定方式一致'
      },
      helpText: {
        name: 'helpText',
        type: [String],
        title: 'helpText',
        description: '帮助文字'
      },
      helpTextClass: {
        name: 'helpTextClass',
        type: [String, Object, Array],
        title: 'helpTextClass',
        description: '帮助文字样式, 同 class 绑定方式一致'
      },
      errorText: {
        name: 'errorText',
        type: [String],
        title: 'errorText',
        description: '错误提醒文字，如果此参数有值，那么输入框会转为错误的状态, 显示效果将会更改'
      },
      errorColor: {
        name: 'errorColor',
        type: [String],
        title: 'errorColor',
        description: '错误状态的时的颜色，默认为红色'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%, 默认 256px'
      },
      underlineShow: {
        name: 'underlineShow',
        type: [Boolean],
        title: 'underlineShow',
        default: true,
        description: '是否显示底部的横线'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式, 同 class 绑定方式一致'
      },
      underlineFocusClass: {
        name: 'underlineFocusClass',
        type: [String, Object, Array],
        title: 'underlineFocusClass',
        description: '输入框获取焦点时底部横线样式, 同 class 绑定方式一致'
      },
      inputClass: {
        name: 'inputClass',
        type: [String, Object, Array],
        title: 'inputClass',
        description: '输入框样式, 同 class 绑定方式一致'
      },
      multiLine: {
        name: 'multiLine',
        type: [Boolean],
        title: 'multiLine',
        default: false,
        description: '是否为多行输入'
      },
      rows: {
        name: 'rows',
        type: [Number],
        title: 'rows',
        default: 1,
        description: '行数'
      },
      rowsMax: {
        name: 'rowsMax',
        type: [Number],
        title: 'rowsMax',
        description: '最大行数'
      },
      maxLength: {
        name: 'maxLength',
        type: [Number],
        title: 'maxLength',
        default: 0,
        description: '可输入的最大长度'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '输入框的值，可不设置此参数，使用 v-model 指令代替'
      },
      max: {
        name: 'max',
        type: [String, Number],
        title: 'max',
        description: '当type = number 时，max属性生效'
      },
      min: {
        name: 'min',
        type: [String, Number],
        title: 'min',
        description: '当type = number 时，min属性生效'
      },
      required: {
        name: 'required',
        type: [Boolean],
        title: 'required',
        default: false,
        description: 'whether the input is required or not'
      }
    },
    slots: {
      default: {
        name: 'default',
        description: '用于和其它组件配合使用，可以保留输入框的样式，但内部表单组件可以放置其它的组件，现在的 selectField datePicer timePicker 都是这种方式'
      }
    },
    events: {
      focus: {
        title: 'focus',
        name: 'focus',
        description: '输入框获取焦点时触发'
      },
      blur: {
        title: 'blur',
        name: 'blur',
        description: '输入框失去焦点时触发'
      },
      input: {
        title: 'input',
        name: 'input',
        description: 'value 发生改变触发的事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '用户输入时触发事件，传入输入框的 value'
      }
    }
  },
  MuTimePicker: {
    name: 'MuTimePicker',
    title: 'MuTimePicker',
    tag: 'mu-time-picker',
    props: {
      autoOk: {
        name: 'autoOk',
        type: [Boolean],
        title: 'autoOk',
        default: false,
        description: '是否在选择分钟后自动确定, 设为true则不显示确定按钮'
      },
      okLabel: {
        name: 'okLabel',
        type: [String],
        title: 'okLabel',
        default: '确定',
        description: '确定按钮的文字'
      },
      cancelLabel: {
        name: 'cancelLabel',
        type: [String],
        title: 'cancelLabel',
        default: '确定',
        description: '取消按钮的文字'
      },
      container: {
        name: 'container',
        type: [String],
        title: 'container',
        default: 'dialog',
        description: 'dialog/inline, 弹出时间选择的方式， dialog 弹出框， inline 内联弹出显示'
      },
      mode: {
        name: 'mode',
        type: [String],
        title: 'mode',
        default: 'portrait',
        description: 'portrait 竖屏显示， landscape 横屏显示'
      },
      format: {
        name: 'format',
        type: [String],
        title: 'format',
        default: 'ampm',
        description: 'ampm: 12小时制; 24hr: 24小时制'
      },
      name: {
        name: 'name',
        type: [String],
        title: 'name',
        description: '表单元素的 name 属性'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '时间选择框的标签'
      },
      labelFloat: {
        name: 'labelFloat',
        type: [Boolean],
        title: 'labelFloat',
        default: false,
        description: '标签是否浮动'
      },
      labelClass: {
        name: 'labelClass',
        type: [String, Object, Array],
        title: 'labelClass',
        description: '标签的样式, 同 class 绑定方式一致'
      },
      labelFocusClass: {
        name: 'labelFocusClass',
        type: [String, Object, Array],
        title: 'labelFocusClass',
        description: '输入框获取焦点时标签的样式, 同 class 绑定方式一致'
      },
      disabled: {
        name: 'disabled',
        type: [Boolean],
        title: 'disabled',
        default: false,
        description: '时间选择框是否不可用'
      },
      hintText: {
        name: 'hintText',
        type: [String],
        title: 'hintText',
        description: '提示文字'
      },
      hintTextClass: {
        name: 'hintTextClass',
        type: [String, Object, Array],
        title: 'hintTextClass',
        description: '提示文字样式, 同 class 绑定方式一致'
      },
      helpText: {
        name: 'helpText',
        type: [String],
        title: 'helpText',
        description: '帮助文字'
      },
      helpTextClass: {
        name: 'helpTextClass',
        type: [String, Object, Array],
        title: 'helpTextClass',
        description: '帮助文字样式, 同 class 绑定方式一致'
      },
      errorText: {
        name: 'errorText',
        type: [String],
        title: 'errorText',
        description: '错误提醒文字，如果此参数有值，那么时间选择框会转为错误的状态, 显示效果将会更改'
      },
      errorColor: {
        name: 'errorColor',
        type: [String],
        title: 'errorColor',
        description: '错误状态的时的颜色，默认为红色'
      },
      icon: {
        name: 'icon',
        type: [String],
        title: 'icon',
        description: '显示图标'
      },
      iconClass: {
        name: 'iconClass',
        type: [String, Object, Array],
        title: 'iconClass',
        description: '图标的样式, 同 class 绑定方式一致'
      },
      fullWidth: {
        name: 'fullWidth',
        type: [Boolean],
        title: 'fullWidth',
        default: false,
        description: '是否将宽度设置为 100%, 默认 256px'
      },
      underlineShow: {
        name: 'underlineShow',
        type: [Boolean],
        title: 'underlineShow',
        default: true,
        description: '是否显示底部的横线'
      },
      underlineClass: {
        name: 'underlineClass',
        type: [String, Object, Array],
        title: 'underlineClass',
        description: '底部横线样式, 同 class 绑定方式一致'
      },
      underlineFocusClass: {
        name: 'underlineFocusClass',
        type: [String, Object, Array],
        title: 'underlineFocusClass',
        description: '输入框获取焦点时底部横线样式, 同 class 绑定方式一致'
      },
      inputClass: {
        name: 'inputClass',
        type: [String, Object, Array],
        title: 'inputClass',
        description: '输入框样式, 同 class 绑定方式一致'
      },
      value: {
        name: 'value',
        type: [String],
        title: 'value',
        description: '时间选择框的值，可不设置此参数，使用 v-model 指令代替'
      }
    },
    slots: {},
    events: {
      input: {
        title: 'input',
        name: 'input',
        description: 'value 发生改变触发的事件，传入新的value, (value)'
      },
      change: {
        title: 'change',
        name: 'change',
        description: '由于用户行为(点击确定按钮)导致 value 值改变时触发事件, 传入 value 属性值'
      }
    }
  },
  MuTooltip: {
    name: 'MuTooltip',
    title: 'MuTooltip',
    tag: 'mu-tooltip',
    props: {
      trigger: {
        name: 'trigger',
        type: [Element],
        title: 'trigger',
        description: '触发 tooltip 的元素，需要根据此元素计算tooltip出现的位置'
      },
      label: {
        name: 'label',
        type: [String],
        title: 'label',
        description: '提示的文字'
      },
      verticalPosition: {
        name: 'verticalPosition',
        type: [String],
        title: 'verticalPosition',
        default: 'bottom',
        description: '垂直方向位置，top 在上面， bottom 在下面'
      },
      horizontalPosition: {
        name: 'horizontalPosition',
        type: [String],
        title: 'horizontalPosition',
        default: 'center',
        description: '水平方向位置，left, center, right'
      },
      show: {
        name: 'show',
        type: [String],
        title: 'show',
        default: false,
        description: '是否显示'
      },
      touch: {
        name: 'touch',
        type: [Boolean],
        title: 'touch',
        default: false,
        description: '是否为 touch 的样式，一般用在移动端，提示框会大一些'
      }
    },
    slots: {},
    events: {}
  },
  MuBackTop: {
    name: 'MuBackTop',
    title: 'MuBackTop',
    tag: 'mu-backtop',
    props: {
      height: {
        name: 'height',
        type: [Number],
        title: 'height',
        default: 200,
        description: '页面滚动高度达到该值时才显示组件'
      },
      bottom: {
        name: 'bottom',
        type: [Number],
        title: 'bottom',
        default: 30,
        description: '组件距离底部的距离'
      },
      right: {
        name: 'right',
        type: [Number],
        title: 'right',
        default: 30,
        description: '组件距离右部的距离'
      },
      duration: {
        name: 'duration',
        type: [Number],
        title: 'duration',
        default: 500,
        description: '滚动动画持续时间，单位 毫秒'
      }
    },
    slots: { default: { name: 'default', description: '自定义内容' } },
    events: {
      callBack: {
        title: 'callBack',
        name: 'callBack',
        description: '回到顶部时触发'
      }
    }
  },
  MuBreadcrumb: {
    name: 'MuBreadcrumb',
    title: 'MuBreadcrumb',
    tag: 'mu-breadcrumb',
    props: {
      separator: {
        name: 'separator',
        type: [String],
        title: 'separator',
        default: '/',
        description: '自定义分隔符'
      }
    },
    slots: {},
    events: {}
  },
  MuContentBlock: {
    name: 'MuContentBlock',
    title: 'MuContentBlock',
    tag: 'mu-content-block',
    props: {},
    slots: {},
    events: {}
  },
  MuFlexbox: {
    name: 'MuFlexbox',
    title: 'MuFlexbox',
    tag: 'mu-flexbox',
    props: {
      gutter: {
        name: 'gutter',
        type: [Number],
        title: 'gutter',
        default: 8,
        description: '各 flexboxItem 间的间隔'
      },
      orient: {
        name: 'orient',
        type: [String],
        title: 'orient',
        default: 'horizontal',
        description: 'flexboxItem排列方向 \n\nhorizontal: 水平方向排列; \nvertical: 垂直方向排列'
      },
      justify: {
        name: 'justify',
        type: [String],
        title: 'justify',
        description: '主轴的对齐方式 flex-start, flex-end, center, space-between, space-around'
      },
      align: {
        name: 'align',
        type: [String],
        title: 'align',
        description: '交叉轴对齐方式 flex-start, flex-end, center, baseline, stretch'
      },
      wrap: {
        name: 'wrap',
        type: [String],
        title: 'wrap',
        description: '是否可以换行， wrap 允许换行， nowrap 不允许换行'
      }
    },
    slots: {
      default: { name: 'default', description: '用于放置 flexboxItem 组件' }
    },
    events: {}
  },
  MuGrid: {
    name: 'MuGrid',
    title: 'MuGrid',
    tag: 'mu-grid',
    props: {
      gutter: {
        name: 'gutter',
        type: [Boolean],
        title: 'gutter',
        default: false,
        description: 'col 之间是否存在间隔'
      }
    },
    slots: { default: { name: 'default', description: '放置 col 组件' } },
    events: {}
  },
  MuInfiniteScroll: {
    name: 'MuInfiniteScroll',
    title: 'MuInfiniteScroll',
    tag: 'mu-infinite-scroll',
    props: {
      scroller: {
        name: 'scroller',
        type: [Element],
        title: 'scroller',
        default: 'frames',
        description: '滚动的元素，会监听它的 scroll 事件'
      },
      loading: {
        name: 'loading',
        type: [Boolean],
        title: 'loading',
        default: false,
        description: '是否正在加载数据'
      },
      loadingText: {
        name: 'loadingText',
        type: [String],
        title: 'loadingText',
        default: '正在加载...',
        description: '加载数据时显示的文字'
      }
    },
    slots: {},
    events: {
      load: {
        title: 'load',
        name: 'load',
        description: '当滚动到底部时触发事件'
      }
    }
  },
  MuPagination: {
    name: 'MuPagination',
    title: 'MuPagination',
    tag: 'mu-pagination',
    props: {
      current: {
        name: 'current',
        type: [Number],
        title: 'current',
        description: '当前页数'
      },
      total: {
        name: 'total',
        type: [Number],
        title: 'total',
        default: 0,
        description: '数据总数'
      },
      pageSize: {
        name: 'pageSize',
        type: [Number],
        title: 'pageSize',
        description: '每页条数, 当同时配置pageSizeOptions的时候并且showSizeChanger为true的时候，优先使用pageSizeOptions，否则将会使用该参数'
      },
      defaultPageSize: {
        name: 'defaultPageSize',
        type: [Number],
        title: 'defaultPageSize',
        default: 10,
        description: '默认的每页条数，只有当showSizeChanger为false并且pageSize没有配置的时候才会生效'
      },
      showSizeChanger: {
        name: 'showSizeChanger',
        type: [Boolean],
        title: 'showSizeChanger',
        default: false,
        description: '是否显示 pageSize 选择框以及决定pageSizeOptions是否生效'
      },
      pageSizeOption: {
        name: 'pageSizeOption',
        type: [Array],
        title: 'pageSizeOption',
        default: [10, 20, 30, 40],
        description: '指定每页可以显示多少条'
      }
    },
    slots: {
      default: { name: 'default', description: '用于放置 pagination 组件' }
    },
    events: {
      pageChange: {
        title: 'pageChange',
        name: 'pageChange',
        description: '当页码改变的时候触发'
      },
      pageSizeChange: {
        title: 'pageSizeChange',
        name: 'pageSizeChange',
        description: '当pageSize改变的时候触发'
      }
    }
  },
  MuPicker: {
    name: 'MuPicker',
    title: 'MuPicker',
    tag: 'mu-picker',
    props: {
      visibleItemCount: {
        name: 'visibleItemCount',
        type: [Number],
        title: 'visibleItemCount',
        default: 5,
        description: '可见备选值的个数'
      },
      values: {
        name: 'values',
        type: [Array],
        title: 'values',
        default: [],
        description: '已选择的值'
      },
      slots: {
        name: 'slots',
        type: [Array],
        title: 'slots',
        default: [],
        description: 'slot 对象数组分发供选择的数据，slot属性如下: \n\ndivider 是否为分隔符 \ncontent 分隔符显示文本 \nvalues 备选值数组 \nwidth 宽度 \ntextAlign 对齐方式'
      }
    },
    slots: {},
    events: {
      change: {
        title: 'change',
        name: 'change',
        description: '当选择某一项是触发事件，参数 (value, index) : \n\nvalue 被选择的值 \nindex 被选择项在 slots 中的下标'
      }
    }
  },
  MuPopup: {
    name: 'MuPopup',
    title: 'MuPopup',
    tag: 'mu-popup',
    props: {
      open: {
        name: 'open',
        type: [Boolean],
        title: 'open',
        default: false,
        description: '是否打开'
      },
      popupClass: {
        name: 'popupClass',
        type: [String, Object, Array],
        title: 'popupClass',
        description: 'popup 样式, 同 class 绑定方式一致'
      },
      popupTransition: {
        name: 'popupTransition',
        type: [String],
        title: 'popupTransition',
        description: '弹出层的过渡动画效果, 默认使用内置的 popup-slide'
      },
      position: {
        name: 'position',
        type: [String],
        title: 'position',
        description: '弹出位置 left, right, top, bottom'
      },
      overlay: {
        name: 'overlay',
        type: [Boolean],
        title: 'overlay',
        default: true,
        description: '是否有遮盖层'
      },
      overlayColor: {
        name: 'overlayColor',
        type: [String],
        title: 'overlayColor',
        default: '#000',
        description: '遮盖层颜色'
      },
      overlayOpacity: {
        name: 'overlayOpacity',
        type: [Number],
        title: 'overlayOpacity',
        default: 0.4,
        description: '遮盖层透明度'
      }
    },
    slots: { default: { name: 'default', description: '弹出层内容' } },
    events: {
      close: {
        title: 'close',
        name: 'close',
        description: '当点击遮盖层或者按下esc键时触发该事件，会传入一个 reason 作为参数，javascript\n (reason) => console.log(reason)'
      },
      show: {
        title: 'show',
        name: 'show',
        description: '当 popup 显示时(动画完成后)触发事件'
      },
      hide: {
        title: 'hide',
        name: 'hide',
        description: '当 popup 隐藏时(动画完成后)触发事件'
      }
    }
  },
  MuRefreshControl: {
    name: 'MuRefreshControl',
    title: 'MuRefreshControl',
    tag: 'mu-refresh-control',
    props: {
      trigger: {
        name: 'trigger',
        type: [Element],
        title: 'trigger',
        description: '触发下拉刷新的元素, 会给它绑定上事件'
      },
      refreshing: {
        name: 'refreshing',
        type: [Boolean],
        title: 'refreshing',
        default: false,
        description: '是否正在刷新数据'
      }
    },
    slots: {},
    events: {
      refresh: {
        title: 'refresh',
        name: 'refresh',
        description: '需要刷新数据时触发'
      }
    }
  },
  MuTimeline: {
    name: 'MuTimeline',
    title: 'MuTimeline',
    tag: 'mu-timeline',
    props: {
      lineType: {
        name: 'lineType',
        type: [String],
        title: 'lineType',
        default: 'solid',
        description: '时间轴的线条类型，与border-style具有同样的值，例如solid、dotted等'
      },
      lineColor: {
        name: 'lineColor',
        type: [String],
        title: 'lineColor',
        default: '#e8e8e8',
        description: '时间轴的线条颜色'
      },
      lineWidth: {
        name: 'lineWidth',
        type: [Number],
        title: 'lineWidth',
        default: 2,
        description: '时间轴的线条宽度'
      },
      iconWidth: {
        name: 'iconWidth',
        type: [Number],
        title: 'iconWidth',
        default: 15,
        description: '时间点的宽度，即直径'
      },
      iconColor: {
        name: 'iconColor',
        type: [String],
        title: 'iconColor',
        default: '#7e57c2',
        description: '时间点的颜色'
      },
      iconType: {
        name: 'iconType',
        type: [String],
        title: 'iconType',
        default: 'solid',
        description: '时间点的线条类型，与border-style具有同样的值，例如solid、dotted等'
      },
      iconLine: {
        name: 'iconLine',
        type: [Number],
        title: 'iconLine',
        default: 2,
        description: '时间点的线条宽度'
      }
    },
    slots: {},
    events: {}
  }
}
