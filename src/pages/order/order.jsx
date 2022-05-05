import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import '../image/fan.png'
import './order.less'


export default class Order extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toMain () {
    Taro.switchTab({ url: '/pages/main/main' })
    }

  render() {
    return (
      <View className='submit'>
            <View className='content'>
                <Image src="../image/fan.png" alt="" className='fankui'/>
                <Text className='fabu'>订单已完成!</Text>
            </View>
            <View onClick={this.toMain} className='btn'>回到首页</View>
        </View>
    )
  }
}
