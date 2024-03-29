import { createApp } from 'vue'
import App from './App.vue'

function initializeVueApp() {
    const pElements = document.querySelectorAll('.entry-content p');
    let inserted = false;

    for (let i = 0; i < pElements.length; i++) {
        if (pElements[i].innerText.match(/[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+/) && !inserted) {
            const mountPoint = document.createElement('div');
            mountPoint.id = `vue-app-mount-point`;
            pElements[i].parentNode.insertBefore(mountPoint, pElements[i]);
            createApp(App).mount(`#vue-app-mount-point`);
            inserted = true; // マウントポイントを挿入したらループを抜ける
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeVueApp);
