import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import './index.less'
import Fetch from '../../service/fetch';
import token from '../../service/fetch';
import Comment from '../../Components/Comment';
import Window from '../../Components/Window';

export default class Detail extends Component {



    state = {
        good: { Title: '', Goodszone: '', Summary: '', Goodszone: '', Avatar: '' },
        user: { Avatar: '', Nickname: '' },
        all: [],
        comments: [],
        images: [],
        way: '',
        currentBoxId: 'stepone' //当前显示的View的id
    }

    componentWillMount() {
        const params = getCurrentInstance()
        const id = params.router.params
        const goodsid = id.goodsid
        Fetch(
            `/money/goods/scanning?goodsid=${goodsid}`,
            {},
            'GET',
            { Authorization: token }
        )
            .then(res => {
                console.log(res.data);
                console.log(res.data.all);
                this.setState({
                    user: res.data.user,
                    good: res.data.good,
                    all: res.data.all,
                });
            })
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    changeBox(e) {
        const params = getCurrentInstance()
        const id = params.router.params
        const goodsid = id.goodsid
        let currentFlag = e.currentTarget.id;
        switch (currentFlag) {
            case 'steponeNext':
                this.setState({
                    currentBoxId: 'stepone'
                })
                break;
            case 'steptwoNext':
                this.setState({
                    currentBoxId: 'steptwo'
                });
                Fetch(
                    `/money/goods/comments?goodsid=${goodsid}`,
                    {},
                    'GET',
                    { Authorization: token }
                )
                    .then(res => {
                        if (res.data !== null) {
                            console.log(res.data.comment);
                            this.setState({
                                comments: res.data.comment
                            })
                        }
                        else {
                            Taro.showToast({
                                icon: 'none',
                                title: '暂时还没有评论哦'
                            });
                        }
                    })
                break;
            case 'stepthreeNext':
                this.setState({
                    currentBoxId: 'stepthree'
                })
                break;
        }
    }

    toTrading() {
        const params = getCurrentInstance()
        const id = params.router.params
        const goodsid = id.goodsid
        const way = this.state
        Fetch(
            `/money/goods/shopping?goodsid=${goodsid}`,
            {},
            'GET',
            { Authorization: token }
        ).then(res => {
            console.log("WOC" + res.data)
            this.setState({
                way: res.data
            })
            // Taro.setStorage(this.state.way)
            Taro.setStorage({
                key: "goodid",
                data: this.state.way
            })
            Taro.navigateTo({ url: '/pages/trading/trading?goodsid=' + goodsid })
        })
    }

    toMain() {
        Taro.switchTab({ url: '/pages/main/main' })
    }
    ifPush() {
        this.setState({ showmodal: true });
    }
    closePush() {
        this.setState({ showmodal: false });
    }

    render() {
        const { good, user, comments, all } = this.state
        // //const {Title,Summary,Price,Nickname,Avatar} = this.props
        const title = good.Title
        const zone = good.Goodszone
        const summary = good.Summary
        const price = good.Price
        const avatar = good.Avatar
        //const way = good.Way
        const goodsid = good.GoodsID
        const nickname = user.Nickname
        const user_avatar = user.Avatar
        // const price_window = all.Price
        // const avatar_window = all.Avatar
        // const title_window = all.Title
        return (
            <View>
                {/* <View className='topBar'>
                    <Image className='back' src={back} onClick={this.toMain}></Image>
                    <Image className='fire' src={fire} onClick={this.ifPush.bind(this)} ></Image>
                    {this.state.showmodal ? <Ifreport onClosePush={this.closePush.bind(this)} /> : null}
                </View> */}
                <View>
                    <Image className='avatar' src={`${avatar}`} ></Image>
                </View>
                <View className='btns'>
                    <View id="steponeNext" onClick={this.changeBox.bind(this)} className={this.state.currentBoxId === "stepone" ? "button active" : "button"}>商品详情</View>
                    <View id="steptwoNext" onClick={this.changeBox.bind(this)} className={this.state.currentBoxId === "steptwo" ? "button active" : "button"}>评价</View>
                    <View id="stepthreeNext" onClick={this.changeBox.bind(this)} className={this.state.currentBoxId === "stepthree" ? "button active" : "button"}>卖家</View>
                </View>
                <View>
                    <View id="stepone" className={this.state.currentBoxId === "stepone" ? "show" : "hidden"}>
                        <View className='goodsInfo'>
                            <View className='goodsDis'>
                                <View className=''>[标题]:{title}</View>
                                <View className=''>[分区]:{zone}</View>
                                <View className=''>[其他描述]:{summary}</View>
                            </View>
                            <View className='bottomBar'>
                                <Button className='btnPrice'>定价 {price} 元</Button>
                                <Button className='btnOpen' onClick={this.toTrading.bind(this)}>开启交易</Button>
                            </View>
                        </View>
                    </View>
                    <View id="steptwo" className={this.state.currentBoxId === "steptwo" ? "show" : "hidden"} >
                        <View className='h'>精彩评论</View>
                        {comments.map((comment) => {
                            return (
                                <Comment id={comment.ID} time={comment.Givetime} content={comment.Comment} key='comment' />
                            )
                        })}
                        {/* <View>
                            <View className='upper'>
                                <View>学号：{ID}</View>
                                <View className='pushTime'>时间：{Givetime} </View>
                            </View>
                            <View className='lower'>{Comments}</View>
                        </View> */}
                    </View>
                    <View id="stepthree" className={this.state.currentBoxId == "stepthree" ? "show" : "hidden"}>
                        <View className='goodsPer'>
                            <View className='accountPer'>
                                <Image className='figurePer' src={`${user_avatar}`}></Image>
                                <View className='namePer'>{nickname}</View>
                            </View>
                            <View className='shelfPer'>
                                <View className='shelfTitle'>Ta的橱窗</View>
                                <View className='shelfList'>
                                    {all.map((one) => {
                                        return (
                                            <Window title={one.Title} price={one.Price} avatar={one.Avatar} goodsid={one.GoodsID} key='window' />
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}