import { createApp } from 'vue'
import MinimalPage from './MinimalPage.vue'
import './minimal-variants.css'
const target = document.getElementById('app')
createApp(MinimalPage, { version: target.dataset.version, imageBase: '/images/' }).mount(target)
