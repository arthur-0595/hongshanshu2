<template>
  <div class="myInfoWrapper" id="home-person-center">
    <div class="myInfoBox">
      <div class="topTip">亲爱的同学：您好！为了给您提供更好的学习服务，请您先完善个人信息。</div>
      <div class="infoBar">
      <!--infoImage 默认填写的信息 infoImage2 选填细信息 infoImage3 领金币-->
        <div class="infoImage infoImage2"></div>
          <ul class="markList clearfix">
            <li class="left">必填信息</li>
            <li class="center">选填信息</li>
            <li class="right">金币已领</li>
          </ul>
        </div>
      <!-- 账号信息列表 -->
      <ul class="infoList">
        <li>
          <div class="nameBox clearfix">
            <span class="name">账号信息/Account information</span>
            <span class="showMoreBtn" :class="{showMoreBtn1: showMore1}" @click="showMore1 = !showMore1"></span>
          </div>
          <ul class="itemList" :class="{showMoreList: showMore1}">
            <li><span>账号ID： </span> {{userMsg.S_code}}</li>
            <li><span>账号有效期：</span> {{userMsg.S_longtime.replace(/T/g, ' / ')}} </li>
            <li><span>积分：</span> {{userMsg.Integral}}</li>
            <li><span>积分等级：</span> {{userMsg.Grade}} </li>
            <li><span>今日积分：</span> {{userMsg.Today_Integral}} </li>
          </ul>
        </li>
        <li>
          <div class="nameBox clearfix">
            <span class="name">修改密码/Password management</span>
            <span class="showMoreBtn" :class="{showMoreBtn1: showMore2}" @click="showMore2 = !showMore2"></span>
          </div>
          <ul class="itemList" :class="{showMoreList: showMore2}">
            <li>
              <span>原密码：</span>
              <input type="password" ref="oldPwd" />
              <span class="red">{{showOldPwdMsg}}</span>
            </li>
            <li>
              <span>新密码：</span>
              <input type="password" @blur="checkPwdFomat"  name="password" placeholder="以字母开头，长度在6-18之间" ref="newPwd"/>
              <span class="red" >{{ errorsOldPwd }}</span>
            </li>
            <li>
              <span>重复新密码：</span>
              <input type="password" @blur="checkNewPwd" ref="repeatPwd"/>
              <span class="red" v-if="showRepeatPwdMsg">两次密码不一致</span>
            </li>
            <li class="msg-box">
              <div class="save-btn" @click="changePwd">
                保存
                <span class="msg-con" :class="{sucess: msgPwd.type === 1}" v-if="showMsgPwd">{{msgPwd.content}}</span>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="nameBox clearfix">
            <span class="name">选填信息/Optional information</span>
            <span class="showMoreBtn" :class="{showMoreBtn1: showMore3}" @click="showMore3 = !showMore3"></span>
          </div>
          <ul class="itemList" :class="{showMoreList: showMore3}">
            <li class="portraitLine">
              <span>头像：</span>
              <img :src="portrait" alt="" @click="showImgbox = !showImgbox"/>
              <span class="iconTip">(点击更换头像)</span>
              <div class="imgList" id="imgList" v-show="showImgbox">
                <img src="../../static/img/me/1.png" @click="changePortrait(1)" alt=""/>
                <img src="../../static/img/me/2.png" @click="changePortrait(2)" alt=""/>
                <img src="../../static/img/me/3.png" @click="changePortrait(3)" alt=""/>
                <img src="../../static/img/me/4.png" @click="changePortrait(4)" alt=""/>
                <img src="../../static/img/me/5.png" @click="changePortrait(5)" alt=""/>
                <img src="../../static/img/me/6.png" @click="changePortrait(6)" alt=""/>
                <img src="../../static/img/me/7.png" @click="changePortrait(7)" alt=""/>
                <img src="../../static/img/me/8.png" @click="changePortrait(8)" alt=""/>
              </div>
            </li>
            <li>
              <span>昵称：</span>
              <input type="text" @blur="checkName" name="name" ref="s_name"/>
              <span  class="red" >{{ errorsName }}</span>
            </li>
            <li class="sex">
              <span>性别：</span>
              <select name="" id="" ref="s_sex">
                <option value="1"  selected="selected">男</option>
                <option value="2">女</option>
              </select>
            </li>
            <li>
              <span>家长手机：</span>
              <input type="tel" maxlength="14" @blur="checkPhone" name="phone" ref="s_phone"/>
              <span  class="red" >{{ errorsPhone }}</span>
            </li>
            <li>
              <span>QQ：</span>
              <input type="text" @blur="checkQQ"  name="qq" placeholder="" ref="s_qq"/>
              <span  class="red" >{{ errorsQQ }}</span>
            </li>
            <li>
              <span>邮箱：</span>
              <input @blur="checkEmail"  name="email" type="text" placeholder="" ref="s_email"/>
              <span  class="red" >{{errorsEmail}}</span>
             </li>
            <li>
              <span>地址：</span>
              <input type="text" ref="s_address" />
            </li>
            <li class="msg-box">
              <div class="save-btn" @click="save">
                保存
                <span class="msg-con" v-if="showMsgInfo">{{msgInfo.content}}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import url from '@/api/url'
  export default {
    name: 'home-person-center',
    components: {},
    data() {
      return {
        userMsg: {},
        showMore1: false,
        showMore2: false,
        showMore3: false,
        showImgbox: false,
        s_picurl: 1,
        portrait: '../../static/img/portrait-1.png',
        showOldPwdMsg: '',
        showRepeatPwdMsg: false,
        showMsgPwd: false,
        msgPwd: {
          type: 1, //1：成功 ， 2：失败
          content: '' //弹窗展示信息
        },
        showMsgInfo: false,
        msgInfo: {
          type: 3,
          content: ''
        },
        errorsOldPwd: '',
        errorsName: '',
        errorsPhone: '',
        errorsQQ: '',
        errorsEmail: '',
      }
    },
    methods: {
      checkPwdFomat() {
        console.log("blur")
        let str = this.$refs.newPwd.value
        console.log(str)
        let result = /^[a-zA-Z]\w{5,17}$/.test(str)
        console.log(result)
        if(!result) {
          this.errorsOldPwd = '以字母开头，长度在6-18之间，只能包含字符、数字和下划线'
          console.log(this.errorsOldPwd)
        }else{
          this.errorsOldPwd = ''
        }
      },
       checkName() {
        let str = this.$refs.s_name.value
        let result = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(str)
        if(!result) {
          this.errorsName = '只能中英文，数字，下划线，减号'
        }else{
          this.errorsName = ''
        }
      },
       checkPhone() {
        let str = this.$refs.s_phone.value
        let result = (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(str) && str.length == 11)
        if(!result) {
          this.errorsPhone = '必须是11位有效手机号码'
        }else{
          this.errorsPhone = ''
        }
      },
      checkEmail() {
        let str = this.$refs.s_email.value
        let result = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
        if(!result) {
          this.errorsEmail = '邮箱格式错误！'
        }else{
          this.errorsEmail = ''
        }
      },
      checkQQ() {
        let str = this.$refs.s_qq.value
        let result = (str.search(/^[1-9]\d{5,10}$/) != -1)
        if(!result) {
          this.errorsQQ = '必须是5-10位有效QQ号码'
        }else{
          this.errorsQQ = ''
        }
      },
      changePortrait(index) {
        this.s_picurl = index
        this.portrait = '../../static/img/me/'+ index +'.png'
        this.showImgbox = false
      },
       changePwd() {
        // console.log("changePwd")
        this.$ajax({
          method: 'GET',
          url: url.url1,
          params: {
            method: 'Editpwd',
            S_code: this.userMsg.S_code,
            pwd: this.$refs.oldPwd.value,
            newpwd: this.$refs.newPwd.value
          }
        }).then((res) => {
          console.log(res)
          let data = res.data
          switch (data.result) {
            case 0:
               this.msgPwd = {
                type: 2,
                content: '保存失败！'
               }
               this.showMsgPwd = true
              break;
            case 1:
               this.msgPwd = {
                type: 1,
                content: '保存成功！'
               }
               this.showOldPwdMsg = ''
               this.showMsgPwd = true
              break;
            case 2:
              this.msgPwd= {
                type: 2,
                content: '原密码错误！'
               }
               this.showOldPwdMsg = this.msgPwd.content
               this.showMsgPwd = true
              break;
            case 3:
               this.msgPwd = {
                type: 2,
                content: '不存在此用户！'
               }
               this.showMsgPwd = true
              break;
            default:
              this.msgPwd = {
                type: 2,
                content: '操作有误，请过段时间再试！'
               }
               this.showMsgPwd = true
              break;
          }
          
        })
      },
      checkNewPwd() {
        var newPwd = this.$refs.newPwd.value,
            repeatPwd = this.$refs.repeatPwd.value;
        if(newPwd === repeatPwd) {
          this.showRepeatPwdMsg = false
        }else{
          this.showRepeatPwdMsg = true
        }
      },
      save() {
        var name = this.$refs.s_name.value,
            sex = this.$refs.s_sex.value,
            phone = this.$refs.s_phone.value,
            qq = this.$refs.s_qq.value,
            email = this.$refs.s_email.value,
            address = this.$refs.s_address.value,
            picurl = this.s_picurl;

            console.log(name, sex, phone, qq, email, address, picurl)
 
        this.$ajax({
          method: 'GET',
          url: url.url1,
          params: {
            method: 'Editinfo',
            S_code: this.userMsg.S_code,
            S_name: name,
            S_sex: sex,
            S_phone: phone,
            S_qq: qq,
            S_email: email,
            S_address: address,
            S_picurl: picurl
          }
        }).then((res) => {
          console.log(res)
          let data = res.data
          switch (data.result) {
            case 0:
               this.msgInfo = {
                type: 2,
                content: '保存失败！'
               }
               this.showMsgInfo = true
              break;
            case 1:
               this.msgInfo = {
                type: 1,
                content: '保存成功！'
               }
              break;
            default:
              this.msgInfo = {
                type: 3,
                content: '操作有误，请过段时间再试！'
               }
               this.showMsgInfo = true
              break;
          }
          
        })
      },
      _getPwd() {
        aaa.get(url.url1,)
      }
    },
    created() {
      console.log(this)
      this.userMsg = JSON.parse(sessionStorage.getItem('userMsg'))
      console.log(this.userMsg)
       this.portrait =url.url2 + this.userMsg.S_picurl


    },
    mounted() {
      
    },
  }
