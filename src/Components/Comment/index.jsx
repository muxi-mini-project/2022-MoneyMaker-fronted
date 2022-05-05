import { View,Image,Text } from '@tarojs/components'
import { Component } from 'react'
import Taro  from '@tarojs/taro'
import './index.less'

export default class Index extends Component {
     render() {
        const {id,time,content}=this.props
        return (
            <View className='box_comment'>
                <View className='upper'>
                    <View className='xuehao'>学号：{id}</View>
                    <View className='pushTime'>{time} </View>
                </View>
                <View className='lower'>{content}</View>
            </View> 
        )
    }
}