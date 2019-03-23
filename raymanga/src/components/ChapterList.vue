<template>
  <div class="chapter-wrapper">
    <ul class="list">
      <li v-for="(item,idx) in chapterArr" :id="item.chapter_id" :data-num="item.chapter_number" @click="jumpToChapter">
        <img :src="`//img1.raymangaapp.com${item.img_url}`" alt="" />
        <div class="name">Chapter {{item.chapter_name}}</div>
        <div class="label">GRATIS</div>
      </li>
    </ul>
  </div>
</template>

<script>
import util from '../vendors/util.js';

export default {
  name: 'list',
  data() {
    return {
      bookId: util.getQuery('bookid'),
    };
  },
  props: {
    chapterArr: {
      type: Array,
      default: [],
    },
  },
  methods: {
    jumpToChapter(e) {
      console.log('====',e.target)
      this.$router.push({
        path: 'detail',
        query: {
          bookid: this.bookId,
          chapterid: e.currentTarget.id,
          chapternum: e.currentTarget.dataset.num
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.chapter-wrapper {
}
.list li {
  height: rem(180px);
  border-bottom: 1px solid #b2b2b2;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: rem(422px);
  }
  .name {
    color: #575757;
    font-weight: bold;
    margin: 0 rem(40px);
  }
  .label {
    color: #15e480;
    border: 1px solid #15e480;
    font-size: rem(32px);
    border-radius: 4px;
    padding: rem(4px) rem(12px);
    box-sizing: border-box;
  }
}
</style>