</script>

<style scoped>
  body {
    background-color: #efefef;
  }
  
  ul, li{
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  .myInfoWrapper {
    width: 1000px;
    background-color: #fff;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .myInfoWrapper .myInfoBox {
    width: 100%;
    min-height: 640px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /*版本名字*/
  .topTip {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background-color: #008c72;
    padding-left: 16px;
    box-sizing: border-box;
  }

  /**/
  .infoBar {
    width: 547px;
    height: 60px;
    margin: 20px auto 0;
    /*border:1px solid red;*/
  }

  .infoBar .infoImage {
    width: 527px;
    height: 33px;
    margin: 0 auto;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: url(../../static/img/study/information-1.png);
  }

  .infoBar .infoImage.infoImage2 {
    background-image: url(../../static/img/study/information-2.png);
  }

  .infoBar .infoImage.infoImage3 {
    background-image: url(../../static/img/study/information-3.png);
  }

  .infoBar .markList {
    width: 100%;
    line-height: 28px;
  }

  .infoBar .markList > li {
    width: 33.33%;
    float: left;
    font-size: 14px;
    color: #666;
  }

  .infoBar .markList > li.left {
    text-align: left;
  }

  .infoBar .markList > li.center {
    text-align: center;
  }

  .infoBar .markList > li.right {
    text-align: right;
  }

  /*各类信息*/
  .infoList {
    width: 730px;
    margin: 0 auto;
  }

  .infoList > li {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-top: 20px;
    position: relative;
  }

  .infoList > li > .nameBox {
    line-height: 30px;
    background-color: #008c72;
    color: #fff;
    font-size: 16px;
    padding: 0 16px;
    box-sizing: border-box;
  }

  .infoList > li > .nameBox .name {
    float: left;
  }

  .infoList > li > .nameBox .showMoreBtn {
    float: right;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../static/img/study/up.png);
    opacity: .8;
  }

  .infoList > li .showMoreBtn:hover {
    opacity: 1;
  }

  .infoList > li .showMoreBtn.showMoreBtn1 {
    background-image: url(../../static/img/study/down.png);
  }

  .infoList > li .itemList {
    padding: 40px 70px;
    box-sizing: border-box;
  }

  .infoList > li .itemList.showMoreList {
    display: none;
  }

  .infoList > li .itemList > li {
    line-height: 32px;
    margin: 10px 0;
    color: #666;
  }

  .infoList > li .itemList > li.portraitLine {
    height: 40px;
    line-height: 40px;
    position: relative;
    margin-bottom: 20px;
  }
  
  .infoList > li .itemList > li.sex{
    text-align: left;
    margin-bottom: 22px;
    margin-top: -5px;
  }

  .infoList > li .itemList > li.msg-box {
    text-align: center;
    margin-top: 30px;
  }
  
  .infoList > li .itemList > li.msg-box > .save-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin: auto;
    background-color: rgb(255, 140 , 0);
    cursor: pointer;
  }

  .infoList > li .itemList > li.msg-box > .save-btn > span {
    position: absolute;
    left: 100%;
    top: 0;
    width: 200px;
    height: 40px;
    text-align: left;
    padding-left: 20px;
    font-size: 12px;
    color: red;
  }

  .infoList > li .itemList > li > span {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    text-align: right;
  }

  .infoList > li .itemList > li > span.red {
    display: block;
    width: 100%;
    height: 20px;
    text-align: left;
    color: red;
    font-size: 12px;
    margin-left: 103px;
  }

  .infoList > li .itemList > li.portraitLine img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  .infoList > li .itemList > li.portraitLine img:hover {
    opacity: .8;
  }

  .infoList > li .itemList > li.portraitLine .imgList {
    position: absolute;
    z-index: 2;
    width: 225px;
    /*height: 251px;*/
    top: 48px;
    left: 104px;
    border: 1px solid #ccc;
    background: #fff;
    overflow-y: auto;
  }

  .infoList > li .itemList > li.portraitLine .imgList img {
    margin: 6px;
  }

  .infoList > li .itemList > li > .iconTip {
    font-size: 14px;
    color: #999;
    margin-left: 14px;
    text-align: left;
  }

  .infoList > li .itemList > li input {
    -webkit-appearance: none;
    outline: none;
    border: 1px solid #ddd;
    width: 340px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    font-size: 14px;
  }

  .infoList > li .itemList > li select {
    width: 58px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    padding: 0 6px;
    border: 1px solid #ddd;
  }

  .infoList > li .itemList > li select:focus,
  .infoList > li .itemList > li input:focus {
    border: 1px solid #02cca6;
    background-color: #dcf1e3;
    box-shadow: 0 0 12px #8c8c8c;
  }

  .save {
    width: 100px;
    background-color: darkorange;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    margin: 20px auto;
  }

  .save:hover {
    background-color: orange;
  }

  .myInfoWrapper > .msg-box {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 200px;
    margin-left: -150px;
    margin-top: -100px;
    background: red;
    text-align: center;
  }
  .myInfoWrapper > .msg-box  .sucess {
    color: #008C72;
  }
</style>

