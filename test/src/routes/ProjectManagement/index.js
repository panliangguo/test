import React from 'react'
import { Table } from 'antd';
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
        title: '项目经理',
        dataIndex: 'age',
      },
    {
      title: '开始时间',
      dataIndex: 'age',
    },
    {
      title: '操作',
      dataIndex: 'address',
      render: () => <a>Delete</a>
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: '',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: '',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: '',
    },
   
  ];
  
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };


export default class ProjectManagement extends React.Component{
  render(){
    return (
      <div style={styles.bg}>
            <CustomBreadcrumb arr={['项目管理']}/>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />,
              
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