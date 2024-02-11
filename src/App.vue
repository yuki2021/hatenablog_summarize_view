<template>
  <div id="app">
    <div class="abstract-link">
      <a href="javascript:void(0);" @click="toggleAbstract" class="btn btn--blue">{{ buttonText }}</a>
      <transition name="slide-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <nav v-if="showAbstract" class="abstract-nav" v-html="abstract"></nav>
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
          
          if (data.result !== undefined && data.result !== '' && data.result !== null) {
            this.abstract = data.result;
          } else {
            console.log('要約データが存在しませんでした');
            console.log(data);
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

.entry-content .abstract-link {
    position: relative;
    margin: 36px 0 16px;
    padding: 16px 10px;
    border: 2px solid #1056a2;
    background-color: #fffbf5;
	min-height: 48px;
}
.entry-content .abstract-link p:last-child {
    margin-bottom: 0;
}
.entry-content .abstract-link::before {
    position: absolute;
    top: -12px;
    left: 10px;
    padding: 0 10px 0 26px;
    content: "記事要約";
    background-color: #1056a2;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
}
.entry-content .abstract-link::after {
    position: absolute;
    top: -16px;
    left: 4px;
    width: 28px;
    height: 28px;
    background-color: #1056a2;
    border-radius: 14px;
    line-height: 25px;
    text-align: center;
    content: "\f010";
    font-size: 18px;
    font-family: "blogicon";
    color: #fff;
}

/* 要約を開くボタン */
.btn,
a.btn,
button.btn {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 5px 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}

.btn--blue,
a.btn--blue {
  display: block;
  margin: 10px 15%;
  color: #fff;
  background-color: #668ad8;
}
.btn--blue:hover,
a.btn--blue:hover {
  color: #fff;
  background: #668ad8;
}
</style>
