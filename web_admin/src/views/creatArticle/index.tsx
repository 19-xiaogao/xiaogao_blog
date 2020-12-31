import React from "react";
import CreateBlog from '../../components/createBlog'
import "./index.scss";
export default class CreateArticle extends React.Component {
  render() {
    return (
      <CreateBlog WhetherToCreate={true} />
    );
  }
}
