import ExplorerBox from './views/toolboxes/ExplorerBox'

export default function init(ctx) {
  ctx.toolbox(ExplorerBox.name, ExplorerBox)
}
