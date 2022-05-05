import { View, Image, Text } from '@tarojs/components'
import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import './index.less'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Index extends Component {

  order = (goodsid) => {
    Fetch(
      `/money/my/goods/finish?goodsid=${goodsid}`,
      {},
      'GET',
      { Authorization: token }
    )
      .then(res => {
        console.log(res);
        this.setState({ iforder: true });
        Taro.navigateTo({ url: '/pages/order/order' })
      })
  }


  render() {
    const { price, title, buyer, avatar, goodsid, iforder } = this.props

    return (
      <View className='sell'>
        <View className='box'>
          <View className='item'>
            <Text className='info'>{title}</Text>
            <Text className='money' style={{ color: '#FC6262' }}>￥{price}</Text>
          </View>
        </View>
        <View className='mid'>
          <View className='whobuy'>购买人：</View>
          <View className='hao'>{buyer + ' '}</View>
        </View>
        <View className='bott'>
          {iforder ? <View className='b1'>订单已完成</View> : <View className='b1' onClick={() => this.order(goodsid)}>确认订单</View>}
        </View>
      </View>
    )
  }
}