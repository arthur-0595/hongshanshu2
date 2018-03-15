<template>
	<div class="box-wrapper">
		<!--中间-->
		<div class="topBox">
			<div class="top">
				<span class="name">旅游基础用语 - {{type.spoke_name}} - {{typeItem.spoke_name}}</span>
				<span class="title">闯关测试</span>
				<span class="quit" @click="close">退出</span>
			</div>
		</div>
		<div class="wraper">			
			<div class="scoreBox clearfix">
				<span class="score">得分：<i>{{score}}分</i></span>
				<span class="wrongNum">错误{{errorNum}}题</span>
				<span class="rightNum">正确{{rightNum}}题</span>				
			</div>
			<ul class="items">
				<li :class="[styleArr[item.type]]" v-for="(item, key) in answerData">
					<div class="line">
						<span class="num">{{item.content.id}}</span>
						<span class="laba laba1" @click="play(key)"></span>
						<span class="topic">{{item.content.sentence}}</span>
						<span class="isCorrect" v-if="styleArr[item.type] !== 'unsel'"></span>
						<span class="isCorrect" v-else>(未选)</span>
					</div>
					<!-- <div class="line myLine">您能给我订一张去洛杉矶的往返机票吗？</div> -->
					<div class="line correctLine">{{item.content.sentence_mean}}</div>
				</li>
				<!-- <li class="error">
					<div class="line">
						<span class="num">11.</span>
						<span class="laba"></span>
						<span class="topic">Could you book me a round trip flight to Los Angel</span>
						<span class="isCorrect"></span>
					</div>
					<div class="line myLine">您能给我订一张去洛杉矶的往返机票吗？</div>
					<div class="line correctLine">您能给我订一张去洛杉矶的往返机票吗？</div>
				</li>
				<li class="unsel">
					<div class="line">
						<span class="num">11.</span>
						<span class="laba laba1"></span>
						<span class="topic">Could you book me a round trip flight to Los Angel</span>
						<span class="isCorrect">(未选)</span>
					</div>
					<div class="line correctLine">您能给我订一张去洛杉矶的往返机票吗？</div>
				</li>
				<li class="error">
					<div class="line">
						<span class="num">11.</span>
						<span class="laba laba1"></span>
						<span class="topic">Could you book me a round trip flight to Los Angel</span>
						<span class="isCorrect"></span>
					</div>
					<div class="line myLine">您能给我订一张去洛杉矶的往返机票吗？</div>
					<div class="line correctLine">您能给我订一张去洛杉矶的往返机票吗？</div>
				</li> -->
			</ul>
		</div>
		<audio :src="audioUrl" autoplay="autoplay" ref="audio"></audio>		
		<!-- 底部-->
	    <footer class="footer">
	    	<div class="footer1"></div>
	    	<div class="footer2">
	    		<div class="footer-con clearfix">
	    			<div class="footerLogo"></div>
	    			<div class="footer-txt">
	    				<p>推荐使用IE9及以上浏览器 <span>字体音标</span> <span>下载 Flash学习插件下载</span></p>
						<p>红杉树智能英语教育机构 北京国音红杉树教育科技有限公司 版权所有</p>
						<p>本网站常年法律顾问：北京市百瑞律师事务所 康文瑛律师 | <span>律师声明</span> | 京ICP备16025391号-1</p>
					</div>
	    		</div>
	    	</div>
	    </footer>
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
				answerData: [],
				uncheck: true,
				styleArr: ['correct', 'error', 'unsel'],
				audioUrl: '',
				score: 0,
				errorNum: 0,
				rightNum: 0,
                audioSrc: this.$url.url2
			}
		},
		methods: {
			//保存闯关分数
			_saveCourse(typeId, score) {
				var url = this.$url.url2 + '/Areas/Api/Index.ashx';
				axios.get(url, {
					params: {
						method: 'SaveCourse',
						user_id: this.userId,
						type_id: typeId,
						score: score
					}
				}).then((res) => {
					console.log(res.data)
				})
			},
			//计算闯关分数
			computeScore(arr) {
				var total = arr.length
				for(var i=0; i < total; i++){
					if(1 == arr[i].type) {
						this.rightNum++
					}else{
						this.errorNum++
					}
				}
				this.score = (this.rightNum / total)*100
			},
			play(index) {
				var url = this.answerData[index].content.sentence_url + ''
                // http://106.15.91.62:8012
                // this.$url.url2
				var formatUrl = 'http://106.15.91.62:8012' + url.replace(/\\/g, '/')
                console.log(formatUrl)
				this.audioUrl = formatUrl
			},
			close() {
				this.$router.replace('/home/homeExtendTongue');
			}
		},
		created() {
			this.userId = JSON.parse(sessionStorage.getItem('userMsg')).ID
			this.type = JSON.parse(sessionStorage.getItem('selectedSpokeType'))
			this.typeItem = JSON.parse(sessionStorage.getItem('selectedSpokeTypeItem'))
			this.answerData = JSON.parse(sessionStorage.getItem('answerArr'))
			console.log(this.answerData)
			this.computeScore(this.answerData)
			this._saveCourse(this.typeItem.id, this.score)
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.box-wrapper {
		width:100%;
		height:100%;
		background-color: #fff;
		position: relative;
	}
	.topBox{
    	width:100%;
    	background-color: #008c72;
    	position: fixed;
    	top:0;
    	z-index: 1;
    }
    .topBox .top{
    	width: 1000px;
    	height: 40px;
    	margin:0 auto;	        	
    	line-height: 40px;
    	color:#fff;
    	position: relative;
    }
   .topBox .top .title{
    	display: block;
    	width:100%;
    	text-align: center;
    	font-size: 16px;
    }
   .topBox .top .name{
    	position: absolute;
    	top:0;left:20px;
    	font-size: 14px;
    }
    .topBox .top .quit{
    	position: absolute;
    	top:0;right:20px;
    	width:60px;height:26px;
    	background-color: darkorange;
    	font-size: 14px;
    	margin-top: 7px;
    	line-height: 26px;text-align: center;
    	cursor: pointer;
    }
    .topBox .top .quit:hover{
    	background-color: orange;
    }
    
    .wraper{
    	width:1000px;
    	min-height:960px;
    	background-color: #fff;
    	margin:50px auto 0;
    	box-sizing: border-box;
    	z-index: 2;
    }
    .scoreBox{
    	width: 100%;
    	height: 60px;
    	border-bottom:1px solid #ddd;
    	line-height: 60px;
    	padding: 0 20px;
    	box-sizing: border-box;
    	font-size:14px;
    }
    .scoreBox .score{
    	float:left;
    	font-size:24px;
    }
    .scoreBox .score>i{
    	color:red;
    	font-size:28px;
    }
    .scoreBox .wrongNum{
    	float:right;
    	margin-left:20px;
    	color:red;
    }
    .scoreBox .rightNum{
    	float:right;
    	color:#008c72;
    }
    .items{
    	width: 98%;
    	margin:20px auto;
    	border:1px solid #ddd;
    	display: flex;
    	justify-content: flex-start;
    	flex-wrap: wrap;
    	z-index:4;
    }
    .items>li{
    	width:50%;
    	padding:30px 0;
    	background-color: #eee9e3;
    	border-right:1px dashed #959595;
    	border-top:1px dashed #959595;
    	box-sizing: border-box;
    	font-size:14px;
    	color:#666;
    	position: relative;
    	cursor: pointer;
    }
    .items>li:nth-child(2n){
    	border-right:none;
    }
    .items>li:nth-child(1),
    .items>li:nth-child(2){
    	border-top:none;
    }
    .items>li .line{
    	width:100%;
    	line-height: 30px;
    	padding-left: 76px;
    	padding-right: 38px;
    	box-sizing: border-box;
    }
   .items>li .line.myLine,
   .items>li .line.correctLine
   {
    	margin-top:10px;
    }
    .items>li .line .num{
    	position: absolute;
    	top:30px;left:12px;
    	font-weight:600;
    	color:#333;
    	font-family: "SimSun";
    	width: 30px;
		text-align: right;
    }
    .items>li .line .laba{
    	position: absolute;
    	top:30px;left:40px;
    	width:30px;height:30px;
    	background-repeat: no-repeat;
    	background-position: center center;
    	background-size:20px 20px;
    	background-image:url(../../static/img/study/deep-laba1.png);
    	cursor: pointer;
    }
    .items>li .line .laba:hover{
    	opacity: .8;
    }
    .items>li .line .laba.laba1{
    	background-image:url(../../static/img/study/deep-laba2.png);
    }
    .items>li .line .isCorrect{
    	position: absolute;
    	top:30px;right:6px;
    	width:40px;height:30px;
    	background-repeat: no-repeat;
    	background-position: center center;	        	
    }
    /*答对*/
    .items>li.correct .line .isCorrect{
    	background-image:url(../../static/img/study/right-img.png);
    }
    .items>li.correct .line.myLine{
    	color:#008c72;	        	
    }
    /*答错*/
    .items>li.error .line .isCorrect{
    	background-image:url(../../static/img/study/error-img.png);
    }
    .items>li.error .line.myLine{
    	color:red;	        	
    }
    /*未选*/
    .items>li.unsel{
    	background-color: #fdfbf4;
    }
    .items>li.unsel .line .isCorrect{
    	color:red;
    }	        
    .items>li:hover{
    	background-color: #e2e2e2;	        	
    }
	/*底部*/
   .footer{
   		width:100%;
   		height:120px;
   }
   .footer > .footer1{
   		width:100%;
   		height:20px;
   		background-color: #008c72;      		
   }
   .footer > .footer2{
   		width:100%;
   		height:100px;
   		background-color: #333;      		
   }
   .footer > .footer2 > .footer-con{
   		width:800px;
   		margin:0 auto;
   		height:100%;
   }
   .footer > .footer2 > .footer-con >.footerLogo{
   		float:left;
   		width:268px;
   		height:100%;
   		background: url(../../static/img/foot-logo.png) no-repeat center left;       		
   }
   .footer > .footer2 > .footer-con >.footer-txt{
   		float:right;
   		color:#999;
   		font-size: 12px;
   		line-height: 20px;
   		margin-top:20px;
   }
   .footer > .footer2 > .footer-con >.footer-txt  span:hover{
   	    cursor: pointer;
		color: #ff9900;
   }
</style>