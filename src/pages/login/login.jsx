import React, { Component } from 'react'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import Taro, { } from '@tarojs/taro'
import './login.less'
import '../image/xuehao.png'
import '../image/mima.png'
import pic from '../image/登录.png'
import Fetch from '../../service/fetch';
import Base64 from 'base-64'
// import Login from '../../service/login';

export default class Login extends Component {
  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         userid: '',
  //         pwd: '',
  //     }
  // }

  componentWillMount () {
    if(Taro.getStorageSync('id') && Taro.getStorageSync('password')){
    this.setState({
      userid: Taro.getStorageSync('id'),
      password: Taro.getStorageSync('password'),
    })}
   }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
    constructor() {
    super(...arguments);
    this.state = {
      userid: '',
      password: '',
      // eslint-disable-next-line react/no-unused-state
    };
  }
  changeUserid(e) {
    let value = e.detail.value;
    this.setState({
      userid: value
    });
  }

  changePassword(e) {
    let value = e.detail.value;
    this.setState({
      password: value
    });
  }


  login() {
    const { userid, password } = this.state;
    // Base64.encode(this.state.password)
    // password = Taro.arrayBufferToBase64(password.split(""))
    if (userid && password) {
      // Login(userid, password)
      Fetch(
        '/entrance',
        {
          id: userid,
          password: password
        },
        'POST'
      ).then(res => {
        console.log(res.code);
        console.log(res.statusCode);
        switch (res.code) {
          case 200:
            Taro.setStorage({
              key: 'id',
              data: userid
            });
            Taro.setStorage({
              key: 'password',
              data: password
            });
            Taro.setStorage({
              key: 'token',
              data: res.data,
            });
            Taro.switchTab({
              url: '/pages/main/main'
            });
            break;    
          }
        }).catch(() => {
          Taro.showToast({
            icon: 'none',
            title: '账号或者密码错误'
          });
        })
      }
      if (!userid || !password) {
        // if(Taro.getStorageSync('id') && Taro.getStorageSync('password')){
        // this.setState({
        //   userid: Taro.getStorageSync('id'),
        //   password: Taro.getStorageSync('password'),
        // })}
        // else{
        Taro.showToast({
          icon: 'none',
          title: '账号或密码 不能为空'
        });
      }
    }
  //       console.log(res.code);
  //       console.log(res.statusCode);
  //       switch (res.code) {
  //         case 200:
  //           Taro.setStorage({
  //             key: 'id',
  //             data: userid
  //           });
  //           Taro.setStorage({
  //             key: 'password',
  //             data: password
  //           });
  //           Taro.setStorage({
  //             key: 'token',
  //             data: res.token,
  //           });
            
  //           break;         
  //         case 401:
  //           Taro.showToast({
  //             icon: 'none',
  //             title: '账号或者密码错误'
  //           });
  //           break;
  //         }
  //       }).catch(e => {
  //         console.log(e)
  //       })
  //   }
  //   if (!userid || !password) {
  //     Taro.showToast({
  //       icon: 'none',
  //       title: '账号或密码不能为空'
  //     });

  
  render() {
    const { userid, password } = this.state;
    return (
      <View className='form'>
        <View className='tip'>
          {/* <Image src={tip} alt='' /> */}
          <Text>请使用一站式服务门户账户密码登录</Text>
        </View>
        <Image src={pic} alt='' className='my-pic'></Image>
        <View className='xuehao'>
          <Image src='../image/xuehao.png' alt=''></Image>
          <Input type='text' name='xuehao' value={userid} onInput={this.changeUserid.bind(this)} />
        </View>
        <View className='mima'>
          <Image src='../image/mima.png' alt=''></Image>
          <Input type='password' name='password' value={password} onInput={this.changePassword.bind(this)} />
        </View>
        <View>
          <Button type="submit" name="button" className="btn-tijiao" onClick={this.login.bind(this)}>一键开启赚钱模式</Button>
        </View>
      </View>
    )
  }
}
//   success: function () {
//     Taro.getSetting({
//       // eslint-disable-next-line no-shadow
//       success(res) {
//         if (res.authSetting['scope.userInfo']) {
//           Taro.getUserInfo({
//             // eslint-disable-next-line no-shadow
//             success: function (res) {
//               Fetch(
//                 'money/entrance',
//                 {
//                   avatar: res.userInfo.avatarUrl,
//                   username: res.userInfo.nickName
//                 },
//                 'POST'
//               );
//               Taro.switchTab({
//                 url: '/pages/main/main'
//               });
//             },
//             fail: function () {
//               Taro.showToast({
//                 icon: 'none',
//                 title: '获取用户信息失败'
//               });
//             }
//           });
//         } else {
//           Taro.showToast({
//             icon: 'none',
//             title: '请授权'
//           });
//         }
//       },
//       fail: function () {
//         Taro.showToast({
//           icon: 'none',
//           title: '请授权'
//         });
//       }
//     });
//   }
// });
// break;