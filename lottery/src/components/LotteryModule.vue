<template>
	<div class="lottery-wrapper">

	</div>
</template>

<script>
import util from "../vendors/util.js";

const BASE_URL = "../assets/images";
export default {
	name: "star",
	data() {
		return {
			
		};
	},
	props: {
		// userLang: {
		// 	type: Object,
		// 	default: {}
		// }
	},
	mounted() {
		
	},
	methods: {
	
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.lottery-wrapper {
    background: #6829c8;
    width: 96%;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    height: 300px;
}
</style>
