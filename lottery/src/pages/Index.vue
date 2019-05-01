<template>
	<div class="index-wrapper">
		<h2>hello mayanyan</h2>
		<div v-on:click="goToList">go to list</div>
	</div>
</template>

<script>
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
	components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/scss/common.scss";
.index-wrapper {
	width: 100%;
	padding-bottom: 60px;
	overflow-y: auto;
}
</style>
