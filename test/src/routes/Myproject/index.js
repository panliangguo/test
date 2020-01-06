import React from 'react'
import { Tabs } from 'antd';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default class Myproject extends React.Component{
  render(){
    return (
      <div style={styles.bg}>
            <CustomBreadcrumb arr={['我的项目']}/>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="我的项目" key="1">
                    我的项目1
                    </TabPane>
                    <TabPane tab="参与的项目" key="2">
                    参与的项目2
                    </TabPane>
   
                </Tabs>
      </div>
    )
  }
}

const styles = {
    bg:{
      width:'100%',
      height:'calc(100vh - 180px)',
      background:'#fff',
      padding:'20px'
    }
  }