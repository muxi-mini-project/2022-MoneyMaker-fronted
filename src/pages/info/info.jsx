import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './info.less'
import '../image/ping.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';
import Message from '../../Components/Message';


export default class Info extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            msgs: [],
            goods: [],
            isFirst: true,
            showmodal: false
        };
    }

    getMsgs = () => {
        console.log(Taro.getStorageSync('token'))
        Fetch(
            '/money/goods/message',
            'GET',
            { Authorization: token }
        ).then(res => {
            console.log(res.data)
            this.setState({
                msgs: res.data,
            });
        })
    }

    componentWillMount() { this.getMsgs(); }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    render() {
        const { msgs } = this.state;
        return (
            <View className='body'>
                <View>
                    <View className='buwei'></View>
                    <View className='info-container one'>
                        <Image src="../image/ping.png" alt="" className='ping' />
                        <View><Text>欢迎使用随手帮！</Text></View>
                        {/* <View className='right'></View> */}
                        {/* 商品Link——商品链接 + 评论独有的点击查看——消息具体内容 */}
                    </View>
                    {msgs.map((msg) => {
                        return (
                            <Message msg={msg.Msg} key='msg' />
                        )
                    })}
                </View>
            </View>

        )
    }
}