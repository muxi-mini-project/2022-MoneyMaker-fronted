import React, { Component } from 'react'
import { View, Text, Textarea, Button} from '@tarojs/components'
import Taro,{ getCurrentInstance }from '@tarojs/taro'
import './comment_finish.less'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Comment extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      comment:'',
      goodsid:'',

    };
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  toTijiao=(comment)=> {
    const params = getCurrentInstance()
    const goodsid = params.router.params.goodsid

    Fetch(
        `/money/goods/comment?goodsid=${goodsid}`,
        {comment:comment},
        'POST',
        {Authorization: token}
      )
      .then(res => {
        console.log(comment);
        Taro.reLaunch({ url: '/pages/tijiao/tijiao' })
      })
  }

  changeCom=(e)=> {
    this.setState({
      comment: e.target.value
    })
   }

  render () {
    const {comment} = this.state
    return (
      <View className='comment_finish'>
        <View>写下对本订单的评论</View>
        <Textarea type='text' name='xuehao' placeholder='' onInput={this.changeCom} value={comment}/>
        <Button onClick={() =>this.toTijiao(comment)}>提交评价</Button>
      </View>
    )
  }
}