<template>
  <div id="app">
    <div class="abstract-link">
      <a href="javascript:void(0);" @click="toggleAbstract" class="btn btn--blue">{{ buttonText }}</a>
      <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <nav v-if="showAbstract" class="abstract-nav">{{ abstract }}</nav>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      abstract: '', // 要約のテキストを保持
      showAbstract: false, // 要約を表示するかどうかのフラグ
      buttonText: '要約をみる', // ボタンのテキスト
    };
  },
  mounted() {
    this.getAbstract(); // コンポーネントがマウントされたら要約を取得
  },
  methods: {
    async getAbstract() {
      const urlValue = document.location.href;
      try {
        const response = await fetch('https://yuki2021.sakura.ne.jp/hatena_blog_senddata/get_abstract.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: urlValue }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.result !== undefined) {
            this.abstract = data.result;
          } else {
            console.log('要約データが存在しませんでした');
          }
        }
      } catch (error) {
        console.log('jsonを取得できませんでした。(getAbstract)', error);
      }
    },
    toggleAbstract() {
      this.showAbstract = !this.showAbstract;
      this.buttonText = this.showAbstract ? '要約をかくす' : '要約をみる';
    },
    beforeEnter(el) {
      el.style.height = '0';
    },
    enter(el, done) {
      el.offsetHeight; // これは重要です。これにより、ブラウザにCSSの変更を強制させます。
      el.style.transition = 'height 0.3s ease';
      el.style.height = `${el.scrollHeight}px`;
      el.addEventListener('transitionend', done);
    },
    leave(el, done) {
      el.style.height = '0';
      el.addEventListener('transitionend', done);
    },
  }
}
</script>

<style>
.abstract-nav {
  overflow: hidden;
}
</style>
