<template>
	<div class="box-wrapper">
		<div class="centerBox">
			<!--学习的单元名字-->
			<div class="nameBox">
				<div class="deviceName">跟读</div>
				<div class="version">旅游基础用语 - {{spokeType.spoke_name}} - {{spokeTypeItem.spoke_name}}</div>
				<div class="rightBtn clearfix">
					<!--<span class="help"></span>-->
					<span class="close" @click="close"></span>
				</div>
			</div>
			<!--要学习的主要内容-->
			<div class="mainCon clearfix">
				<div class="leftCon">
					<p class="enSentence"> {{ spokeData[indexSentence].sentence }} </p>
					<p class="chSentence">{{ spokeData[indexSentence].sentence_mean }}</p>
				</div>
				<div class="btnBox">
					<div class="rate">{{indexSentence + 1}} / {{spokeData.length}}</div>
					<div class="btn readBtn4" title="点击听句子" id="readBtn"  @click="play"></div>
					<div class="btn recordBtn" title="点击录音" style="visibility: auto;" @click="record"></div>
					<div class="btn listenBtn" title="收听自己的录音" style="visibility: auto;" @click="listenRecord"></div>
					<div class="btn contrast" title="对比" style="visibility: auto;"></div>
					<div class="forword">
						<span class="pre" title="上一句" style="visibility: auto;" @click="preSentence"></span>
						<span class="next" title="下一句" @click="nextSentence"></span>
					</div>
				</div>
			</div>
			<!-- <audio :src= "spokeData[indexSentence].sentence_url" id="audio" autoplay="autoplay" ref="audio"></audio> -->
			<audio :src= "audioSrc + spokeData[indexSentence].sentence_url" id="audio" autoplay="autoplay" ref="audio"></audio>
		</div>
	</div>
</template>

<script>
	import Record from '@/util/recordMedia.js'
	import axios from 'axios'
	export default {
		name: 'spokeRepeat',
		data() {
			return {
				spokeData: [],
				spokeType: {},
				spokeTypeItem: {},
				indexSentence: 0,
				flagNum: 1, //用于切换开始暂停录音
				tune: '',
				audioSrc: 'http://106.15.91.62:8012'
			}
		},
		methods: {
			preSentence() {
				if(this.indexSentence <= 0) {
					this.indexSentence = 0
				}else{
					this.indexSentence = this.indexSentence -1
				}
			},
			nextSentence() {
				if(this.indexSentence >= this.spokeData.length-1) {
					this.indexSentence = this.spokeData.length-1
				}else{
					this.indexSentence = this.indexSentence + 1
				}
			},
			play() {
				this.$refs.audio.play()
			},
			record() {
				if(this.flagNum % 2 != 0) {
					//开始录音
					Record.start(false)
					console.log("开始录音")
					this.flagNum = this.flagNum + 1
				}else{
					Record.stop(Record.play())
					console.log("结束录音")
					this.flagNum = this.flagNum + 1
				}
			},
			listenRecord() {

			},
			_saveRecord() {
				var url = this.$url.url2 + '/Areas/Api/Index.ashx';
				axios.post(url, {
					id: this.indexSentence,
					tape_url: Record.file
				}).then((res) => {
					console.log(res)
				})
			},
			_getTune() {
				var url = this.$url.url2 + "/Areas/Api/Index.ashx";
				axios.get(url, {
					params: {
						method: 'GetTuneIn',
						id: this.indexSentence 
					}
				}).then((res) => {
					console.log(res.data)
					this.tune = res.data
				})
			},
			close() {
				this.$router.replace('/home/homeExtendTongue');
			}
		},

		created() {
			this.spokeData = JSON.parse(sessionStorage.getItem('testSpokeData'))
			this.spokeType = JSON.parse(sessionStorage.getItem('selectedSpokeType'))
			this.spokeTypeItem = JSON.parse(sessionStorage.getItem('selectedSpokeTypeItem'))
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
		height:400px;				
	}
	.leftCon{
		float:left;
		width: 86%;
		height:100%;
		padding:100px;
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
		color:#999;
		line-height: 40px;
		font-size: 18px;
	}
	.btnBox{
		float:right;
		height:100%;
		width: 14%;
	}
	.btnBox .rate{
		color:#999;
		line-height: 30px;
		text-align: center;
	}
	.btnBox .btn{
		width:100%;
		height:60px;
		background-position: center center;
		background-repeat: no-repeat;
		margin-top:10px;
		cursor: pointer;
	}
	.btnBox .btn:hover,
	.btnBox .forword>span:hover{
		opacity: .8;
	}
	.btnBox .btn.readBtn4{
		background-image: url(../../static/img/study/pronunciation.png);
	}
	.btnBox .btn.readBtn3{
		background-image: url(../../static/img/study/pronunciation-3.png);
	}
	.btnBox .btn.readBtn2{
		background-image: url(../../static/img/study/pronunciation-2.png);
	}
	.btnBox .btn.readBtn1{
		background-image: url(../../static/img/study/pronunciation-1.png);
	}
	.btnBox .btn.recordBtn{
		background-image: url(../../static/img/study/record.png);
	}
	.btnBox .btn.recordBtn.recording{
		background-image: url(../../static/img/study/stop.png);
	}
	.btnBox .btn.listenBtn{
		background-image: url(../../static/img/study/hear-record.png);
		margin-top:40px;
	}
	.btnBox .btn.contrast{
		background-image: url(../../static/img/study/contrast.png);
	}
	.btnBox .forword{
		width:80px;
		height:40px;
		margin:10px auto 0;
	}
	.btnBox .forword>span{
		float:left;
		width:40px;
		height:40px;
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}
	.btnBox .forword>span.pre{
		background-image: url(../../static/img/study/arrows-l.png);
	}
	.btnBox .forword>span.next{
		background-image: url(../../static/img/study/arrows-r.png);
	}
</style>