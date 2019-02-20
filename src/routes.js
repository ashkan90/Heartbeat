import RemotesList from './components/RemoteList'
import RemoteForm from './components/RemoteForm'

export const routes = [
	{ path: '', component: RemotesList },
	{ path: '/remote', component: RemoteForm },
	{ path: '/remote/:id', component: RemoteForm, props: true }
]