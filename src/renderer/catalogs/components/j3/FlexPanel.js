import category from '../categroy'

export default {
  // 组件名称，必须唯一，不能重复
  name: 'J3FlexPanel',
  // html标签
  tag: 'flex-panel',
  // 图标，字符串，暂定为css样式名
  icon: 'home',
  // 组件标题
  title: '自伸缩Dock面板',
  // 组件类别
  category: category.layout,
  // 组件描述
  description: '多栏自伸缩布局组件，可进行横向/纵向切换',
  // 属性描述
  props: {
    // 属性名
    direction: {
      // 属性类型
      type: String,
      // 属性默认值
      default: 'horizontal',
      // 属性描述
      description: '排列方向',
      // 是否可空，默认允许空值
      nullable: false,
      // 选项，如果有声明，则用户必须在这里选择。
      selections: [
        {
          // 选项名称
          title: '水平',
          // 选项值
          value: 'horizontal'
        },
        {
          title: '垂直',
          value: 'vertical',
          // 描述，用于tooltip
          description: ''
        }
      ]
    },
    align: {
      type: String,
      default: 'stretch',
      description: '项对齐方式',
      selections: [
        {
          title: '填充',
          value: 'stretch',
          description: ''
        },
        {
          title: '中心',
          value: 'center',
          description: ''
        },
        {
          title: '左/上',
          value: 'flex-start',
          description: ''
        },
        {
          title: '右/下',
          value: 'flex-end',
          description: ''
        }
      ]
    }
  },
  // 插糟定义
  slots: {
    default: {
      // 插糟标题
      title: '默认位置',
      // 可接受类型
      accepts: 'J3FlexPanelItem',
      // 托业描述
      description: ''
    }
  },
  // 事件定义
  events: [],
  // 可供用户选择的模板
  templates: [
    {
      title: '水平多栏自伸缩布局',
      icon: '',
      type: 'J3FlexPanel',
      props: {
        direction: 'horizontal',
        align: 'stretch'
      },
      slots: {
        default: [
          {
            type: 'J3FlexPanelItem',
            props: {
              grow: 0,
              thickness: 150
            },
            events: [],
            binds: []
          },
          {
            type: 'J3FlexPanelItem',
            props: {
              grow: 1,
              thickness: 150
            }
          }
        ]
      },
      event: {},
      binds: {}
    },
    {
      title: '垂直多栏自伸缩布局',
      type: 'J3FlexPanel',
      props: {
        direction: 'horizontal',
        align: 'stretch',
        slots: {
          default: [
            {
              type: 'J3FlexPanelItem',
              props: {
                grow: 0,
                thickness: 150
              }
            },
            {
              type: 'J3FlexPanelItem',
              props: {
                grow: 1,
                thickness: 150
              }
            }
          ]
        }
      },
      event: {},
      binds: {}
    }
  ],
  // 快速选项，当控件选中时，浮动的菜单中的可选项
  quickProps: ['direction', 'align']
}
