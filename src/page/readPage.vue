<template>
  <div class="read">
    <div class="content-box">
    	<div class="left">
    		<ul >
    			<li class="grade" v-for="(grade, index) in gradeList" @click="selectGrade(index)">
    				+ <span>{{grade.name}}阅读</span>
					<ul class="gradeList" :data-flag="2" ref="grades">
						<li class="gradeItem" v-for="item in grade.type" @click.stop="selectGragetype(item)">{{item.name}}</li>
					</ul>
    			</li>
    		</ul>
    	</div>
    	<div class="right">
    		<div class="toptitle">
    			{{gradeType}}
    		</div>
    		<div class="option">
    			<!-- <div class="speed">
    				<span>基础阅读速度：50词/分钟</span>
    				<span class="changeSpeed">修改速度</span>
    			</div> -->
                <span class="wordbook" @click="toNewWordBook">生词本</span>
    		</div>
    		<div class="book">
    			<div class="book-box" v-for="item in artical" @click="showArtical(item)">
    				<img :src="item.allow == 1 ? bookUrl.url2 : bookUrl.url1" alt="">
    				<p>{{item.title}}</p>
    			</div>
    		</div>
    	</div>
        <newwordbook v-if="showNewWordBook" v-on:hidden="closeNewWordBook"></newwordbook>
        <router-view></router-view>
    </div>
    
  </div>
</template>


<script>
    import axios from 'axios'
    import url from '@/api/url'
    import newwordbook from '@/page/readNewWord'
 	export default {
 		data() {
 			return {
                userMsg: {},
                gradeList: [],
                showGrade1: false,
                showGrade2: true,
                showGrade3: false,
                gradeType: '一年级',
                artical: [],
                bookUrl: {
                    url1: '../../static/img/reading/book_default.png',
                    url2: '../../static/img/reading/book_active.png'
                },
                showNewWordBook: false
 			}
 		},
        components: {
            newwordbook
        },
        methods: {
            _getreadtype() {
                var readTypeUrl = url.url1
                axios.get(readTypeUrl, {
                    params: {
                        method: 'getreadtype'
                    }
                }).then((res) => {
                    this.gradeList = res.data
                })
            },
            _getArticle(typeId) {
                var readingUrl = url.url1;
                var userId = 1;
                axios.get(readingUrl, {
                    params: {
                        method: 'getreading',
                        user_id: userId,
                        type_id: typeId
                    }
                }).then((res) => {
                    this.artical = res.data
                })
            },
            
            selectGrade(index) {
                var ele = this.$refs.grades[index]
                var flag = ele.getAttribute('data-flag');
                if (flag == 2) {
                    ele.style.display = "block"
                    ele.setAttribute('data-flag', 1)
                }else {
                    ele.style.display = "none"
                    ele.setAttribute('data-flag', 2)
                }
            },
            selectGragetype(item) {
               this.gradeType = item.name
               this._getArticle(item.id)
            },
            showArtical(item) {
                var allow = item.allow
                if(allow == 1) {
                    console.log(item);
                    var article = JSON.stringify(item);
                    sessionStorage.setItem('article', article)
                    this.$router.replace('/home/readpage/article');
                }
            },
            toNewWordBook() {
               this.showNewWordBook = true
            },
            closeNewWordBook() {
                this.showNewWordBook = false
            }

        },
        created() {
            this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
            this._getreadtype();
            this._getArticle(4)
            
        }
 	}
</script>

<style  scoped>
 .read {
    position: relative;
    background-color: #efefef;
 }
 .content-box {
    position: relative;
    width: 1000px;
    margin: auto;
    height: 500px;
    padding: 15px 0;
 }
 .content-box:after {
    display: inline-block;
    content: "";
    width: 0;
    height: 0;
    clear: both;
 }
 .content-box > .left {
    float: left;
    width: 260px;
    height: 500px;
    box-sizing: border-box;
    padding: 15px 30px;
    margin-right: 10px;
    background-color: #fff;
 }
 .content-box > .left  ul {
    padding: 0;
    list-style-type: none;
    cursor: pointer;
 }

 .content-box > .left .grade {
    font-size: 16px;
    line-height: 1.5;
    margin: 10px auto;
 }

 .content-box > .left .grade span {
    margin-left: 10px;
 }
 .content-box > .left .grade .gradeList {
    display: none;
    margin: 3px auto;
 }

 .content-box > .left .grade .gradeList .gradeItem {
    padding-left: 20px;
    font-size: 14px;
    line-height: 1.6;
 }

 .content-box > .right {
    float: right;
    box-sizing: border-box;
    padding: 20px 0;
    width: 730px;
    height: 500px;
    font-weight: bold;
    background-color: #fff;
 }
.content-box > .right > .toptitle {
    height: 36px;
    font-size: 20px;
    font-weight: 200;
    text-align: center;
}

.content-box > .right > .option {
    height: 36px;
    line-height: 36px;
    padding: 0 70px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.content-box > .right > .option > .speed {
    font-size: 14px;
    display: inline-block;
    width: 500px;
    text-align: left;
}

.content-box > .right > .option > .speed > .changeSpeed {
    margin-left: 20px;
    text-decoration: underline;
    cursor: pointer;
}
.content-box > .right > .option > .wordbook {
    font-size: 14px;
    width: 100px;
    margin-left: 25px;
    cursor: pointer;
}

.content-box > .right > .book {
    margin: 0 20px;
}

.content-box > .right > .book > .book-box {
    float: left;
    margin: 30px 50px;
    text-align: center;
    width: 120px;
    height: 136px;
    border: 2px solid #ccc;
}

.content-box > .right > .book > .book-box > img {
    width: 52px;
    height: 64px;
    margin: 20px 0 10px 0;
}

.content-box > .right > .book > .book-box > p {
    font-size: 14px;
}
.content-box > .right > .book > .book-box.active {
    background-color: #9ce8f6;
}
</style>