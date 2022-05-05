import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './mywindow.less'
import '../image/logo.png'
import Oncheck from './oncheck'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';


export default class Mywindow extends Component {


    constructor() {
        super(...arguments);
        this.state = {
            showmodal: false,
            mygoods: [],
        };
    }
    componentWillMount() {
        Fetch(
            '/money/my/goods',
            {},
            'GET',
            { Authorization: token }
        )
            .then(res => {
                if (res.data !== null) {
                    this.setState({
                        mygoods: res.data,
                    })
                }
                if (res.data.lenth == 0) {
                    Taro.showToast({
                        icon: 'none',
                        title: '还没有发布过商品哦'
                    });
                }

            }).catch(() => {
                Taro.showToast({
                    icon: 'none',
                    title: '跳转错误'
                });
            })
    }
    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    ifCheck() {
        this.setState({
            showmodal: true,
        });
    }
    closeCheck() {
        this.setState({ showmodal: false });
    }
    render() {
        const { mygoods } = this.state;
        console.log(this.state)
        return (
            <View>
                <View className="main-window">
                    {mygoods.map((good) => {
                        {/* console.log("获取被点击的商品"+good.GoodsID) */}
                        return (
                            <View onClick={this.ifCheck.bind(this)} className='box'>
                                <View className={good.Goodsin === "no" ? "show" : "hidden"}>
                                    <View className='xiajia'>商品已下架</View>
                                </View>
                                <View className='item'>
                                    <Image
                                        src={`${good.Avatar}`}
                                    ></Image>
                                    <Text className='info'>{good.Title}</Text>
                                    <Text className='money' style={{ color: '#FC6262' }}>￥{good.Price}</Text>
                                    {this.state.showmodal ? <Oncheck CloseCheck={this.closeCheck.bind(this)} goodsid={good.GoodsID} /> : null}
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}