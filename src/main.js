import { createApp } from 'vue'
import App from './App.vue'

// DOMが完全に読み込まれた後に実行される関数
function initializeVueApp() {
    const targetElements = document.querySelectorAll('.entry-content p');
    targetElements.forEach((elem, index) => {
        const mountPoint = document.createElement('div');
        mountPoint.id = `vue-app-${index}`;
        elem.parentNode.insertBefore(mountPoint, elem);

        createApp(App).mount(`#vue-app-${index}`);
    });
}

// ページのロードが完了した後にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', initializeVueApp);