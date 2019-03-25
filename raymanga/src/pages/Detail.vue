<template>
  <div class="detail-wrapper">
    <NavBar :chapterNum="currChapternum"></NavBar>
    <transition name="fade">
      <div class="page-list" id="container">
        <ul class="list">
          <li v-for="(item,idx) in pageList" :key="idx">
            <img :src="`//img1.raymangaapp.com${item.image_url}`" v-lazy="`//img1.raymangaapp.com${item.image_url}`" alt="">
          </li>
        </ul>
      </div>
    </transition>
    <ChapterStar :userLang="userLang"></ChapterStar>
    <BottomPanel class="download" :userLang="userLang"></BottomPanel>
    <div class="toggle-chapter">
      <span class="prev" @click="prevChapter"></span>
      <span class="num">Ch.{{currChapternum}}</span>
      <span class="next" @click="nextChapter"></span>
    </div>

  </div>
</template>

<script>
import util from '../vendors/util.js';
import lang from '../vendors/lang.js';
import ChapterStar from '../components/ChapterStar.vue';
import BottomPanel from '../components/BottomPanel.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'detail',
  data() {
    return {
      chapterid: parseInt(util.getQuery('chapterid')),
      bookid: parseInt(util.getQuery('bookid')),
      chapterNum: parseInt(util.getQuery('chapternum')),
      pageList: [],
      userLang: {},
    };
  },
  computed: {
    currChapternum() {
      return parseInt(this.chapterNum) + 1;
    },
  },
  created() {
    this.getChapterList();
    //获取用户设备语言 包含常规浏览器和ie浏览器
    let langKey = (navigator.language || navigator.userLanguage).slice(0, 2);
    //切换ui至相应语言
    this.userLang = lang[langKey];
  },
  mounted() {
    //动态设置fixed元素的宽度
    let dom = document.getElementsByClassName('toggle-chapter')[0];
    dom.style.width = document.body.clientWidth + 'px';
    // 调用统计章节pv函数
    this.detailPvHandle();
    //调用页面滚动事件
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    /**
     * 统计阅读页pv函数,章节id可从链接获取,ChapterStar.vue有获取cookie uuid工具函数
     */
    detailPvHandle() {
      console.log('detail pv');
    },
    /**
     * 统计完成章节阅读用户
     */
    chapterDoneHandle() {
      console.log('chapter done');
    },
    handleScroll() {
      //判断页面是否拉到底部
      let scrollDom = document.getElementById('container');
      let distance =
        scrollDom.offsetHeight -
        scrollDom.scrollTop -
        document.body.clientHeight;
      if (distance < 400) {
        // 在距离底部400px之内,调用统计完成章节阅读用户函数
        this.chapterDoneHandle();
      }
    },
    /**
     * 获取章节详情
     */
    getChapterList() {
      const getChapterDetail =
        '//previewapi.raymangaapp.com/previewapi/v1/common/getChapterDetail';

      this.$axios
        .post(getChapterDetail, {
          book_id: parseInt(this.bookid),
          chapter_id: parseInt(this.chapterid),
        })
        .then(res => {
          /**
           * 状态码
           * 1     ：成功
           * 2000  ：常规错误
           * 2001  ：参数错误
           * 2002  ：数据库连接错误
           */
          const { code, pageList } = res.data;
          if (code === 1) {
            this.pageList = pageList;
          } else if (code === 2000) {
            this.$toast('常规错误(2000)');
          } else if (code === 2001) {
            this.$toast('参数错误(2001)');
          } else if (code === 2002) {
            this.$toast('数据库连接错误(2002)');
          }
        })
        .catch(error => {
          this.$toast('网络繁忙，请稍后再试');
        });
    },
    /**
     * 切换章节
     */

    prevChapter() {
      if (this.chapterNum === 0) return;
      this.chapterid -= 1;
      this.chapterNum -= 1;
      this.getChapterList();
      //切换章节时滚动视口到顶部
      document.body.scrollTop = 0;
    },
    nextChapter() {
      this.chapterid += 1;
      this.chapterNum += 1;
      this.getChapterList();
      document.body.scrollTop = 0;
    },
  },
  components: {
    BottomPanel,
    ChapterStar,
    NavBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.detail-wrapper {
  padding: rem(170px) 0 120px;
  width: 100%;
}
.page-list .list li {
  width: 100%;
  img {
    width: 100%;
  }
}
.download {
  bottom: rem(150px);
}

.toggle-chapter {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: rem(150px);
  background: #f4f4f4;
  border-top: 1px solid #b2b2b2;
  padding: 0 rem(300px);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .prev {
    display: inline-block;
    width: rem(64px);
    height: rem(64px);
    background: url(#{$base}/ic_reader_navigation_previous.png) center center
      no-repeat/100%;
  }
  .num {
    padding: rem(20px) rem(15px);
    box-sizing: border-box;
    border-radius: 6px;
    background: #e3e3e3;
  }
  .next {
    display: inline-block;
    width: rem(64px);
    height: rem(64px);
    background: url(#{$base}/ic_reader_navigation_next.png) center center
      no-repeat/100%;
  }
}
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity .5s;
// }

// .fade-enter,
// .fade-leave-to
// /* .scalein-leave-active below version 2.1.8 */

//  {
//   opacity: 0;
// }
</style>
