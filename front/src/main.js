import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'


const app = mount(App, {
  target: document.getElementById('app'),
})

const home = mount(App, {
  target: document.getElementById('home'),
})

export default app
export { home }
