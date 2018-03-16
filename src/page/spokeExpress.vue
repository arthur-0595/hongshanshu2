<template>
	<div class="box-wrapper">
		<!--中间-->
		<div class="centerBox">
			<!--学习的单元名字-->
			<div class="nameBox">
				<div class="deviceName">口语表达</div>
				<div class="version">旅游基础用语 - {{listenData[0].type}} - {{listenData[0].spoke_name}}</div>
				<div class="rightBtn clearfix">
					<!--<span class="help"></span>-->
					<span class="close" @click="close"></span>
				</div>
			</div>
			<!--要学习的主要内容-->
			<div class="mainCon clearfix">
				<div class="leftCon">
					<p class="enSentence"> {{listenData[listenIndex].sentence_mean}} </p>
					<p class="chSentence" v-if="isMean"> {{listenData[listenIndex].sentence}} </p>
					<p class="tip">{{ tipMsg }}</p>
				</div>
				<div class="btnBox">
					<div class="btn readBtn1" @click="play"></div>
					<ul class="isKnow" v-if="isKnow">
						<li class="btn know" @click="isKnowEvent"></li>
						<li class="btn unknow" @click="unKnowEvent"></li>
					</ul>
					<ul class="isRight" v-if="isRight">
						<li class="btn yes" @click="isRightEvent"></li>
						<li class="btn no" @click="errorEvent"></li>
					</ul>
					<div class="btn forword" v-if="isNext" @click="next"></div>
				</div>
			</div>
			<!--底部内容-->
			<div class="botInfo">
				<span>学习时长： {{studyTime.h}} : {{studyTime.m}} : {{studyTime.s}}</span>
				<span>学习进度：{{listenIndex + 1}} / {{ listenData.length }} </span>
			</div>
			<audio :src="audioSrc + formatListenUrl" id="audio" autoplay="autoplay" ref="audio"></audio>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'spokeListen',
		data() {
			return {
				userId: 1,
				typeId: 10,
				listenIndex: 0,
				listenData: [
					{
						id: 181,
						sentence: 'Thank you for everything',
						sentence_mean: '感谢您为我做的一切',
						sentence_url: "",
						spoke_name: "分别",
						type: '基本会话',
						user_id: 3

					}
				],
				isKnow: true,
				isRight: false,
				isNext: false,
				isMean: false,
				tipMsg: '这句话的英文意思你知道吗？',
				timer: 0, //计时器
				studyTime: { //学习时长
					h: '00',
					m: '00',
					s: '00'
				},
				audioSrc: this.$url.url2
			}
			
		},
		computed: {
			//转换音频地址格式
			formatListenUrl: function() {
				var index = this.listenIndex
				var url = this.listenData[index].sentence_url
				var formatUrl = url.replace(/\\/g, '/')
				return formatUrl
			}
		},
		methods: {
			_GetStartByWay() {
				var url = this.$url.url2 +'/Areas/Api/Index.ashx'
				axios.get(url, {
					params: {
						method: 'GetStartByWay',
						user_id: this.userId,
						type_id: this.typeId,
						way_id: 3
					}
				}).then((res) => {
					if(this.listenData.length <= 1){
						console.log("无数据")
						return
					}
					this.listenData = res.data
					// console.log(this.listenData)

				})
			},
			_GetKnow(isKnow, itemId) {
				var url = this.$url.url2 + '/Areas/Api/Index.ashx'

				axios.get(url, {
					params: {
						method: 'GetKnow',
						id: itemId,
						way_id: 3,
						is_know: isKnow,
					}
				}).then((res) => {
					if(res.data.msg == '更新失败'){
						console.log(res.data.msg)
					}	
				})
			},
			_formatTime(t) {
				var strT = t + ''
				var n = strT.length
				if(n>=2){
					return strT
				}else{
					return '0' + strT
				}
			},
			_studyTime() {
				var total = 0;
				var that = this
				this.timer = setInterval(function() {
					total = total +1
					var h = that._formatTime(Math.floor(total / 3600))
					var m = that._formatTime(Math.floor((total % 3600) / 60))
					var s = that._formatTime((total % 3600) % 60)
					that.studyTime = {
						h: h,
						m: m,
						s: s
					}
				}, 1000)
			},
			play() {
				this.$refs.audio.play()
			},
			close() {
				this.$router.replace('/home/homeExtendTongue')
				clearInterval(this.timer)
			},
			isKnowEvent() {
				this.isKnow = false
				this.isRight = true
				this.isMean = true
				this.tipMsg = '你的回答是否正确？'
				this._GetKnow(1, this.listenData[this.listenIndex].id)
			},
			unKnowEvent() {
				this.isKnow = false
				this.isNext = true
				this.isMean = true
				this.tipMsg = '请跟读两遍'
				this._GetKnow(2, this.listenData[this.listenIndex].id)
			},
			isRightEvent() {
				this.isRight = false
				this.isKnow = true
				this.next()
				this._GetKnow(1, this.listenData[this.listenIndex].id)
			},
			errorEvent() {
				this.isRight = false
				this.isNext = true
				this.tipMsg = '请跟读两遍'
				this._GetKnow(2, this.listenData[this.listenIndex].id)
			},
			next() {
				if(this.listenIndex>= this.listenData.length -1) {
					return
				}
				this.isNext = false
				this.isKnow = true
				this.isMean = false
				this.tipMsg = '这句话的中文意思你知道吗？'
				this.listenIndex++
				
			}

		},
		created() {
			this.userId = JSON.parse(sessionStorage.getItem('userMsg')).ID
			this.typeId = JSON.parse(sessionStorage.getItem('selectedSpokeTypeItem')).id
			this._GetStartByWay()
			this._studyTime()
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
		margin:10px auto;
		height:430px;				
	}
	.leftCon{
		float:left;
		width: 80%;
		height:100%;
		padding-top:70px;
		text-align: center;
		box-sizing: border-box;
	}
	.leftCon .enSentence{
		color:#f97d32;
		height:80px;
		line-height: 40px;
		font-size: 18px;
	}
	.leftCon .chSentence{
		margin-top: 20px;
		color:#999;
		height:20px;
		line-height: 20px;
		font-size: 18px;
	}
	.leftCon .tip{
		margin-top: 90px;
		color:#666;
		font-size: 14px;
	}
	/*右边按钮*/
	.btnBox{
		float:right;
		height:100%;
		width: 80px;
		margin-right: 30px;
	}
	.btnBox .btn{
		width:100%;
		height:80px;
		background-position: center center;
		background-repeat: no-repeat;
		margin-top:15px;
		cursor: pointer;
	}
	.btnBox .btn:hover{
		opacity: .8;
	}
	.btnBox .btn.readBtn{
		background-image:url(../../static/img/study/deep-laba1.png);
	}
	.btnBox .btn.readBtn1{
		background-image:url(../../static/img/study/deep-laba2.png);
	}
	.btnBox .btn.know{
		background-image:url(../../static/img/study/smile.png);
	}
	.btnBox .btn.unknow{
		margin:0;
		background-image:url(../../static/img/study/cry.png);
	}
	.btnBox .btn.yes{
		background-image:url(../../static/img/study/correct.png);
	}
	.btnBox .btn.no{
		margin:0;
		background-image:url(../../static/img/study/wrong.png);
	}
	.btnBox .btn.forword{
		margin-top: 150px;
		background-image:url(../../static/img/study/forward.png);
	}
	/*底部信息*/
	.botInfo{
		color:#666;
		font-size:14px;
		width:40%;
		margin:0 auto;
	}
	.botInfo>span{
		margin-right:50px;
	}
</style>