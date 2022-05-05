import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Checkbox, Button } from '@tarojs/components'
import './report.less'
import Fetch from '../../service/fetch';

export default class Report extends Component {

    componentWillMount() { }
  
    componentDidMount() { }
  
    componentWillUnmount() { }
  
    componentDidShow() { }
  
    componentDidHide() { }

    // report() {
    //     Fetch(
    //       '/money/goods/feedback',
    //       {},
    //       'POST'
    //     )
    //     .then(res => {
    //       console.log(res);
    //       Taro.redirectTo({ url: '/pages/subreport/subreport' })
    //     })
    // }

    report() {
        Taro.redirectTo({ url:'/pages/subreport/subreport'})
    }

    render() {
        return (
            <View className='report'>
                <View className='h1'>举报原因:</View>
                <View className='h2'>(请勾选至少一个举报原因)</View>
                <View className='checkbox'>
                    <Checkbox value="weifa">违法违规</Checkbox>
                    <Checkbox value="taopao">携款逃跑</Checkbox>
                    <Checkbox value="fuwu">服务不当</Checkbox>
                    <Checkbox value="baoli">涉及暴力</Checkbox>
                    <Checkbox value="taidu">服务态度恶劣</Checkbox>
                </View>
                <Button onClick={this.report.bind(this)}>确认举报</Button>      
            </View>
        )
    }
}