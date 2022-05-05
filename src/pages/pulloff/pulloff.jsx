import React, { Component } from 'react'
import { View, Text, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './pulloff.less'
import '../image/fan.png'
import '../image/bac.png'


export default class Pulloff extends Component {

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
                    <Text className='fabu'>下架成功!</Text>
                </View>
                {/* <Image src="../image/bac.png" alt="" className='back'></Image> */}
                <View onClick={this.toMain} className='btn'>回到首页</View>
        </View>
    )}
}