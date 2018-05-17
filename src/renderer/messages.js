import event from 'events'

const eventBus = new event.EventEmitter()
eventBus.un = eventBus.removeListener

export default {
  subscribe(type, handler) {
    eventBus.on(type, handler)
  },
  unsubscribe(type, handler) {
    eventBus.un(type, handler)
  },
  dispatch(type, ...args) {
    eventBus.emit(type, ...args)
  }
}
