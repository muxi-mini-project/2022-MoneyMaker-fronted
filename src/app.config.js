export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/login/login',
    'pages/main/main',
    'pages/info/info',
    'pages/mine/mine',
    'pages/search/search',
    'pages/mywindow/mywindow',
    'pages/detail/index',
    'pages/pulloff/pulloff',
    'pages/feedback/feedback',
    'pages/order/order',
    'pages/comment_finish/comment_finish',
    'pages/push/push',
    'pages/submit/submit',
    'pages/trading/trading',
    'pages/report/report',
    'pages/subreport/subreport',
    'pages/tijiao/tijiao'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ffedef',
    navigationBarTitleText: '随手帮',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#FC6262",
    backgroundColor: "#FFFFFF",
    list: [
      {
        pagePath: 'pages/main/main',
        text: '主页',
        iconPath: 'pages/image/首页.png',
        selectedIconPath: 'pages/image/首页(1).png',
      },
      {
        pagePath: 'pages/info/info',
        text: '消息',
        iconPath: 'pages/image/消息.png',
        selectedIconPath: 'pages/image/消息(1).png',
      },
      {
        pagePath: 'pages/mine/mine',
        text: '我的',
        iconPath: 'pages/image/我的.png',
        selectedIconPath: 'pages/image/我的(1).png',
      },
    ],
  },
})