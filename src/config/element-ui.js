import {
  Progress,
  Table,
  TableColumn,
  Button,
  Select,
  Option,
  OptionGroup,
  Form,
  FormItem,
  Input,
  InputNumber,
  DatePicker,
  Pagination,
  RadioButton,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Dialog,
  Row,
  Col,
  Steps,
  Step,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MessageBox,
  Message,
  Loading,
  Popover,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Scrollbar,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Upload,
  Carousel,
  CarouselItem
} from 'element-ui'

function install (Vue) {
  if (install.installed) {
    return
  }

  Vue.component(Progress.name, Progress)

  Vue.component(Row.name, Row)
  Vue.component(Col.name, Col)

  Vue.component(Button.name, Button)
  Vue.component(DatePicker.name, DatePicker)
  Vue.component(Dialog.name, Dialog)

  Vue.component(Form.name, Form)
  Vue.component(FormItem.name, FormItem)

  Vue.component(Input.name, Input)
  Vue.component(InputNumber.name, InputNumber)
  Vue.component(Checkbox.name, Checkbox)
  Vue.component(CheckboxGroup.name, CheckboxGroup)

  Vue.component(Pagination.name, Pagination)

  Vue.component(RadioButton.name, RadioButton)
  Vue.component(RadioGroup.name, RadioGroup)
  Vue.component(Radio.name, Radio)

  Vue.component(Select.name, Select)
  Vue.component(Option.name, Option)
  Vue.component(OptionGroup.name, OptionGroup)

  Vue.component(Steps.name, Steps)
  Vue.component(Step.name, Step)

  Vue.component(Table.name, Table)
  Vue.component(TableColumn.name, TableColumn)

  Vue.component(Tabs.name, Tabs)
  Vue.component(TabPane.name, TabPane)
  Vue.component(Tag.name, Tag)
  Vue.component(Tree.name, Tree)
  Vue.component(Tooltip.name, Tooltip)

  Vue.component(Dropdown.name, Dropdown)
  Vue.component(DropdownMenu.name, DropdownMenu)
  Vue.component(DropdownItem.name, DropdownItem)

  Vue.component(Container.name, Container)
  Vue.component(Header.name, Header)
  Vue.component(Aside.name, Aside)
  Vue.component(Main.name, Main)
  Vue.component(Footer.name, Footer)

  Vue.component(Scrollbar.name, Scrollbar)

  Vue.component(Menu.name, Menu)
  Vue.component(Submenu.name, Submenu)
  Vue.component(MenuItem.name, MenuItem)
  Vue.component(MenuItemGroup.name, MenuItemGroup)

  Vue.component(Breadcrumb.name, Breadcrumb)
  Vue.component(BreadcrumbItem.name, BreadcrumbItem)

  Vue.component(Upload.name, Upload)

  Vue.component(Carousel.name, Carousel)
  Vue.component(CarouselItem.name, CarouselItem)

  Vue.use(Loading)
  Vue.use(Popover)

  Vue.prototype.$msgbox = MessageBox
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
  Vue.prototype.$message = Message

  // Vue.prototype.$Loading = Loading
  // Vue.prototype.$msgbox = config => MessageBox(config)
  // Vue.prototype.$alert = (message, title, config) => MessageBox.alert(message, title, config)
  // Vue.prototype.$confirm = (message, title, config) => MessageBox.confirm(message, title, config)
  // Vue.prototype.$prompt = (message, title, config) => MessageBox.prompt(message, title, config)
  // Vue.prototype.$message = config => Message(config)
}
export default install
