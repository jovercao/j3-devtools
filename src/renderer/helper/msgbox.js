import { MessageBox, Message, Notification } from 'element-ui'

const MsgBox = Object.assign({
  message: Message,
  notify: Notification
}, MessageBox)

MsgBox.confirm = async function(...args) {
  try {
    await MessageBox.confirm(...args)
    return true
  } catch (err) {
    return false
  }
}

export default MsgBox
