<template>
  <div class="detail-wrapper">
    <NavBar :chapterNum="currChapternum"></NavBar>
    <div class="page-list">
      <transition name="fade">
        <ul class="list">
          <li v-for="(item,idx) in pageList" :key="idx">
            <img :src="`//img1.raymangaapp.com${item.image_url}`" alt="">
          </li>
        </ul>
      </transition>
    </div>
    <ChapterStar></ChapterStar>
    <BottomPanel class="download"></BottomPanel>
    <div class="toggle-chapter">
      <span class="prev" @click="prevChapter"></span>
      <span class="num">Ch.{{currChapternum}}</span>
      <span class="next" @click="nextChapter"></span>
    </div>

  </div>
</template>

<script>
import util from '../vendors/util.js';
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
    };
  },
  computed: {
    currChapternum() {
      return parseInt(this.chapterNum) + 1;
    },
  },
  created() {
    // this.chapterid = this.$route.query.chapterid;
    // this.bookId = this.$route.query.bookid;
    this.getChapterList();
  },
  mounted() {},
  methods: {
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
    transform: translateY(50%);
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(0);
  }
}
</style>
