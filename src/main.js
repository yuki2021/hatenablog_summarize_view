import Vue from 'vue'
import App from './App.vue'

// DOMが完全に読み込まれた後に実行される関数
function initializeVueApp() {
    const targetElements = document.querySelectorAll('.entry-content p');
    targetElements.forEach((elem, index) => {
        const mountPoint = document.createElement('div');
        mountPoint.id = `vue-app-${index}`; // 動的にIDを割り当て
        elem.parentNode.insertBefore(mountPoint, elem);

        new Vue({
            render: h => h(App),
        }).$mount(`#vue-app-${index}`);
    });
}

// ページのロードが完了した後にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', initializeVueApp);