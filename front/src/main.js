import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// async function getNotes() {
//   const res = await fetch("http://localhost:5001/api/notes/");
//   return await res.json();
// }

const app = mount(App, {
  target: document.getElementById('app'),
  // props: { getNotes }
})

export default app
// @ts-ignore
// window.Notes = Notes;