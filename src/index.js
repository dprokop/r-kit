import ReactDOM from 'react-dom'
import Styles from 'styles/main.scss'
import MDLStyles from 'material-design-lite/material.css'
import App from 'app/app'
import AppComponent from 'components/app'

var app = new App()

ReactDOM.render(<AppComponent store={app.store}/>, document.getElementById('appRoot'))
