import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    Taro.cloud.init({
      env: 'laijiu-server-2gn2amctb3d02574',
      traceUser: true
    })
    console.log('App launched.');
  })

  // children 是将要会渲染的页面
  return children
}

export default App
