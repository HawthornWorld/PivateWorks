<template>
	<div class="index-wrapper">
        <div class="banner">

        </div>
        <LotteryModule></LotteryModule>
        <PrizeList></PrizeList>
	</div>
</template>

<script>
import LotteryModule from '../components/LotteryModule.vue'
import PrizeList from '../components/PrizeList.vue'
// import ScrollNote from '../components/ScrollNote.vue'
export default {
	name: "index",
	data() {
		return {};
	},
	computed: {},
	methods: {
		goToList: function(event) {
			event.preventDefault();
			this.$router.push("List");
		}
	},
	components: {
        LotteryModule,
        PrizeList
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.index-wrapper {
	width: 100%;
    background: #803ce6;
    padding-bottom: 50px;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    .banner {
        width: 100%;
        height: rem(490px);
        background: url(#{$base}/banner.png) top left no-repeat/100%;
    }
}
</style>
