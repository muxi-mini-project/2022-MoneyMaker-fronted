import { Component } from 'react'
import Taro  from '@tarojs/taro'
import { View, Image, Text} from '@tarojs/components'
import './trading.less'
import '../image/fan.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Trading extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      way: '',
      // eslint-disable-next-line react/no-unused-state
    };
  }

  componentWillMount () { }

  componentDidMount () {
    const params = Taro.getCurrentInstance()
    // const way = params.router.params.way
    this.setState({
      way: Taro.getStorageSync('goodid')
    })
    console.log("Hello World!_"+this.state.way)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // const {way} = this.state;
    // console.log(way)
    return (
        <View className='body'>
            <View className="header">
                <Image src="../image/fan.png" alt=""/>
                <View className="text">订单已开启，等待卖家确认</View>
                <View className="text">可转至第三方平台联系卖家</View>
            </View>
            <View className="contact">
                {/* <Image src={`${this.state.way}`} alt="卖家联系方式" /> */}
                <Image className='way' src={this.state.way} alt="卖家联系方式" />
            </View>
            
            <View className="tip">汇款时请谨防网络诈骗</View>
        </View>
    )
  }
}