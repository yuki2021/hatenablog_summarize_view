import { createApp } from 'vue'
import App from './App.vue'

// DOMが完全に読み込まれた後に実行される関数
function initializeVueApp() {
    // '.entry-content p' の最初の要素を選択
    const targetElement = document.querySelector('.entry-content p');
    if (targetElement) {
        const mountPoint = document.createElement('div');
        // 動的にIDを割り当てる必要がない場合、単純なIDを使用
        mountPoint.id = 'vue-app-mount-point';
        // 最初の <p> タグの前にマウントポイントを挿入
        targetElement.parentNode.insertBefore(mountPoint, targetElement);

        // Vueアプリケーションをマウント
        createApp(App).mount('#vue-app-mount-point');
    }
}

// ページのロードが完了した後にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', initializeVueApp);