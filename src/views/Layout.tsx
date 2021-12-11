import { Layout as AntLayout, Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import {
  BarChartOutlined,
  ClockCircleOutlined,
  FormOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Content } from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { store } from '../store'

export const Layout = ({ children }: { children: JSX.Element }) => {
  const [collapsed, setCollapsed] = useState(true)
  const toggle = () => setCollapsed(!collapsed)
  const location = useLocation()
  const history = useHistory()

  const goToMenu = ({ key }: { key: string }) => {
    if (location.pathname === key) return
    history.push(`/${key}`)
  }

  const logout = () => store.userStore.logout()
  const login = () => () => history.push('/login')

  return (
    <AntLayout style={{ flexDirection: 'row', height: '100%' }}>
      <Sider
        className="sider"
        theme="light"
        trigger={null}
        collapsed={collapsed}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div className="logo click" onClick={toggle}>
            ✍
          </div>
          <Menu
            mode="inline"
            selectedKeys={location.pathname.split('/')}
            inlineCollapsed={collapsed}
          >
            <Menu.Item
              key="study-times"
              icon={<ClockCircleOutlined />}
              onClick={goToMenu}
            >
              시간
            </Menu.Item>
            <Menu.Item
              key="study-stats"
              icon={<BarChartOutlined />}
              onClick={goToMenu}
            >
              통계
            </Menu.Item>
            <Menu.Item
              key="study-records"
              icon={<FormOutlined />}
              onClick={goToMenu}
            >
              기록
            </Menu.Item>
          </Menu>

          <div className="spacer" />

          <Menu mode="inline" inlineCollapsed={collapsed} selectable={false}>
            {store.userStore.user ? (
              <Menu.Item key="temp" icon={<LogoutOutlined />} onClick={logout}>
                로그아웃
              </Menu.Item>
            ) : (
              <Menu.Item key="temp" icon={<LoginOutlined />} onClick={login}>
                로그인
              </Menu.Item>
            )}
          </Menu>
        </div>
      </Sider>
      <AntLayout className="site-layout">
        <Content className="site-layout-background main">{children}</Content>
      </AntLayout>
    </AntLayout>
  )
}
