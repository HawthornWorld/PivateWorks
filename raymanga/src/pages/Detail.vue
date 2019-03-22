<template>
  <div class="detail-wrapper">
    <div class="page-list">
      <ul class="list">
        <li v-for="(item,idx) in pageList" :key="idx">
          <img :src="`//img1.raymangaapp.com${item.image_url}`" alt="">
        </li>
      </ul>
    </div>
    <ChapterStar></ChapterStar>
    <BottomPanel></BottomPanel>
  </div>
</template>

<script>
import util from '../vendors/util.js';
import ChapterStar from '../components/ChapterStar.vue';
import BottomPanel from '../components/BottomPanel.vue';

export default {
  name: 'detail',
  data() {
    return {
      chapterid: Number,
      bookId: Number,
      pageList: [],
    };
  },
  created() {
    this.chapterid = this.$route.query.chapterid;
    this.bookId = this.$route.query.bookid;
    this.getChapterList();
  },
  mounted() {},
  methods: {
    /**
     * 获取章节详情
     */
    getChapterList() {
      this.$axios
        .post('/getChapterDetail', {
          book_id: parseInt(this.bookId),
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
          } else if (code === 2001) {
          } else if (code === 2000) {
          } else if (code === 2002) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  components: {
    BottomPanel,
    ChapterStar
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.detail-wrapper {
  padding-bottom: 88px; 
  width: 100%;
}
.page-list .list li {
  width: 100%;
  img {
    width: 100%;
  }
  

}
</style>
