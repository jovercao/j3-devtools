import ExplorerBox from './ExplorerBox'
import ComponentBox from './ComponentsBox'
import IconsBox from './IconsBox'
import DesignerBox from './DesignerBox'
import StyleBox from './StyleBox'

export default function(ctx) {
  return {
    'explorer-box': ExplorerBox,
    'component-box': ComponentBox,
    'icons-box': IconsBox,
    'designer-box': DesignerBox,
    'style-box': StyleBox
  }
}
