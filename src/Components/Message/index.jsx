import { View, Image, Text } from '@tarojs/components'
import { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.less'

export default class Index extends Component {

  render() {
    const { msg } = this.props

    return (
      <View className='box'>
        <View className='info-container one'>
          <Image src="../image/ping.png" alt="" className='ping' />
          <View className='text'><Text className='hihihi'>{msg}</Text></View>
          {/* 商品Link——商品链接 + 评论独有的点击查看——消息具体内容 */}
        </View>
      </View>
    )
  }
}

