import { View,Image,Text } from '@tarojs/components'
import { Component } from 'react'
import Taro  from '@tarojs/taro'
import './index.less'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Index extends Component {

      comment=(goodsid)=>{
        Taro.navigateTo({ url: '/pages/comment_finish/comment_finish?goodsid='+ goodsid})
      }

     render() {
    const {price,title,avatar,goodsid,ifcomment}=this.props
   
    return (
      <View className='buy'>
        <View className='box'>
          <View className='item'>
            <Text className='info'>{title}</Text>
            <Text className='money' style={{color:'#FC6262'}}>￥{price}</Text>
          </View>
        </View>
        <View className='bott'>
        {ifcomment ?<View className='b1'>已评价</View> : <View className='b1' onClick={() =>this.comment(goodsid)} >评价</View>}     
        </View>
      </View>
    )
  }
}