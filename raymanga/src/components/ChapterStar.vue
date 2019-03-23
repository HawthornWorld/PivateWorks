<template>
  <div class="star-wrapper">
    <div class="title">谢谢观赏！</div>
    <div class="desc">本漫画还在试阅阶段,请花费一点时间为这本漫画打个分,这将影响这本漫画后续更新计划.</div>
    <div class="star">
      <ul class="list">
        <li v-for="(item,idx) in starObj">
          <span class="bg" :data-score="item.score" @click="starHandle"></span>
          <span class="txt">{{item.txt}}</span>
        </li>
      </ul>
    </div>
    <div class="text">
      <textarea type="text" rows="4" placeholder="此处填写您对本漫画的任何意见,ps:翻译好烂哦,画面太糟糕了" v-model.trim="comment" @keyup.stop="getInput">
      </textarea>
    </div>
    <div class="submit" @click="submitHandle">提交评分</div>
  </div>
</template>

<script>
import util from '../vendors/util.js';

const BASE_URL = '../assets/images';
export default {
  name: 'star',
  data() {
    return {
      chapterId: util.getQuery('chapterid'),
      userScore: 0,
      comment: '',
      cookieId: '',
      starObj: [
        {
          txt: '一般',
          score: 1,
        },
        {
          txt: '不错',
          score: 2,
        },
        {
          txt: '精彩',
          score: 3,
        },
      ],
    };
  },
  methods: {
    starHandle(e) {
      //star时高亮星星
      let doms = document.getElementsByClassName('bg');
      Array.prototype.slice.call(doms).forEach(item => {
        item.classList.remove('light');
      });
      e.target.classList.add('light');

      //获取用户分数
      this.userScore = parseInt(e.target.dataset.score);
    },
    /**
     * 获取输入框内容
     */
    getInput(e) {
      this.comment = e.target.value;
    },
    /**
     * 获取cookie标识
     */
    getCookie(name) {
      let arr = [],
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      if ((arr = document.cookie.match(reg))) {
        return true;
      } else {
        return false;
      }
    },
    setCookie(name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        c_name +
        '=' +
        escape(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
    },
    /**
     * 提交评分和评论
     */
    submitHandle() {
      // 点击提交,一起提交star && comment,star必选，comment可选
      if (!this.userScore) {
        //提示star必选
        this.$toast('请为本章节打分');
        return;
      }
      //提交
      this.submitStar();
    },
    /**
     * 提交评分和评论
     */
    submitStar() {
      this.$axios
        .post('/markBook', {
          cookie_id: this.cookieId,
          chapter_id: parseInt(this.chapterId),
          score: this.userScore,
          suggestion: this.comment || '',
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.star-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5a5a5a;
  padding: 0 rem(128px);
  box-sizing: border-box;

  .title {
    font-size: rem(48px);
    font-weight: bold;
  }
  .desc {
    font-size: rem(36px);
    margin: rem(50px) 0 rem(100px);
  }
  .star {
    .list {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90px;
      .bg {
        display: inline-block;
        width: rem(72px);
        height: rem(72px);
        background-image: url(#{$base}/ic_reader_navigation_favorite.png);
        background-size: 100%;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .bg.light {
        background-image: url(#{$base}/ic_favorite_highlight.png);
      }
      .txt {
        color: #5a5a5a;
        font-size: rem(40px);
        font-weight: bold;
      }
    }
  }
  .text {
    width: 100%;
    margin: rem(80px) 0 rem(42px);
    textarea {
      width: 100%;
      height: rem(278px);
      color: #7e7e7e;
      background: #e8e8e8;
      border: none;
      outline: none;
      resize: none;
      padding: rem(20px) rem(28px);
    }
  }
  .submit {
    width: rem(336px);
    height: rem(110px);
    line-height: rem(110px);
    color: #fff;
    font-size: rem(36px);
    background: #ff6666;
    border-radius: rem(110px);
    text-align: center;
  }
}
</style>
