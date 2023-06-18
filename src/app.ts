import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    Taro.cloud.init({
      env: 'laijiu-server-8gee9eu811f9e51a',
      traceUser: true
    })
    console.log('App launched.');
  })

  // children 是将要会渲染的页面
  return children
}

export default App
