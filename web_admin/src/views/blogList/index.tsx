import React from "react";

import { Input, Button, message, Table, Image, Switch } from 'antd'
import { PaginationProps } from 'antd/es/pagination/Pagination'

import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface'


import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import Drawer from './components/Drawer'

import Modal from './components/modal'

import { httpGetSelectBlog, httpPostUpdateBlog, httpPostDelteBlog } from '../../api/api'

import moment from 'moment'

import './index.scss';

export interface BlogData {
  imgUrl: string
  content: string
  createDate: string
  likeCount: number
  number_words: number
  show_blog: number
  title: string
  viewCount: number
  [props: string]: any
}
interface IBlogListState {
  pageNo: number
  pageSize: Number
  blogData: BlogData[]
  loading: boolean
  total: number
  title: string | undefined
  blogDetailVisible: boolean
  temporaryText: string
  visibleModal: boolean,
  ModalData: any
  selectRowKeys: React.Key[] | number[]
}

export default class BlogList extends React.Component<{}, IBlogListState> {

  state = {
    pageNo: 1,
    pageSize: 10,
    blogData: [],
    loading: false,
    total: 0,
    title: undefined,
    blogDetailVisible: false,
    temporaryText: '',
    visibleModal: false,
    ModalData: {},
    selectRowKeys: []
  }
  private columns: ColumnsType<BlogData> = [
    {
      title: '标题',
      align: 'center',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '被喜欢次数',
      align: 'center',
      key: 'likeCount',
      dataIndex: 'likeCount',
    },
    {
      title: '被查看的次数',
      align: 'center',
      key: 'viewCount',
      dataIndex: 'viewCount',
    },
    {
      title: '是否展示',
      key: 'show_blog',
      align: 'center',
      dataIndex: 'show_blog',
      render: (text: any, row: BlogData) => <Switch checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />} defaultChecked={text === 1 ? true : false} loading={this.state.loading} onClick={(checked) => this.switchClick(checked, row)} />
    },
    {
      title: '字数',
      align: 'center',
      key: 'number_words',
      dataIndex: 'number_words'
    },
    {
      align: 'center',
      title: "封面图",
      key: 'imgUrl',
      dataIndex: 'imgUrl',
      render: (img: string) => <Image width={50} src={img} />
    },
    {
      title: "操作",
      align: 'center',
      key: "context",
      dataIndex: 'content',
      render: (text: any, row: BlogData) => <div>
        <Button type="link" onClick={() => this.blogDetail(text)}>内容</Button>
        <Button type="link" onClick={() => this.blogAlter(row)}>修改</Button>
      </div>
    }
  ];
  public async componentDidMount() {
    const { pageNo, pageSize } = this.state
    this.getInitData(pageNo, pageSize)
  }

  private blogDetail = (row: any) => {
    this.setState({ blogDetailVisible: true, temporaryText: row })
  }

  private switchClick = async (checked: boolean, row: BlogData) => {
    this.setState(() => ({ loading: true }))
    await httpPostUpdateBlog({ id: row.id, show_blog: checked ? '1' : '2' })
    this.setState(() => ({ loading: false }))
  }

  private blogAlter = (row: BlogData) => {
    this.setState({ visibleModal: true, ModalData: row })
  }

  private onOk = () => {
    const { pageNo, pageSize } = this.state
    this.getInitData(pageNo, pageSize)
    this.setState({ visibleModal: false })
  }

  private oncloseDrawer = () => {
    this.setState({ blogDetailVisible: false, temporaryText: '' })
  }

  private async getInitData(pageNo: number, pageSize: number, title?: string) {
    this.setState(() => ({ loading: true }))
    const { data, success } = await httpGetSelectBlog({ pageNo, pageSize, title })
    if (!success) { return message.error('请求错误') }

    this.setState({ blogData: this.disposeBlogData(data.list), loading: false, total: data.total })
  }

  private disposeBlogData(data: BlogData[]) {
    data.forEach((item) => {
      item.key = item.id
      item.createDate = moment(item.createDate).format('YYYY-MM-DD HH:MM:SS')
    })
    return data
  }

  private changeSelectTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value })
  }


  private selectBlog = () => {
    const { pageNo, pageSize, title } = this.state
    this.getInitData(pageNo, pageSize, title)
  }

  private renderHeader = () => {
    return <>
      <span>标题</span>
      <Input placeholder="请输入文章的标题" width="100px" value={this.state.title} onChange={this.changeSelectTitle} />
      <Button type="primary" onClick={this.selectBlog}>查询</Button>
      <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.onDeleteComment} >删除</Button>
    </>
  }

  private onDeleteComment = async () => {
    httpPostDelteBlog({ id: this.state.selectRowKeys })
    message.success('删除成功')
    this.getInitData(this.state.pageNo, 10, this.state.title)
  }

  private pagination = (): PaginationProps => ({
    current: this.state.pageNo,
    total: this.state.total,
    onChange: (page: number) => {
      this.setState({ pageNo: page })
      this.getInitData(page, 10, this.state.title)
    },
    showTotal: (total) => <span>共{total}条</span>
  })
  private rowSelection: TableRowSelection<BlogData> = {
    onChange: (selectedRowKeys) => {
      this.setState({ selectRowKeys: selectedRowKeys })
    },
  };

  render() {
    const { loading, blogData } = this.state
    return <div className="blogList_box">

      <div className="renderHeader">
        {this.renderHeader()}
      </div>

      <div className="BlogList_table">
        <Table bordered columns={this.columns} loading={loading} rowSelection={{ ...this.rowSelection }} dataSource={blogData} pagination={this.pagination()} />
      </div>

      <Drawer title="博客内容" visible={this.state.blogDetailVisible} context={this.state.temporaryText} onClose={this.oncloseDrawer} />

      {this.state.visibleModal ? <Modal visible={this.state.visibleModal} onOK={this.onOk} onCancel={this.onOk} data={this.state.ModalData} /> : null}

    </div>
  }
}
