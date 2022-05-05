import React, { Component } from 'react'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import Taro,{ getCurrentInstance } from '@tarojs/taro'
import './feedback.less'
import back from '../image/back.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';
import Buy from '../../Components/Buy';
import Sell from '../../Components/Sell';


export default class Feedback extends Component {

  state = {
    iforder: false,
    ifcomment: false,
    buy:[],
    sell:[],
    data1: false,
    data2: false,
  }

  componentWillMount() {
    Fetch(
      '/money/my/goods/unfinish',
      {},
      'GET',
      {Authorization: token}
    ).then(res=>{
      if(res.data.buy)
      {
        this.setState({data1:true})
      }
      if(res.data.sell)
      {
        this.setState({data2:true})
      }
      this.setState({
          buy: res.data.buy,
          sell: res.data.sell
      });
  });
}

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // toCommit = () => {
  //   Taro.navigateTo({ url: '/pages/comment_finish/comment_finish' })
  // }
  // toOrder = () => {
  //   Taro.navigateTo({ url: '/pages/order/order' })
  // }

  // order() {
  //   const params = getCurrentInstance()
  //   const id = params.router.params
  //   const goodsid = id.goodsid
  //   Fetch(
  //       `/money/my/goods/finish?goodsid=${goodsid}`,
  //       {},
  //       'GET',
  //       {Authorization: token}
  //     )
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ iforder: true });
  //       Taro.navigateTo({ url: '/pages/order/order' })
  //     })
  //   // Taro.navigateTo({ url: '/pages/order/order' })
  // }

  render() {
    const {buy,sell,iforder,ifcomment,data1,data2} = this.state
    console.log(buy)
    console.log(sell)
    return (
      <View className='feedback'>
        <View className='Special'></View>
        {data2?
        <View>
          {sell.map((good) => {
                return (
                <Sell title={good.Good.Title} price={good.Good.Price}  buyer={good.Buyer} avatar={good.Good.Avatar} iforder={iforder} goodsid={good.Good.GoodsID} key='sell' />
                )
            })}
        </View>:null}
        {data1?
        <View>
           {buy.map((good) => {
                return (
                <Buy title={good.Title} price={good.Price} avatar={good.Avatar} goodsid={good.GoodsID} ifcomment={ifcomment} key='buy' />
                )
            })}   
        </View>:null}

        
        {/* <View className='top_feedback'>
          <Button className='btn_back' onClick={this.toIndex}>
            <Image src={back} alt='' className='img_back'></Image>
          </Button>
        </View> */}
        {/* <View className='list_order'>{listOrder(myOrder)}</View> */}
        {/* <Text>Hello world!</Text> */}
        {/* 开发者工具总是无端白屏我枯了 */}
      </View>
    
    )
  }
}
// function CreateOrder(name, orderId) {
    //   var obj = {};
    //   obj.name = name;
    //   obj.orderId = orderId;
    //   obj.showOrder = function () {
    //     console.log(this.name + this.orderId)
    //   };
    //   return obj;
    // }

    // let myOrder = new Array(CreateOrder("A", 198), CreateOrder("B", 211), CreateOrder("C", 101));

    // let orderNum = myOrder.length;

    // function AddOrder(name, orderId) {
    //   myOrder.push(CreateOrder(name, orderId));
    // }

    // //尝试添加新订单数据
    // AddOrder("D", 555);

    // let listOrder = (myOrder) => {
    //   let serial = 1;
    //   let listUnit = new Array();
    //   for (var key in myOrder) {
    //     let unitOrder = (myOrder) => {
    //       return  <View className='orderBox'>
    //                 <View className='orderName'>订单:{serial+" - "+myOrder[serial-1].name}</View>
    //                 <View className='orderId'>ID:{myOrder[serial-1].orderId}</View>
    //                 <View className='btnBox'>
    //                   <View className='btn_block'></View>
    //                   <Button className='btn_confirm' onClick={this.toOrder}>确认订单</Button>
    //                   <Button className='btn_comment' onClick={this.toCommit}>评价</Button>
    //                 </View>
    //               </View>
    //     }
    //     listUnit[serial-1]=unitOrder(myOrder);
    //   serial++;  
    //   }
    //   return listUnit;
    // }

    // return (
    //   <View className='feedback'>
    //     <View className='list_order'>{listOrder(myOrder)}</View>
    //   </View>