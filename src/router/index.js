import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import CoverletterList from '../views/coverletter/CoverletterList.vue'
import CoverletterView from '../views/coverletter/CoverletterView.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Login from '../views/Login.vue'
import User from '../views/user/User.vue'

Vue.use(Router)

const requireAuth = (to, from, next) => {
	const loginPath = `/login?returnPath=${encodeURIComponent(to.path)}`
	store.getters.isAuth() ? next() : next(loginPath)
}

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/coverletters/:cid',
			name: 'coverletterDetail',
			component: CoverletterView,
			beforeEnter: requireAuth
		},
		{
			path: 'coverletters/new',
			name: 'coverletterNew',
			component: CoverletterView,
			beforeEnter: requireAuth
		},
		{
			path: '/coverletters',
			component: CoverletterList,
			beforeEnter: requireAuth,
			alias: '/'
		},
		{
			path: '/dashboard',
			component: Dashboard,
			beforeEnter: requireAuth
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/user',
			component: User
		}
	],
});


export default router;

