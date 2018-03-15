<template>
	<div class="box-wrapper">
		<!--中间-->
		<div class="centerBox">
			<!--学习的单元名字-->
			<div class="nameBox">
				<div class="deviceName">闯关测试</div>
				<div class="version">旅游基础用语 - {{type.spoke_name}} - {{typeItem.spoke_name}}</div>
				<div class="rightBtn clearfix">
					<!--<span class="help"></span>-->
					<span class="close" @click="close"></span>
				</div>
			</div>
			<!--要学习的主要内容-->
			<div class="mainCon clearfix" >
				<div class="leftCon" v-if="showContentType1">
					<div class="readBtn" ref="playbtn" @click="play"></div>
					<ul class="items">
						<li ref="listItem" v-for="(item, key) in testData[testIndex].chinese" @click="selectItem(item, key)"><span></span> {{item.content}} </li>
					</ul>
				</div>
				<div class="leftCon_type2" v-else>
					<div class="readBtn" > {{testData[testIndex].sentence_mean}} </div>
					<ul class="items">
						<li  ref="listItem" v-for="(item, key) in testData[testIndex].urlpath" @click="selectItem(item, key)"><span class="radio"></span><span class="laba"></span></li>
					</ul>
				</div>
				<div class="btnBox">
					<div class="rate">{{testIndex + 1}}/{{testData.length}}</div>
					<div class="forword">
						<span class="pre" @click="pre"></span>
						<span class="next" @click="next"></span>
					</div>
				</div>
			</div>
			<audio :src="audioSrc + audioUrl" id="audio" autoplay="autoplay" ref="audio" @ended="endEvent" @play="palyEvent"></audio>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'spokeTest',
		data() {
			return {
				userId: 1,
				type: {},
				typeItem: {},
				testIndex: 0,
				testData: [
					{
						chinese: ''
					}
				],
				showContentType1: true,
				isActive: false,
				itemAudioUrl: '',
				timer: 1,
				rightArr: [],
				errorArr: [],
				checkAnswerArr: [],
				answerFlag: 2, // 0:错误， 1：正确， 2：未回答
				errText: '',
				audioSrc: 'http://106.15.91.62:8012'
			}
		},
		computed: {
			audioUrl: function() {
				if(!!this.showContentType1){
					var url = String(this.testData[this.testIndex].sentence_url)
					var formatUrl = url.replace(/\\/g, '/')
					return formatUrl
				}else{
					var url = String(this.itemAudioUrl)
					var formatUrl = url.replace(/\\/g, '/')
					return formatUrl
				}
			}
		},
		methods: {
			_GetSpokeTest() {
				var url = this.$url.url2 + '/Areas/Api/Index.ashx'
				axios.get(url, {
					params: {
						method: 'GetSpokenTest',
						type_id: this.typeItem.id,
					}
				}).then((res) => {
					this.testData = res.data
					console.log(this.testData)
				})
			},
			_autoPlayItem() {
				var audio = this.$refs.audio
				var sourceUrl = this.testData[this.testIndex].urlpath
				var n = sourceUrl.length
				var i = 0
				var that = this
				this.itemAudioUrl = sourceUrl[0].content
				audio.onended = function() {
					if(i <= n -2) {
						i++
						that.itemAudioUrl = sourceUrl[i].content	
					}else{
						return
					}
				}
			},
			// _playAnimation(el, oldClass, newClass) {
			// 	let i = 1
			// 	this.tiemer = setInterval(function(el) {
			// 		console.log(el)
			// 		if( i % 2) {
			// 			console.log(newClass)
			// 			console.log(oldClass)
			// 			el.setAttribute('class', 'newClass')
			// 			i++
			// 		}else{
			// 			el.setAttribute('class', 'oldClass')
			// 			i++
			// 		}
			// 	}(el), 300)
			// },
			_clearClass(items) {
				var n = items.length
				for(var i = 0; i < n; i++){
					items[i].setAttribute('class', '')
				}
			},
			_changeContentType() {
				if(this.testIndex > this.testData.length / 2){
					this.showContentType1 = false
					this._autoPlayItem()
				}else{
					this.showContentType1 = true
					
				}
			},
			selectItem(item, key) {
				var items = this.$refs.listItem
				this._clearClass(items)
				items[key].setAttribute('class', 'selItem')
				if(!!this.showContentType1){

				}else{
					this.itemAudioUrl = item.content
				}
				if(item.type == 0) {
					this.answerFlag = 0
				}else{
					this.answerFlag = 1
				}
				// console.log(item)
				// if(item.type == 0) {
				// 	this.checkAnswerArr[this.testIndex] = {
				// 		type: 0, // 0 答错
				// 		content: this.testData[this.testIndex]
				// 	}
				// }else{
				// 	this.checkAnswerArr[this.testIndex] = {
				// 		type: 1, // 1 答对
				// 		content: this.testData[this.testIndex]
				// 	}
				// }
				// console.log(this.checkAnswerArr)
				
			},
			pre() {
				var items = this.$refs.listItem
				this._clearClass(items)
				if(this.testIndex <= 0){
					return
				}
				this.testIndex--
				this._changeContentType()
			},
			next() {
				var items = this.$refs.listItem
				this._clearClass(items)
				// console.log(this.testIndex)
				this.checkAnswerArr[this.testIndex] = {
					type: this.answerFlag, 
					content: this.testData[this.testIndex]
				}
				// console.log(this.testIndex)

				this.testIndex++
				if(this.testIndex >= this.testData.length -1 ) {
					this.testIndex = this.testData.length-1
					var strArr = JSON.stringify(this.checkAnswerArr)
					sessionStorage.setItem('answerArr', strArr)
					this.$router.replace('/spokeSaveScore')
				}
				
				this.answerFlag = 2
				// console.log(this.checkAnswerArr)
				this._changeContentType()
			},
			play() {
				this.$refs.audio.play()
			},
			palyEvent() {

			},
			endEvent() {
				// console.log("ended")
				clearInterval(this.tiemer)
			},
			close() {
				this.$router.replace('/home/homeExtendTongue')
			},

		},
		created() {
			this.userId = JSON.parse(sessionStorage.getItem('userMsg')).ID
			this.type = JSON.parse(sessionStorage.getItem('selectedSpokeType'))
			this.typeItem = JSON.parse(sessionStorage.getItem('selectedSpokeTypeItem'))
			this._GetSpokeTest()
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.box-wrapper {
		width:100%;
		height:100%;
		background:url(../../static/img/study/space-bg.jpg) no-repeat 0 0/100% 100%;
		position: relative;
	}
	.centerBox{
		width: 870px;
		height:540px;				
		background: url(../../static/img/study/space-bg-small.png) no-repeat 0 0;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
	}
	.nameBox{
		width:94%;
		height:50px;
		line-height: 50px;
		position: relative;
		border-bottom:1px solid #ccc;
		margin:12px auto 0;
	}
	.nameBox .deviceName{
		font-size:16px;
		text-align: center;
		color:#666;
	}
	.version{
		color:#aaa;
		font-size:12px;
		position: absolute;
		top:0;left:2px;
	}
	.rightBtn{
		position: absolute;
		height:50px;
		top:0;right:2px;
	}
	.rightBtn>span{
		float:left;
		width:32px;
		height:100%;
		background-repeat: no-repeat;
		background-position: center center;
		cursor: pointer;
	}
	.rightBtn>span.help{
		background-image:url(../../static/img/study/help-light.png);
	}
	.rightBtn>span.close{
		background-image:url(../../static/img/study/close-light.png);
	}
	.rightBtn>span.help:hover{
		background-image:url(../../static/img/study/help-light-hover.png);
	}
	.rightBtn>span.close:hover{
		background-image:url(../../static/img/study/close-light-hover.png);
	}
	/*中间主要内容*/
	.mainCon{
		width: 94%;
		margin:40px auto;
		height:400px;				
	}
	.mainCon .leftCon{
		float:left;
		width: 80%;
		height:100%;
		padding-left:30px;
		box-sizing: border-box;
	}
	.mainCon .leftCon .readBtn{
		width: 60px;
		height: 60px;
		background-repeat: no-repeat;
		background-position: center center;
		background-image:url(../../static/img/study/deep-laba1.png);
		cursor: pointer;
	}
	.mainCon .leftCon .readBtn.readBtn1{
		background-image:url(../../static/img/study/deep-laba2.png);
	}
	.mainCon .leftCon .items{
		width:100%;	
		margin-top:16px;							
	}
	.mainCon .leftCon .items>li{
		line-height: 36px;
		color:#666;
		font-size: 16px;
		padding-left:34px;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
	}
	.mainCon .leftCon .items>li:hover{
		background-color: #ff9900;
		color:#fff;
	}
	.mainCon .leftCon .items>li>span{
		position: absolute;
		left:14px;top:12px;
		width:14px;
		height: 14px;
		background-color: #ccc;
		border-radius: 4px;
	}
	.mainCon .leftCon .items>li.selItem{
		color:#008C72;
	}
	.mainCon .leftCon .items>li.selItem>span{
		background-color: #008C72;
	}
	/*-------样式2----*/
	.mainCon .leftCon_type2{
		float:left;
		width: 80%;
		height:100%;
		padding-left:30px;
		box-sizing: border-box;
	}
	.mainCon .leftCon_type2 .readBtn{
		width: 100%;
		height: 60px;
		font-size: 16px;
		line-height: 60px;
		color:#666;
		padding-left:20px;
		box-sizing: border-box;
	}
	.mainCon .leftCon_type2 .items{
		width:100%;	
		/*margin-top:16px;*/							
	}
	.mainCon .leftCon_type2 .items>li{
		width:100%;
		height:48px;
		padding-left: 20px;
		box-sizing: border-box;
	}
	.mainCon .leftCon_type2 .items>li .radio{
		display: inline-block;
		width:14px;
		height: 14px;
		background-color: #ccc;
		border-radius: 4px;
		margin-top:17px;
		cursor: pointer;
	}
	.mainCon .leftCon_type2 .items>li .laba{
		display: inline-block;
		vertical-align: top;
		width: 60px;
		height: 48px;
		background-repeat: no-repeat;
		background-position: center center;
		background-image:url(../../static/img/study/deep-laba1.png);
		cursor: pointer;
	}
	.mainCon .leftCon_type2 .items>li .laba.laba1{
		background-image:url(../../static/img/study/deep-laba2.png);
	}
	.mainCon .leftCon_type2 .items>li.selItem .radio{
		background-color: #008C72;
	}
	.mainCon .btnBox{
		float:right;
		width:20%;
		height:100%;
		box-sizing: border-box;
		position: relative;
	}
	.mainCon .btnBox .rate{
		text-align: center;
		color:#999;
		line-height: 30px;
	}
	.btnBox .forword{
		position: absolute;
		bottom:50px;
		right:36px;
		width:80px;
		height:40px;
	}
	.btnBox .forword>span{
		float:left;
		width:40px;
		height:40px;
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}
	.mainCon .leftCon .readBtn:hover, .mainCon .leftCon_type2 .readBtn:hover,
	.btnBox .forword>span:hover{
		opacity: .8;
	}
	.btnBox .forword>span.pre{
		background-image: url(../../static/img/study/arrows-l.png);
	}
	.btnBox .forword>span.next{
		background-image: url(../../static/img/study/arrows-r.png);
	}
</style>