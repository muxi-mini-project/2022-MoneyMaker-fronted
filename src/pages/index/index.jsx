import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.less'
import '../image/logo.png'


export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toLogin = () => {
    Taro.navigateTo({ url: '/pages/login/login' })
  }

  render() {
    return (
      <View className='index'>
        <Image src="../image/logo.png" alt="" />
        <Text className='h1'>随手帮</Text>
        <Text className='p'>WITHOUT EXTRA TROUBLE</Text>
        <Button className='btn-denglu' onClick={this.toLogin}>登&nbsp;&nbsp;录</Button>
      </View>
    )
  }
}