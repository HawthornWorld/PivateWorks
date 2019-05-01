<template>
	<div class="list-wrapper">
		<nav-bar></nav-bar>
	</div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
	name: "list",
	data() {
		return {};
	},
	computed: {},
	methods: {},
	components: {
		NavBar
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.list-wrapper {
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	background: #6829c8;
}
</style>
