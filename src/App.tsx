import React from 'react'
import { ConfigProvider } from 'antd'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './query/queryClient'
import Router from './Router'
import './App.css'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={koKR}>
        <Router />
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
