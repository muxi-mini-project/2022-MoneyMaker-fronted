import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button} from '@tarojs/components'
import Dialog from './dialog'
import './ifpush.less'


export default class Ifpush extends Component {

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    btnCancel () {
        this.props.onClosePush&&this.props.onClosePush();
    }

    toPush() {
        Taro.navigateTo({url:'/pages/push/push'})
    }

    render() {
        return (
            <Dialog>
                <View className="ifpush">
                    <View><Button className="btn-ok" onClick={this.toPush}>上传商品</Button></View>
                    <View><Button onClick={this.btnCancel.bind(this)} className="btn-cancel">取 消</Button></View>
                </View>
            </Dialog>      
        )
    }
}
