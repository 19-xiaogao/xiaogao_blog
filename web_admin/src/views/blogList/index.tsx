import React from "react";
import { Input, Button, message, Table, Image, Pagination, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Drawer from './components/Drawer'
import Modal from './components/modal'
import { httpGetSelectBlog, httpPostUpdateBlog } from '../../api/api'
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
  visibleModal: boolean
}

export default class BlogList extends React.Component<{}, IBlogListState> {
  private ModalData!: BlogData;
  private columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '被喜欢次数',
      key: 'likeCount',
      dataIndex: 'likeCount',
    },
    {
      title: '被查看的次数',
      key: 'viewCount',
      dataIndex: 'viewCount',
    },
    {
      title: '是否展示',
      key: 'show_blog',
      dataIndex: 'show_blog',
      render: (text: any) => <Switch checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />} defaultChecked={text === 1 ? true : false} loading={this.state.loading} onClick={(checked) => this.switchClick(checked, text)} />
    },
    {
      title: '字数',
      key: 'number_words',
      dataIndex: 'number_words'
    },
    {
      title: "封面图",
      key: 'imgUrl',
      dataIndex: 'imgUrl',
      render: (img: string) => <Image width={50} src={img} />
    },
    {
      title: "操作",
      key: "context",
      dataIndex: 'content',
      render: (text: any, row: BlogData) => <div>
        <Button type="link" onClick={() => this.blogDetail(text)}>内容</Button>
        <Button type="link" onClick={() => this.blogAlter(row)}>修改</Button>
      </div>
    }
  ];
  state = {
    pageNo: 0,
    pageSize: 10,
    blogData: [],
    loading: false,
    total: 0,
    title: undefined,
    blogDetailVisible: false,
    temporaryText: '',
    visibleModal: false
  }

  public async componentDidMount() {
    const { pageNo, pageSize } = this.state
    this.getInitData(pageNo, pageSize)
  }
  private blogDetail = (row: any) => {
    this.setState({ blogDetailVisible: true, temporaryText: row })
  }
  private switchClick = async (checked: boolean, id: any) => {
    this.setState(() => ({ loading: true }))
    await httpPostUpdateBlog({ id, show_blog: checked ? '1' : '2' })
    this.setState(() => ({ loading: false }))
  }

  private blogAlter = (row: BlogData) => {
    this.setState({ visibleModal: true })
    this.ModalData = row
  }
  private onOk = () => {
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
    data.forEach((item, index) => {
      item.key = index
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
    </>
  }
  private pagInactionChange = (page: number, pageSize: number | undefined) => {
    this.getInitData(page - 1, pageSize === undefined ? 10 : pageSize)
  }
  // 渲染table
  private renderTable = () => {
    const { loading, blogData } = this.state
    return <Table bordered columns={this.columns} loading={loading} dataSource={blogData} pagination={false} />
  }
  render() {
    return <div className="blogList_box">
      <div className="renderHeader">
        {this.renderHeader()}
      </div>
      <div className="BlogList_table">
        {this.renderTable()}
        <Pagination current={this.state.pageNo + 1} className="pagination" total={this.state.total} onChange={this.pagInactionChange} />
      </div>
      <Drawer title="博客内容" visible={this.state.blogDetailVisible} context={this.state.temporaryText} onClose={this.oncloseDrawer} />
      <Modal title="修改博客" visible={this.state.visibleModal} onOK={this.onOk} onCancel={this.onOk} data={this.ModalData} />
    </div>
  }
}
