import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text, Input, Image, Checkbox, Textarea, Label } from '@tarojs/components'
import './push.less'
import jia from './images/加.png'
import './images/yuan.png'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';

export default class Push extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      goods: [],
      title: '',
      zone: '',
      price: '',
      summary: '',
      avatar: '',
      way: '',
      show: false,
      currentBoxId: 'stepone'
    };
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  state = {
    show: false,
    currentBoxId: 'stepone' //当前显示的View的id
  }
  changeBox(e) {
    let currentFlag = e.currentTarget.id;
    switch (currentFlag) {
      case 'steponeNext':
        this.setState({
          currentBoxId: 'steptwo'
        })
        console.log(this.state)
        break;
      case 'steptwoPrev':
        this.setState({
          currentBoxId: 'stepone'
        })
        console.log(this.state)
        break;
      case 'steptwoNext':
        this.setState({
          currentBoxId: 'stepthree',
        })
        console.log(this.state)
        break;
      case 'stepthreePrev':
        this.setState({
          currentBoxId: 'steptwo'
        })
        console.log(this.state)
        break;
      case 'stepthreeNext':
        this.setState({
          currentBoxId: 'stepfour',
        })
        console.log(this.state)
        break;
      case 'stepfourPrev':
        this.setState({
          currentBoxId: 'stepthree'
        })
        console.log(this.state)
        break;
      case 'stepfourNext':
        this.setState({
          currentBoxId: 'stepfive',
        })
        console.log(this.state)
        break;
      case 'stepfivePrev':
        this.setState({
          currentBoxId: 'stepfour'
        })
        console.log(this.state)
        break;
      case 'stepfiveNext':
        this.setState({
          currentBoxId: 'stepsix',
        })
        console.log(this.state)
        break;
      case 'stepsixPrev':
        this.setState({
          currentBoxId: 'stepfive'
        })
        console.log(this.state)
        break;
      default:
        this.setState({
          currentBoxId: 'stepone'
        })
        console.log(this.state)
        break;
    }
  }

  submit = () => {
    const { title, zone, price, summary, avatar, way } = this.state;
    console.log(this.state.avatar)
    Fetch(
      '/money/goods/addition',
      {
        title: title,
        zone: zone,
        price: price,
        summary: summary,
        avatar: avatar[0],
        way: way[0]
      },
      'POST',
      { Authorization: token }
    )
      .then(res => {
        console.log(res.code);
        switch (res.code) {
          case 200:
            Taro.redirectTo({ url: '/pages/submit/submit' });
            break;
        }
      }).catch(e => {
        console.log(e)
      })
  }

  chooseImage() {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        return tempFilePaths
      }
    })
  }
  changeAvater = () => {
    const { avatar, tempavatar } = this.state
    const params = {};
    params.count = 1;
    params.sizeType = ['original', 'compressed'];
    params.sourceType = ['album', 'camera'];
    Taro.chooseImage(params)
      .then(res => {
        const { tempFilePaths } = res
        const file = Taro.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        this.setState({
          tempavatar: tempFilePaths[0],
          avatar: [...avatar, file],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  changeWay = () => {
    const { way, tempavatar2 } = this.state
    const params = {};
    params.count = 1;
    params.sizeType = ['original', 'compressed'];
    params.sourceType = ['album', 'camera'];
    Taro.chooseImage(params)
      .then(res => {
        const { tempFilePaths } = res
        const file = Taro.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        this.setState({
          tempavatar2: tempFilePaths[0],
          way: [...way, file],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleZone = (e) => {
    this.setState({ zone: e.target.value });
    console.log(e.target.value)
  }

  handleText = (e) => {
    this.setState({ title: e.target.value });
  }

  handlePrice = (e) => {
    this.setState({ price: e.target.value });
  }

  handleSummary = (e) => {
    this.setState({ summary: e.target.value });
  }

  debounce(f) {
    var timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        f.call(this)
      }, 1000)
    }
  }


  render() {
    const { tempavatar, tempavatar2, goods } = this.state;
    const { title, zone, price, summary, avatar, way } = this.state;
    return (
      <View id="findOuter">

        <View id="stepone" className={this.state.currentBoxId === "stepone" ? "show" : "hidden"}>
          <View className='s1_top'>
            <View className='s1_title'>①</View>
            <View className='h1'>上传图片</View>
          </View>
          <View className='s1_middle'>
            <View className="jia contact">
              <Image src={tempavatar ? tempavatar : `http://${goods.avatar}`}
                onClick={this.changeAvater} alt="hgj"></Image>
            </View>
            {/* <View className='h3'>在此上传商品的图片</View> */}
          </View>
          <View className='btn-area'>
            <Button id="steponeNext" className="btn-next" onClick={this.changeBox.bind(this)}>下一步</Button>
          </View>
        </View>

        <View id="steptwo" className={this.state.currentBoxId === "steptwo" ? "show" : "hidden"}>
          <View className='wtf'>
            <View className='s1_top'>
              <View className='s1_title'>②</View>
              <View className='h1'>标明分区</View>
            </View>
            <View className='checkbox' id='getCheckboxNum'>
              <Input type='text' className='zone' onInput={this.handleZone} value={zone} />
            </View>
          </View>
          <View className='btn-area'>
            <Button id="steptwoPrev" className="btn-last" onClick={this.changeBox.bind(this)}>上一步</Button>
            <Button id="steptwoNext" className="btn-next" onClick={this.changeBox.bind(this)}>下一步</Button>
          </View>
        </View>

        <View id="stepthree" className={this.state.currentBoxId == "stepthree" ? "show" : "hidden"}>
          <View className='wtf'>
            <View className='s1_top'>
              <View className='s1_title'>③</View>
              <View className='h1'>起个标题</View>
            </View>
            <Input type='text' className='title' onInput={this.handleText} value={title} />
            <Text className='tip'>(包含简洁的关键词更容易被检索,如:高数、外卖、快递、南湖等)</Text>
          </View>
          <View className='btn-area'>
            <Button id="stepthreePrev" className="btn-last" onClick={this.changeBox.bind(this)}>上一步</Button>
            <Button id="stepthreeNext" className="btn-next" onClick={this.changeBox.bind(this)}>下一步</Button>
          </View>
        </View>

        <View id="stepfour" className={this.state.currentBoxId == "stepfour" ? "show" : "hidden"}>
          <View className='wtf'>
            <View className='s1_top'>
              <View className='s1_title'>④</View>
              <View className='h1'>设置价格</View>
            </View>
            <View className='yuan_position'>
              <Input type='text' className='money' placeholder='请输入阿拉伯数字' onInput={this.handlePrice} value={price} />
              <View className='yuan'>元</View>
            </View>
          </View>
          <View className='btn-area'>
            <Button id="stepfourPrev" className="btn-last" onClick={this.changeBox.bind(this)}>上一步</Button>
            <Button id="stepfourNext" className="btn-next" onClick={this.changeBox.bind(this)}>下一步</Button>
          </View>

        </View>

        <View id="stepfive" className={this.state.currentBoxId == "stepfive" ? "show" : "hidden"}>
          <View className='wtf'>
            <View className='s1_top'>
              <View className='s1_title'>⑤</View>
              <View className='h1'>添加其他详情</View>
            </View>
            {/* <Textarea type='text' className='textarea' value={summary}/> */}
            <Input type='summary' className='title' onInput={this.handleSummary} value={summary} />
          </View>
          <View className='btn-area'>
            <Button id="stepfivePrev" className="btn-last" onClick={this.changeBox.bind(this)}>上一步</Button>
            <Button id="stepfiveNext" className="btn-next" onClick={this.changeBox.bind(this)}>下一步</Button>
          </View>
        </View>

        <View id="stepsix" className={this.state.currentBoxId === "stepsix" ? "show" : "hidden"}>
          <View className='wtf'>
            <View className='s1_top'>
              <View className='s1_title'>⑥</View>
              <View className='h1'>上传联系方式</View>
            </View>
            <View className="jia contact">
              <Image src={tempavatar2 ? tempavatar2 : `http://${goods.way}`}
                onClick={this.changeWay} alt="hgj"></Image>
            </View>
            <View className='h3'>推荐使用微信或QQ</View>
            <View className='h3'>(请传正方形图片哦)</View>
          </View>
          <View className='btn-area'>
            <Button id="stepsixPrev" className="btn-last" onClick={this.changeBox.bind(this)}>上一步</Button>
            <Button id="submit" className="btn-next" onClick={this.debounce(this.submit)}>确认发布</Button>
          </View>
        </View>
      </View>
    )
  }
}