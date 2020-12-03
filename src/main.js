/* eslint-disable */
// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// // 全局引入按需引入UI库 vant
// import '@/plugins/vant'
// // 引入全局样式
// import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// 按需引入UI库 vant
import {
	Icon,
	Button,
	Tabbar,
	TabbarItem,
	RadioGroup,
	Radio,
	Checkbox,
	CheckboxGroup,
	Form,
	Toast,
	Field,
	Divider,
	Tab,
	Tabs,
	SwipeCell,
	PullRefresh,
	Overlay,
	ShareSheet,
	Notify,
	Loading,
	DropdownMenu,
	DropdownItem,
	ActionSheet,
	Uploader,
	Search,
	DatetimePicker,
	Calendar,
	Popup,
	Col,
	Row,
	Badge,
	Collapse,
	CollapseItem,
	CountDown,
	Empty,
	ImagePreview,
	Lazyload,
	List,
	NoticeBar,
	Popover,
	Skeleton,
	Step,
	Steps,
	Sticky,
	Swipe,
	SwipeItem,
	Tag,
	Grid,
	GridItem,
	IndexBar,
	IndexAnchor,
	NavBar,
	Pagination,
	Sidebar,
	SidebarItem,
	TreeSelect,
	AddressEdit,
	AddressList,
	Area,
	Card,
	ContactCard,
	ContactEdit,
	ContactList,
	CouponCell,
	CouponList,
	GoodsAction,
	GoodsActionButton,
	GoodsActionIcon,
	SubmitBar,
	Sku,
	Panel,
	SwitchCell,
} from 'vant';
import { Image as VanImage } from 'vant';
Vue.use(Icon);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Form);
Vue.use(Toast);
Vue.use(Field);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(SwipeCell);
Vue.use(PullRefresh);
Vue.use(Overlay);
Vue.use(ShareSheet);
Vue.use(Notify);
Vue.use(Loading);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(ActionSheet);
Vue.use(Uploader);
Vue.use(Search);
Vue.use(DatetimePicker);
Vue.use(Calendar);
Vue.use(Popup);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Badge);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(CountDown);
Vue.use(Empty);
Vue.use(ImagePreview);
Vue.use(Lazyload);
Vue.use(List);
Vue.use(NoticeBar);
Vue.use(Popover);
Vue.use(Skeleton);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Sticky);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tag);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(NavBar);
Vue.use(Pagination);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(TreeSelect);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Area);
Vue.use(Card);
Vue.use(ContactCard);
Vue.use(ContactEdit);
Vue.use(ContactList);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(SubmitBar);
Vue.use(Sku);
Vue.use(Panel);
Vue.use(SwitchCell);

// filters
import './filters'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
