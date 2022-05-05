import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button, Input } from '@tarojs/components'
import './mine.less'
import '../image/logo.png'
import '../image/shangpin.png'
import '../image/che.png'
import '../image/feedback.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';


export default class Mine extends Component {

  // state = {
  //   user: [],
  //   tempavatar: '',
  //   nickname: ''
  // }
  constructor() {
    super(...arguments);
    this.state = {
      user: [],
      tempavatar: '',
      // eslint-disable-next-line react/no-unused-state
    };
  }
  componentWillMount() { }

  componentDidMount() {
    Fetch('/money/my/message', {}, 'GET')
      .then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState({ 
            user: res.data,
            nickname: res.data.Nickname
          })
        }
        // Taro.setStorage({
        //   key: 'avatar',
        //   url:`http://${user.avatar}`
        // });
        // Taro.setStorage({
        //   key: 'infor',
        //   data: user.infor
        // });
      })
  }

  componentWillUnmount() {
    // const nickname = this.state
    // Fetch(
    //   `/money/my/name?nickname=${nickname}`,
    //   {},
    //   'GET',
    //   {Authorization: token}
    // ).then (res => {
    //   console.log(res.code)
    //   console.log('hehehe')
    // })
   }

  componentDidShow() { }

  componentDidHide() { }

  // toMywindow = () => {
  //   Taro.navigateTo({ url: '/pages/mywindow/mywindow' })
  // }
  mywindow() {
    Taro.navigateTo({ url: '/pages/mywindow/mywindow' })
  }

  showToast() {
    Taro.showToast({
      icon: 'none',
      title: '该功能暂未开放'
    });
  }

  // chooseImage() {
  //   Taro.chooseImage({
  //       count: 1, // 默认9
  //       sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //       sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
  //       success: function (res) {
  //         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //         var tempFilePaths = res.tempFilePaths[0]
  //         return tempFilePaths
  //       }
  //     })
  // }

  changeAvater = () => {
    const params = {};
    params.count = 1;
    params.sizeType = ['original', 'compressed'];
    params.sourceType = ['album', 'camera'];
    Taro.chooseImage(params)
      .then(res => {
        const { tempFilePaths } = res
        const file = Taro.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        this.setState({
          tempavatar: tempFilePaths[0],
          Avatar: file,
        });
        // Taro.setStorage({
        //   key: 'avatar',
        //   url: tempFilePaths[0]
        // });
        Fetch(
          '/money/my/avatar',
          {avatar: file},
          'POST',
          {Authorization: token}
        )   
      }).then (res => {
        // console.log('jj'+res.data)
        Taro.setStorage({
          avatar: res.data.avatar
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  // changeName = (e) => {
  //   // const user =this.state
  //   // const nickname = user.Nickname
  //   this.setState({
  //     nickname: e.detail.value
  //   });
    // ).then(res => {
    //   // // console.log("HAHHAHAH"+res.data);
    //   // Taro.setStorage({
    //   //   key: 'nickname',
    //   //   data: res.data.Nickname
    //   // });
    // })  
  // }
  // changeName = (e) => {
  //   this.setState({nickname:e.target.value});
  // }

  // handleinfo = () => {
  //   const { image, nickname } = this.state
  //   Fetch(`/user/image`, { image }, 'PUT')
  //   Fetch(`/user/nickname`, { nickname }, 'PUT')
  //   if (!nickname || !image) {
  //     Taro.showToast({
  //       icon: 'none',
  //       title: '昵称或头像不能为空'
  //     });
  //   } else {
  //     Taro.showToast({
  //       icon: 'none',
  //       title: '修改成功'
  //     });
  //   }
  // }
  // feedback() {
  //   Fetch(
  //       '/money/my/goods',
  //       {},
  //       'GET',
  //       {Authorization: token}
  //     )
  //     .then(res => {
  //       Taro.navigateTo({ url: '/pages/feedback/feedback' })
  //     })
  // }
  toFeedback = () => {
    Taro.navigateTo({ url: '/pages/feedback/feedback' })
  }

  render() {
    const { tempavatar, user} = this.state
    //const nickname = this.state
    //const avatar = user.Avatar
    const nickname = user.Nickname
    return (
      <View className='bgk'>
        <View className='body'>
          <View className='bg'></View>
          <View className='nickname'>
            <Image
              src={tempavatar ? tempavatar : `${user.Avatar}`}
              onClick={this.changeAvater}
              className='image'
            ></Image>
            {/* <Image src="../image/logo.png" alt="" className='image' onClick={this.chooseImage.bind(this)}/> */}
            {/* <Text>昵称</Text> */}
            {/* <Input
              maxLength='10'
              className='nick-input'
              //placeholder={`${user.Nickname}`}
              value={nickname}
              onInput={this.changeName}
            /> */}
            <View className='con'>{nickname}</View>
          </View>
          <View className='container'>
            <View onClick={this.mywindow.bind(this)} className='mine-container'>
              <Image src="../image/shangpin.png" alt="" />
              <Text>我的橱窗</Text>
            </View>
            <View className='mine-container' onclick={this.showToast.bind(this)}>
              <Image src="../image/che.png" alt="" />
              <Text>购物车</Text>
            </View>
            <View onClick={this.toFeedback} className='mine-container'>
              <Image src="../image/feedback.png" alt="" />
              <Text>订单反馈</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}