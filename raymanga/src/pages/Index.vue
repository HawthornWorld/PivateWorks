<template>
  <div class="hello">
    <BottomPanel></BottomPanel>
  </div>
</template>

<script>
import axios from 'axios';
import BottomPanel from '../components/BottomPanel.vue';
export default {
  name: 'index',
  mounted() {
    this.getBookInfo()
    this.getChapterList()
  },
  methods: {
    getBookInfo() {
      axios.post('http://192.168.1.41/h5/common/getBookInfo', {
          'book_id': 181
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    getChapterList() {},
  },
  components: {
    BottomPanel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
