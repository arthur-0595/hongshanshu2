<template>
	<div class="artical-box">
		<div class="artical">
			<h1 class="title">第一篇 <span class="close"  @click="close">X</span></h1>
			<div class="content">
				<p> {{article.article}} </p>
			</div>
			<div class="save" @click="toTest">进入答题</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				article: {},
			}
		},
		methods: {
			close() {
				// console.log('close')
				this.$router.replace('/home/readpage');
			},
			toTest() {
				this.$router.replace('/home/readpage/test')
			}
		},
		created() {

			this.article = JSON.parse(sessionStorage.getItem('article'))
			// console.log(this.article)
		}
	}
</script>

<style scoped>
	.artical-box {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		margin: 15px auto;
	
	}
	.artical {
		box-sizing: border-box;
		color: #018D72;
		font-size: 18px;
		line-height: 1.6;
		text-align: left;
		width: 1000px;
		height: 500px;
		margin: auto;
		padding: 10px 40px;
		background-color: #fff;
	}
	.artical > .content > p{
		margin: 20px 0;
	}
	.artical > .title {
		position: relative;
		font-size: 24px;
		text-align: center;
	}
	.artical > .title > .close {
		position: absolute;
		display: inline-block;
		right: -30px;
		width: 100px;
		height: 24px;
		color: #000;
		font-size: 24px;
		font-weight: 200;
		cursor: pointer;
	}

	.save {
		color: #fff;
		width: 180px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #FDAE38;
		margin: auto;
		margin-top: 150px;
		cursor: pointer;
	}
</style>