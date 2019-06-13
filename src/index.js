// styles
import '~/index.scss'

import App from '~/app.riot'


const mountApp = riot.component(App)

const app = mountApp(
  document.getElementById('app'),
  { message: 'Hello World' }
)
