export default defineAppConfig({
  pages: [
    'pages/App/index',
    'pages/ProductDetail/index',
    'pages/WebViewComp/index',
    'pages/Manager/Modify/index',
  ],
  entryPagePath: "pages/App/index",
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '赖酒文化',
    navigationBarTextStyle: 'black'
  }
});
