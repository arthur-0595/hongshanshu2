<template>
  <!--中间单词区域-->
	<div class="box">
		<div class="wordWrapper">
			<div class="centerBtns clearfix">
				<!--单元下拉选择框-->
				<div class="unitSel">
					生词本
					<span class="close" @click="close">X</span>
				</div>
				<!--中间选择按钮-->
			</div>
			<!--单词列表-->
			<div class="wordList">
				<table>
					<tr class="tHeader" >
						<td style="width:50px">序号</td>
						<td style="width:210px">单词 </td>
						<td>词义</td>
					</tr>
					<tr :class="[key%2 ==0 ? 'gray': '']" v-for="(item, key) in newWords">
						<td>{{key+1}}</td>
						<td style="display: block;"> {{item.newword}} </td>
						<td> {{item.newword_mean}} </td>
					</tr>
				</table>
			</div>
			<!--分页-->
			<div class="pagination">
				<span class="pre" @click="pre"> <<上一页 </span>
				<span>{{curPageIndex}} / {{pageNum}}</span>
				<span class="next" @click="next"> >>下一页 </span>
			</div>
		</div>
	</div>
</template>

<script>
  import axios from 'axios'
  import url from '@/api/url'
  export default {
  	name: 'newWordBook',
  	data() {
  		return {
  			userId: 1,
  			newWords: [],
  			pageNum : 0,
  			wordsNum: 0,
  			curPageIndex: 1
  		}
  	},
  	methods: {
  		_getNewWords(userId, pageIndex, pageSize) {
  			var url = this.$url.url2 + '/Areas/Api/Interface.ashx'
  			axios.get(url, {
  				params: {
  					method: 'getnewword',
  					user_id: userId,
  					pageindex: pageIndex,
  					pagesize: pageSize
  				}
  			}).then((res) => {
  				console.log(res.data)
  				this.newWords = res.data[0].nword
  				this.pageNum = res.data[0].page
  				this.wordsNum = res.data[0].sum
  			})
  		},
  		pre() {
  			if(this.curPageIndex<=1){
  				return
  			}
  			this.curPageIndex--
  			this._getNewWords(this.userId, this.curPageIndex, 10)
  		},
  		next() {
  			if(this.curPageIndex>=this.pageNum){
  				return
  			}
  			this.curPageIndex++
  			this._getNewWords(this.userId, this.curPageIndex, 10)
  		},
  		close() {
  			this.$emit('hidden')
  		}
  	},
  	created() {
  		this.userId = JSON.parse(sessionStorage.getItem('userMsg')).ID
  		this._getNewWords(this.userId, 1, 10)
  	}
  }
</script>

<style scoped>
  .box{
  	position: fixed;
  	height: 100%;
  	width: 100%;
  	top: 0;
  	left: 0;
  	background-color: rgba(0, 0, 0, .6);
  	z-index: 100;
  }
  .wordWrapper{
		width:1000px;
		height:500px;
		margin:20px auto;
		background-color: #fff;
		padding:10px;
		box-sizing: border-box;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -250px;
		margin-left: -500px;
	}
	.version{
		width:100%;
		height:40px;
		line-height:40px;
		font-size:16px;
		color:#fff;
		background-color: #008c72;
		padding:0 12px;
		box-sizing: border-box;
	}
	.version>.versionName{
		float:left;
	}
	.version>.backHome{
		float:right;
	}
	/*中间按钮*/
	.centerBtns{
		font-size:12px;
		height: 32px;
		line-height:32px;
		margin: 15px 0;
		position: relative;
	}
	.centerBtns .unitSel .close{
		font-size: 36px;
		float: right;
		margin-right: 20px;
	}
	.centerBtns .unitSel{
		/*float:left;				*/
		text-align: center;
		font-size: 36px;
	}
	.centerBtns .unitSel>select{
		width:140px;
		height:32px;
		font-size:12px;
		cursor: pointer;
		border:1px solid #ccc;
	}
	.radioBox{
		float:left;
		margin: 0 12px;
	}
	.radioBox label{
		position: relative;
		padding-left: 22px;
		cursor: pointer;
	}
	.radioBox label.choosed{
		color:#008c72;
	}
	.radioBox input{
		position: absolute;
	    left: 0;
	    top: -1px;
	}
	.radioBox .newWordPer{
		margin:0 10px;
	}
	.radioBox .proPer .long{
		display: inline-block;
		vertical-align: middle;;
		width:50px;
		height:4px;
		background-color: #aaa;
		margin:0 6px;
		overflow: hidden;
		position: relative;
	}
	.radioBox .proPer .long>.curPer{
		width:20px;
		height:5px;
		position: absolute;
		top:0;left:0;
		background-color: #ff9900;
	}
	/*单词播放机*/
	.boBtn{
		position: absolute;
		right:0;
		color:#fff;
		background-color: #ff9900;
		width: 72px;
	    height: 30px;
	    line-height:30px;
	    text-align: center;
	}
	.boBtn:hover{
		cursor: pointer;
		background-color:#fdae39;
	}
	/*单词表格*/
	.wordList{
		width:100%;
		max-height: 360px;
		overflow: auto;
	}
	.wordList>table{
		width:100%;
	}	
	.wordList>table tr.gray{
		background-color: #f7f7f7;
	}	
	.wordList>table tr:hover{
		background-color: #f0f0f0;
		cursor: pointer;
	}	
	.wordList>table tr td{
		height:38px;
		text-align: center;
		font-size:14px;
		line-height: 38px;
		border: 1px solid #e8e8e8;
	}
	.wordList>table .tHeader{
		background-color: #008c72;
		height:40px;
		color:#fff;
		
	}
	.wordList>table .tHeader:hover{
		cursor: default;
		background-color: #008c72;
	}
	.wordList>table .tHeader>td{
		line-height: 40px;
		font-size: 16px;
	}
	.wordList>table .tHeader>td input[type="checkbox"]{
		vertical-align: middle;
		cursor: pointer;
	}
	/*分页*/
	.pagination{
		position: absolute;
		bottom:10px;
		right:10px;
		height:30px;
		line-height: 30px;
	}
	.pagination>span{
		display: inline-block;
		border:1px solid #ddd;
		padding: 0 10px;
		color:#666;
		font-size:14px;
		cursor: pointer;
	}
	.pagination>span.pre{
		float:left;
	}
	.pagination>span.next{
		float:right;
	}
	.pagination>.pageList{
		overflow: hidden;
		margin:0 96px;
	}
	.pagination>.pageList>li{			
		float:left;
		margin:0 2px;
		padding:0 8px;	
		color:#666;
		border:1px solid #ddd;
		cursor: pointer;				
	}
	.pagination>.pageList>li.curPage,
	.pagination>span.pre:hover,
	.pagination>span.next:hover,
	.pagination>.pageList>li:hover{
		border:1px solid #008c72;
		background-color: #13a995;
		color: #fff;
	}
</style>
