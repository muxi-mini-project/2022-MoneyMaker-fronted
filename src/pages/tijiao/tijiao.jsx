import React, { Component } from 'react'
import { View, Text, Image, Button} from '@tarojs/components'
import Taro from '@tarojs/taro'
import './tijiao.less'
import '../image/fan.png'
import '../image/bac.png'


export default class TIjiao extends Component {

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
                    <Text className='fabu'>提交成功!</Text>
                </View>
                <View >
                {/* <Image src="../image/bac.png" alt="" className='back'></Image> */}
                    <Button onClick={this.toMain} className='btn'>回到首页</Button>
                </View>
            </View>
        )
    }
}