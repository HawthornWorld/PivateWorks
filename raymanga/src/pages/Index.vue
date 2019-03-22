<template>
  <div class="index-wrapper">
    <div class="cover-wrapper">
      <div class="cnt">
        <div class="img-box">
          <img class="cover-img" :src="`//img1.raymangaapp.com${bookInfo.cover_url}`" alt="">
          <span></span>
        </div>
        <div class="cover-title">
          <div class="title">{{bookInfo.book_name}}</div>
          <div class="author">{{bookInfo.author}}</div>
        </div>
      </div>
      <div class="summary">
        <span class="title">-INFO-</span>
        <span class="cnt">{{bookInfo.summary}}</span>
        <span class="btn" @click="getMore">-点击展开-</span>
      </div>

    </div>
    <chapterList :chapterArr="chapterArr"></chapterList>
    <BottomPanel></BottomPanel>
  </div>
</template>

<script>
import util from '../vendors/util.js';
import BottomPanel from '../components/BottomPanel.vue';
import chapterList from '../components/ChapterList.vue';
export default {
  name: 'index',
  data() {
    return {
      bookId: util.getQuery('bookid'),
      chapterArr: [],
      bookInfo: {},
    };
  },
  async mounted() {
    await this.getBookInfo();
    await this.getChapterList();
  },
  methods: {
    getBookInfo() {
      this.$axios
        .post('/getBookInfo', {
          book_id: this.bookId,
        })
        .then(res => {
          /**
           * 状态码
           * 1     ：成功
           * 2000  ：常规错误
           * 2001  ：参数错误
           * 2002  ：数据库连接错误
           */
          // let code = res.data.code;
          // let data = res.data.bookInfo;
          const { code, bookInfo } = res.data;
          if (code === 1) {
            this.chapterArr = bookInfo.chapter_list;
            this.bookInfo = bookInfo.book_info;
          } else if (code === 2001) {
          } else if (code === 2000) {
          } else if (code === 2002) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getChapterList() {
      this.$axios
        .post('/getChapterDetail', {
          book_id: parseInt(this.bookId),
          chapter_id: 4432,
        })
        .then(res => {
          /**
           * 状态码
           * 1     ：成功
           * 2000  ：常规错误
           * 2001  ：参数错误
           * 2002  ：数据库连接错误
           */
          const { code, data } = res;
          if (code === 1) {
          } else if (code === 2001) {
          } else if (code === 2000) {
          } else if (code === 2002) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMore() {},
  },
  components: {
    BottomPanel,
    chapterList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.index-wrapper {
  width: 100%;
  padding-bottom: 60px;
  overflow-y: auto;
}
.cover-wrapper {
  position: relative;
  width: 100%;
  .cnt {
    position: relative;
  }
  .img-box {
    position: relative;
    z-index: 0;
    height: rem(720px);
    .cover-img {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: 0;
    }
    span {
      position: absolute;
      z-index: 3;
      bottom: -2px;
      display: inline-block;
      width: 100%;
      height: rem(180px);
      // background: #000;
      background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
    }
  }

  .cover-title {
    position: absolute;
    bottom: rem(20px);
    z-index: 1;
    width: 100%;
    // height: 100%;
    color: #fff;
    // padding-top: 188px;
    .title {
      font-size: rem(42px);
      padding: 0 rem(40px);
      box-sizing: border-box;
    }
    .author {
      color: #ffa800;
      font-size: rem(40px);
      font-weight: bold;
      padding: 0 rem(40px);
      box-sizing: border-box;
      &:before {
        content: '';
        position: relative;
        transform: translateY(15%);
        display: inline-block;
        width: rem(50px);
        height: rem(50px);
        background: url(#{$base}/ic_auther.png) center center no-repeat/100%;
        margin-right: 3px;
      }
    }
  }
  .summary {
    padding: 0 rem(40px);
    box-sizing: border-box;
    color: #fff;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: rem(36px);
      font-weight: bold;
      @include ellipsis(2);
    }
    .cnt {
      font-size: rem(32px);
      @include ellipsis(3);
    }
    .btn {
      font-size: rem(28px);
    }
  }
}
</style>
