import React, { Component } from 'react'
import Taro,{ getCurrentInstance} from '@tarojs/taro'
import { View, Button} from '@tarojs/components'
import Dialog from './dialog'
import './oncheck.less'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Oncheck extends Component {


    state = {
        ifdel: false,
    }
    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    

    pulloff=(goodsid) => {
        // const params = getCurrentInstance()
        // const id = params.router.params
        // const goodsid = id.goodsid
        Fetch(
          `/money/goods/deletion?goodsid=${goodsid}`,
          {},
          'DELETE',
          {Authorization: token}
        ).then(res => {
            //this.setState({ifdel:true})
            Taro.reLaunch({ url:'/pages/pulloff/pulloff' })
          })
       }
    // toPulloff = () => {
    //     Taro.navigateTo({ url:'/pages/pulloff/pulloff'});
    // }

    // toDetail = () => {
    //     Taro.navigateTo({ url: '/pages/detail/detail' })
    // }

    Todetail=(goodsid)=>{
        Taro.navigateTo({
          url:'/pages/detail/index?goodsid='+ goodsid.goodsid
        })
        return 1
      }
    
    // btnCancel() {
    //     this.props.onCloseCheck&&this.props.onCloseCheck();
    // }
    render() {
        const goodsid = this.props
        console.log(goodsid)
        return (
            <Dialog>
                <View className="oncheck">
                    <View><Button onClick={() => this.Todetail(goodsid)} className="btn-look">查看商品</Button></View>
                    <View><Button onClick={() => this.pulloff(goodsid)} className="btn-pulloff" >下架商品</Button></View>
                    <View><Button className="btn-cancel">点击左上角返回</Button></View>
                </View>
            </Dialog>
        )
    }
}
