import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Input, Button} from '@tarojs/components'
import './main.less'
import Ifpush from './ifpush'
import '../image/logo.png'
import '../image/首页.png'
import '../image/消息.png'
import '../image/我的.png'
import '../image/搜索.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';
import Item from '../../Components/Item';

export default class Main extends Component {

    constructor() {
        super(...arguments);
        this.state = {
          goods: [],
          bottomFlag: false,
          isFirst: true,
          showmodal: false,
        };
      }
    

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
    const isFirst = this.state.isFirst
    if (isFirst==1) {
      this.getGoods();
    }
   }

  componentDidHide () { }

//   getGoods=()=> {
//       let num = 1
//       console.log(Taro.getStorageSync('token'))
//       console.log(num)
//       Fetch(
//         `/money/homepage?page=${num}`,
//         'GET',
//         {Authorization: token}
//       ).then(res=>{
//         if(res.data!==null){
//           console.log(res.data.length);
//           goods = goods.concat(res.data);
//           this.setState({
//               goods: res.data,
//           });
//         }
//         if(res.data.length%10==0)
//           {
//             num++;
//           }
        
//         //     newGoods = newGoods.concat(res.data);
//         //     Taro.stopPullDownRefresh();
//         //     Taro.hideNavigationBarLoading();
//         //     this.setState({
//         //         goods: res.data,
//         //         isFirst: false
//         //       });}
//         // }else{
//         //     Taro.showToast({
//         //         title:'到底啦',
//         //         duration:2000
//         //     });
//         //     Taro.stopPullDownRefresh();
//         //     Taro.hideNavigationBarLoading();
//         //     this.setState({
//         //       bottomFlag: true
//         //     });
//         // }
//       })

//  }

getGoods=()=> {
  const num = 1
  //       console.log(Taro.getStorageSync('token'))
  //       console.log(num)
        Fetch(
          `/money/homepage?page=${num}`,
          'GET',
          {Authorization: token}
        ).then(res=>{
          if(res.data!==null){
            console.log(res.data.length);
  //           goods = goods.concat(res.data);
            this.setState({
                goods: res.data,
            });
          }
  //         if(res.data.length%10==0)
  //           {
  //             num++;
  //           }
          
  //         //     newGoods = newGoods.concat(res.data);
  //         //     Taro.stopPullDownRefresh();
  //         //     Taro.hideNavigationBarLoading();
  //         //     this.setState({
  //         //         goods: res.data,
  //         //         isFirst: false
  //         //       });}
  //         // }else{
  //         //     Taro.showToast({
  //         //         title:'到底啦',
  //         //         duration:2000
  //         //     });
  //         //     Taro.stopPullDownRefresh();
  //         //     Taro.hideNavigationBarLoading();
  //         //     this.setState({
  //         //       bottomFlag: true
  //         //     });
  //         // }
        })
  
   }
  // onPullDownRefresh(){
  //   Taro.showNavigationBarLoading();
  //   this.setState({
  //     num:num+1
  //   })
  //   num++;
  //   this.getGoods();
  // }

  ifPush () {
      this.setState({showmodal: true});
  }

  closePush () {
      this.setState({showmodal: false});     
  }

  toSearch = () => {
      Taro.reLaunch({ url: '/pages/search/search' })
  }

//   detail() {
//       const{goodsid,id} = this.props
//         Fetch(
//             `/money/goods/scanning?goodsid=${goodsid}`,
//             {goodsid: id},
//             'GET',
//             {Authorization: token}
//         )
//         .then(res => {
//             console.log(res);
//             Taro.redirectTo({ url: '/pages/detail/detail'})
//         })
//   }

  render () {
    const { bottomFlag,goods} = this.state;
    return (
      <View className='mainbgc'>
        {/* <View className='mainlogo'>
            <Image src="../image/logo.png" alt=""/>
            <Text className='mainlogosub'>赚圈圈</Text>
            <Button onClick={this.ifPush.bind(this)} className="btn-push"></Button>
        </View> */}
        <View className="search">
            {/* <Image src="../image/搜索.png" alt=""/> */}
            <Input type="text" name="search" placeholder=" 随便搜搜~" onClick={this.toSearch}/>
            <Button className="btn-search">搜索</Button>
            {/* <Input onClick={this.toSearch} type="text" name="search" placeholder=" 代取外卖"/>
            <Button onClick={this.ifPush.bind(this)} className="btn-search">搜索</Button> */}
            <Button onClick={this.ifPush.bind(this)} className="btn-push"></Button>
            {this.state.showmodal?<Ifpush onClosePush={this.closePush.bind(this)}/>:null}
        </View>
        <View className="main-content">
            {goods.map((good) => {
                return (
                <Item title={good.Title} price={good.Price} avatar={good.Avatar} goodsid={good.GoodsID} key='item' />
                )
            })} 
        </View>
        {bottomFlag && <View className='bottomBox' >到底啦！</View>}
    </View>
    )
  }
}