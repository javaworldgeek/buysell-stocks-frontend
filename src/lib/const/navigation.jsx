import {
	HiOutlinePlus,
	HiClipboardList,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
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

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '#',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '#',
		icon: <HiOutlineQuestionMarkCircle />
	}
]