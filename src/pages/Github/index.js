import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class Github extends Component {

  state = {
    repository: '',
  }

  componentDidMount() {
    const { navigation } = this.props;
    const starred = navigation.getParam('starred');
    console.tron.log('url: ' + starred.html_url);
    this.setState({
      repository: starred.html_url
    });
  }
  render() {
    const { repository } = this.state;
    return (
      <WebView
        source={{ uri: repository }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
