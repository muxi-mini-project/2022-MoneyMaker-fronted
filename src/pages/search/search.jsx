import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Input, Image ,Text} from '@tarojs/components'
import './search.less'
import './images/搜索.png'
import '../image/back.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';
import Item from '../../Components/Item';


export default class Search extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      goods: [],
      bottomFlag: false,
      isFirst: true,
      showmodal: false,
      content: '',
    };
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    // const isFirst = this.state.isFirst
    // if (isFirst == 1) {
    //   this.gogogo();
    // }
  }

  componentDidHide() { }

  backMain = () => {
    Taro.switchTab({ url: '/pages/main/main' })
  }

  changeContent(e) {
    let value = e.detail.value;
    this.setState({
      content: value
    });
    // console.log("需要搜索的内容是："+this.state.content)
    // console.log("目前返回的数据有"+this.state.goods)
  }

  gogogo = () => {
    const num = 1;
    const {content} = this.state
    console.log("那个传给fetch的content内容为:"+content)
    Fetch(
      `/money/search?content=${content}`,
       {content: content},
      'POST',
      { Authorization: token }
    ).then(res => {
      console.log(res.code)
      console.log(res.message)
      console.log(res.data)
      if (res.data !== null) {
        console.log("返回的数据是：" + res.data);
        this.setState({
         goods: res.data,
        }); 
      }
    })
  }

  render() {
    const { content, goods } = this.state;
    return (
      <View className="body">
        <View className='search-all'>
          <Image src='../image/back.png' alt='' onClick={this.backMain}></Image>
          <View className='input'>
            <Input className='search-input' type='text' name='content' value={content} onInput={this.changeContent.bind(this)} />
            <Button className='btn-search' onClick={this.gogogo.bind(this)}></Button>
          </View>
        </View>
        <View className="main-content">
          {goods.map((good) => {
            return (
              <View className='item'>     
                  <Image 
                      src={`${good.Avatar}`}
                  ></Image>
                  <Text className='info'>{good.Title}</Text>
                  <Text className='money' style={{color:'red'}}>￥{good.Price}</Text>
              </View>
              // <Item title={good.Title} price={good.Price} avatar={good.Avatar} goodsid={good.GoodsID} key='item' />
            )
          })}
        </View>
      </View>
    )
  }
}