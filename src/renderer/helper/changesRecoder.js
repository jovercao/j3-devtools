// import _ from 'lodash'

// // 数组的方法
// const recorder = {
//   push() {

//   },
//   splice() {

//   }
// }

// const arrayMethods = [
//   'push',
//   'pop',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
// ];

// const isArray = Symbol('Proxy#isArray')

// function createRecoder(state) {

//   const changedState = {}
//   const changeRecords = []

//   function makeObjectChangeContext(value) {
//     return {
//       value,
//       changes: {}
//     }
//   }
//   function makeArrayChangeContext(value) {
//     return {
//       value: _.cloneDeep(value),
//       changes: [
//         { action: 'push', value: '' },
//       ],
//     }
//   }

//   state.array[1].name = '323'
//   state.array.pop()

//   // 获取当前值 changes后的值 优先
//   function getValue( path) {

//   }

//   function record() {

//   }

//   function recordPropChange(path, value) {
//     const name = path[path.length - 1]
//     const lastpath.slice(0, -1).reduce((changesNode, key) => {
//       if (value[key] === undefined) {
//         value[key] = makeChangeContext()
//       }
//       return value[key].changes
//     }, changes)
//     lastpath[name] = makeChangeContext()
//   }

//   function recordArrayMethod(path, value, value)

//   function createProxy(path, name, parent) {
//     const value = getValue(path)
//     const recoder = new Proxy(function() {}, {
//       apply(target, ctx, ...args) {
//         // 如果是数组操作
//         if (parent[isArray]() && arrayMethods.includes(name)) {

//         }
//       },
//       defineProperty() {
//         throw new Error('不允许define属性，请使用 set 操作')
//       },
//       deleteProperty() {

//       },
//       get(target, key) {
//         // 取值，返回当前值
//         if (key === '$') {
//           return getValue(path)
//         }
//         return createProxy(path)
//       },
//       set() {

//       }
//     })
//   }

//   let curPath = []

//   store.commit()
// }

// const x = new Proxy({}, { get(target, key) { console.log('get', key); return x; }, set(target, key, value) { console.log('set', key, value); } })
