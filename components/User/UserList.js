import { Component } from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import { RoleType } from '../../constants/ConstTypes';

class UserList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };

    this.columns = [{
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Link href={`/user/userDetail/${text}`}>
          <a>{text}</a>
        </Link>
      )
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <span>{RoleType[text]}</span>
    }];
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userList && (nextProps.userList !== prevState.userList)) {
      return {
        userList: nextProps.userList
      };
    }
    return null; 
  }

  render() {
    const { userList } = this.state;
    userList.map(item => {
      item.key = item.id;
      item.role = 10;
    });
    return (
      <Table
        style={{ minWidth: '600px' }}
        dataSource={userList}
        columns={this.columns}
        bordered
      />
    );
  }
}

export default UserList;
