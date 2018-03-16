<template>
	<div class="artical-box" >
		<div class="artical">
			<h1 class="title">筛选生词 <span class="close"  @click="close">X</span></h1>
			<div class="content" >
				<p class="select-text" @mouseup="selectText($event)"> {{article.article}}</p>
			</div>
			<div class="save" @click="showWordsBook">生词本</div>
		</div>
		<div class="hint" :style="styleObj">
			<div class="word">middle</div>
			<div class="word_mean">中间</div>
			<div class="add_word" @click="addNewWords">加入生词本</div>
			<div class="close" @click.stop="hiddenHint">X</div>
		</div>
		<newwordbook v-if="showNewWordBook" v-on:hidden="closeNewWordBook"></newwordbook>
	</div>
</template>

<script>
	import MD5 from '@/util/MD5'
	import axios from 'axios'
	import url from '@/api/url'
	import newwordbook from '@/page/readNewWord'
	export default {
		data() {
			return {
				article: {},
				newWord: '',
				newWord_mean: '',
				styleObj: {},
				usrId: 1,
				showNewWordBook: false
			}
		},
		components: {
			newwordbook
		},
		methods: {
			close() {
				// console.log('close')
				this.$router.replace('/home/readpage/test');
			},
			//添加生词
			_addNewWord() {
				var addurl = url.url1,
					userId = this.userId,
					newWord = this.newWord,
					newWordMean = this.newWordMean;
				axios.get(addurl, {
					params: {
						method: 'addnewword',
						user_id: userId,
						newword: newWord,
						newword_mean: newWordMean
					}
				}).then((res) => {
					if(res != 2) {
						alert("添加失败！请从新加入")
					}
				})
			},
			//获取文本选择区
			funGetSelectText(){
				var txt = '';
				if(document.selection){
					txt = document.selection.createRange(); // ie
				}else{
					txt = document.getSelection();
				}
				return txt.toString();
			},
			//网络查询单词意思
			_queryNewWords(query, appid, salt, from, to, sign) {
				var url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
				axios.get(url, {
					params: {
						q: query,
						appid: appid,
						salt: salt,
						from: from,
						to: to,
						sign: sign
					}
				}).then((res) => {
					var word_mean = res.trans_result[0].dst;	
					var word = res.trans_result[0].src;
					// console.log(word_mean)
					// console.log(word)
					this.newWord = word
					this.newWord_mean = word_mean
				})
			},
			selectText(e) {
				var selectedText = this.funGetSelectText();
				if(selectedText){
					// 去除标点符号
					var reg = /\.|\,|\?|\,|\．|\?|\!/g;
					selectedText = selectedText.replace(reg, ' '); 
					selectedText = String.trim(selectedText);
					// 找出第一个单词
					var firstWord = selectedText.split(' ')[0];
					var newWord = firstWord.charAt(0).toLowerCase() + firstWord.substring(1);
					// 给百度翻译发送请求翻译
					var appid = '2015063000000001';
					var key = '12345678';
					var salt = (new Date).getTime();
					var query = newWord;
					var from = 'en';
					var to = 'zh';
					var str1 = appid + query + salt +key;
					var sign = MD5(str1);	
					// console.log(query)
					this._queryNewWords(query, appid, salt, from, to, sign)		

					// 获取鼠标坐标
			        var x = e.pageX;
			        var y = e.pageY;	
			        this.styleObj = {
			        	position: 'fixed',
			        	display: 'block',
			        	left: (x + 10) + 'px',
			        	top: (y +10) + 'px'
			        }	
					
				}
			},
			hiddenHint() {
				this.styleObj = {
					display: 'none',
				}
			},
			addNewWords() {
				this._addNewWord()

			},
			showWordsBook() {
				this.showNewWordBook = true
			},
			closeNewWordBook() {
				this.showNewWordBook = false
			}
		},
		created() {
			this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
			this.userId = this.userMsg.id
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
	.artical-box > .hint {
		display: none;
		position: relative;
		box-sizing: border-box;
		color: #fff;
		width: 276px;
		height: 172px;
		line-height: 30px;
		text-align: center;
		padding: 10px;
		background-color: #008D72;
		border-radius: 5px;
	}
	.artical-box > .hint > .word {
		border-bottom: 1px solid #fff;
	}
	.artical-box > .hint > .mean {

	}
	.artical-box > .hint > .add_word {
		display: inline-block;
		width: 146px;
		height: 30px;
		color: #008D72;
		margin-top: 50px;
		background-color: #fff;
		border-radius: 15px;
		cursor: pointer;
	}
	.artical-box > .hint > .close {
		position: absolute;
		top: 6px;
		right: 20px;
		cursor: pointer;
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
	.artical > .content > .select-text {
		user-select: text;
		/*color: red;
		background-color: red;*/
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