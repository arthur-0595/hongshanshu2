<template>
	<div class="artical" @click="hiddenMsgBox">
		<h1 class="title">效果检测</h1>
		<div class="content">
			<form action="">
				<div class="question" v-for="question in questions" >
					<label for="" class="questionText">{{question.question}}</label>
					<div class="radioItem" v-for="item in question.answers">
						<input type="radio" :name="question.id" :value="item.answer" @click="checkAnswer(question.id, item)"> {{item.answer}}
					</div>
				</div>
			</form>
			
		</div>
		<div class="closeBtn" @click="close">X</div>
		<div class="controlBtn">
			<div class="btn" @click="sortNewWords">筛选生词</div>
			<div class="btn" @click="lookArtical">查看文章</div>
			<div class="btn" @click.stop="referAnswers">交  卷</div>
		</div>
		<div class="msg" v-if="showMsg">
			<ul>
				<li v-for="item in errorsArr">第{{item}}题：错误</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import url from '@/api/url'
	export default {
		name: 'artical',
		data() {
			return {
				article: {},
				readId: 0,
				questions: [],
				errorsArr: [],
				correctArr: [],
				showMsg: false,
				flag: true, //设置交卷标志位，只能交一次卷
			}
		},
		methods: {
			_getreadingquestion(readId) {
                var testUrl = url.url1
                axios.get(testUrl, {
                    params: {
                        method: 'getreadingsubject',
                        read_id: readId
                    }
                }).then((res) => {
                    this.questions = res.data
                    console.log(this.questions)
                })
            },
            //数组去重函数
            _unique(arr) {
            	var uniqueArr = []
            	for(var i = 0; i < arr.length; i++) {
            		if(uniqueArr.indexOf(arr[i]) == -1) {
            			uniqueArr.push(arr[i])
            		}
            	}
            	return uniqueArr
            },
            //数组排序函数
            _indexSort(arr) {
            	var newArr = []
            	newArr = arr.sort(function(val1, val2){
            		return val1 - val2
            	})
            	return newArr
            },
            sortNewWords() {
            	this.$router.replace('/home/readpage/sortwords')
            },
            lookArtical() {
            	alert(this.article.article)
            },
            referAnswers() {
            	if(this.errorsArr.length <= 0 || !this.flag) {
            		return
            	}
            	var newErrorsArr = Array.prototype.concat.apply([],this.errorsArr)
            	var uniqArr = this._unique(newErrorsArr)
            	var indexArr = this._indexSort(uniqArr)
            	this.errorsArr = indexArr
            	this.showMsg = true
            	this.flag = false
            	// console.log(indexArr)

            },
            checkAnswer(id, item) {
            	// console.log(id)
            	// console.log(item.correct)
            	if(item.correct == 1) {
            		this.correctArr.push(id)
            		
            	}else{
            		this.errorsArr.push(id)
            	}
            },
            hiddenMsgBox() {
            	this.showMsg = false
            },
            close() {
            	this.$router.replace('/home/readpage/article')
            }
		},
		created() {
			this.article = JSON.parse(sessionStorage.getItem('article'))
			this.readId = this.article.id
			this._getreadingquestion(this.readId)
		}
	}
</script>

<style scoped>
	.artical {
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		color: #018D72;
		font-size: 18px;
		line-height: 1.6;
		text-align: left;
		width: 1006px;
		height: 500px;
		margin: 15px auto;
		padding: 36px 76px;
		background-color: #fff;
	}
	.artical > .title {
		position: relative;
		font-size: 30px;
		text-align: left;
	}

	.artical > .content {
		position: relative;
		width: 800px;
		height: 260px;
		padding: 30px;
		border-bottom: 1px solid #eee;
		border-top: 1px solid #eee;
		overflow: auto;
	}

	.artical > .content  .question {
		font-size: 20px;
		margin: 10px 0;
		color: #000;
	}
	.artical > .content  .question > .questionText {
		font-weight: bold;
		font-size: 24px;
		line-height: 1.6;
	}

	.artical > .content  .question > .radioItem {
		margin: 6px 0;
	}
	.artical > .closeBtn {
		position: absolute;
		top: 15px;
		right: 20px;
		font-size: 36px;
		font-weight: 100;
		color: #000;
		cursor: pointer;
	}
	.controlBtn > .btn {
		float: left;
		color: #fff;
		width: 230px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		background-color: #FDAE38;
		margin: auto;
		margin-top: 30px;
		margin-right: 80px;
		cursor: pointer;
		cursor: pointer;
	}
	.controlBtn > .btn:last-child {
		margin-right: 0;
	}

	.artical  .msg {
		position: fixed;
		left: 50%;
		top: 30%;
		width: 200px;
		height: 220px;
		margin-top: -20px;
		border: 2px solid #ccc;
		text-align: center;
		padding: 20px 0;
		overflow: auto;
	}
	.artical  .msg li {
		color: #000;
		height: 32px;
	}
</style>