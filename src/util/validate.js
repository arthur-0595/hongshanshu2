import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VeeValidate, { Validator } from 'vee-validate';
import Vue from 'Vue'

function validate() {
  Validator.addLocale(zh_CN);

  const config = {
      errorBagName: 'errors', // change if property conflicts.
      delay: 0,
      locale: 'zh_CN',
      messages: null,
      strict: true
  };
  Vue.use(VeeValidate,config);

//自定义中文提示语
  const dictionary = {
    zh_CN: {
      messages: {
        email: () => '邮箱有误',
        required:(field)=> "请输入"+field
      },
      attributes: {
        email: '邮箱'
      }
    }
    
  }

  Validator.updateDictionary(dictionary)

//验证扩展
  Validator.extend('phone', {
    messages: {
      zh_CN:field =>'必须是11位有效手机号码',
    },
    validate: value => {
      return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
    }
  });

  Validator.extend('password', {
    messages: {
      zh_CN:field =>'以字母开头，长度在6-18之间，只能包含字符、数字和下划线',
    },
    validate: value => {
      return /^[a-zA-Z]\w{5,17}$/.test(value)
    }
  });

  Validator.extend('name', {
    messages: {
      zh_CN:field =>'只能中英文，数字，下划线',
    },
    validate: value => {
      return /^[\u4e00-\u9fa5A-Za-z0-9_]*$/.test(value)
    }
  });

  Validator.extend('qq', {
    messages: {
      zh_CN:field =>'必须是5-10位有效QQ号码',
    },
    validate: value => {
      return (value.search(/^[1-9]\d{5,10}$/) != -1)
    }
  });
}

export default validate;