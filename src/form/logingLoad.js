import React, { Component } from "react";
import Loading from "./loading";
import "../App.css";
import { fetchVideos, fetchProfile } from "../storage/actions/postActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class logingLoad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      load: false,
    };
  }

  async handledone() {
    setTimeout(() => {
      this.setState({ load: true });
      setTimeout(() => {
        window.open("home", "_self");
      }, 800);
    }, 2000);
  }

  componentDidMount() {
    this.handledone();
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    this.props.fetchVideos();
    this.props.fetchProfile();
  };
  render() {
    return (
      <div className="loading">
        <Loading loading={this.state.load} />
        <h3>Fetching your data </h3>
      </div>
    );
  }
}
logingLoad.propTypes = {
  fetchVideos: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired,
  profile: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts.items,
  videos: state.posts.videos,
  profile: state.posts.profile,
});

export default connect(mapStateToProps, { fetchVideos, fetchProfile })(
  logingLoad
);
