import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Text, Button} from '@tarojs/components'
import './subreport.less'
import '../image/fan.png'
import '../image/bac.png'

export default class Submit extends Component {
  
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  toMain () {
    Taro.switchTab({ url: '/pages/main/main' })
  }

  render () {
    return (
      <View className='submit'>
        <View onClick={this.toMain} >
          <Image src="../image/bac.png" alt="" className='back'></Image>
          <Text>回到首页</Text>
        </View>
        <View className='content'>
            <Image src="../image/fan.png" alt="" className='fankui'/>
            <Text className='fabu'>举报成功!</Text>
      </View>
  </View>
    )
  }
}