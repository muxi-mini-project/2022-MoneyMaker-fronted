import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button} from '@tarojs/components'
import Dialog from './dialog'
import './ifreport.less'


export default class Ifreport extends Component {

    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    btnCancel () {
        this.props.onClosePush&&this.props.onClosePush();
    }

    toReport() {
        Taro.navigateTo({url:'/pages/report/report'})
    }

    render() {
        return (
            <Dialog>
                <View className="ifpush">
                    <View><Button className="btn-ok" onClick={this.toReport}>举报商品</Button></View>
                    <View><Button onClick={this.btnCancel.bind(this)} className="btn-cancel">取 消</Button></View>
                </View>
            </Dialog>      
        )
    }
}
