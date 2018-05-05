import event from 'events'

const bus = new event.EventEmitter()
bus.un = bus.removeListener

export default bus
