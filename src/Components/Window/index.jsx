import { View, Image, Text } from '@tarojs/components'
import { Component } from 'react'
import Taro from '@tarojs/taro'
import './index.less'

export default class Index extends Component {




  Todetail = (goodsid) => {
    Taro.navigateTo({
      url: '/pages/detail/index?goodsid=' + goodsid
    })
    return 1
  }

  render() {
    const { price, title, avatar, goodsid, if_sell, if_del } = this.props

    return (
      <View className='box_window'>
        <View className='item' onClick={() => this.Todetail(goodsid)}>
          <Image
            src={`${avatar}`}
          ></Image>
          <View className='info'>{title}</View>
          <Text className='money' style={{ color: '#FC6262' }}>￥{price}</Text>
        </View>
      </View>
    )
  }
}