'use strict'

import ReactDOM from 'react-dom'
import Styles from 'styles/main.scss'
import MDLStyles from 'material-design-lite/material.css'
import App from 'app/app'
import AppComponent from 'components/app'
import { addTodo } from 'areas/todos/actions'

var app = new App()

ReactDOM.render(<AppComponent />, document.getElementById('appRoot'))



