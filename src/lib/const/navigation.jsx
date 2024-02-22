import {
	HiOutlinePlus,
	HiClipboardList
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Add Product',
		path: '/',
		icon: <HiOutlinePlus />
	},
	{
		key: 'products',
		label: 'Product List',
		path: '/products',
		icon: <HiClipboardList />
	}
]