import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author } from './styles';

export default class User extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  state = {
    stars: [],
    page: 1,
  }

  handleNavigate = (starred, pageName) => {
    const { navigation } = this.props;
    console.tron.log(pageName);
    navigation.navigate(pageName, { starred });
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data });
  };

  loadStars = async () => {
    const { page } = this.state;
    const nextPage = page + 1;

    const { navigation } = this.props;
    const user = navigation.getParam('user');

    console.tron.log('next page ' + nextPage);
    console.tron.log('url: ' + `users/${user.login}/starred?page=${nextPage}`)
    const response = await api.get(`users/${user.login}/starred?page=${nextPage}`);
    console.tron.log(response);
    this.setState({
      stars: [ ...this.state.stars, ...response.data]
    });
  }

  render() {
    const { navigation } = this.props;
    const { stars } = this.state;

    const user = navigation.getParam('user');


    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }}></Avatar>
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
            onEndReached={this.loadStars}
            onEndReachedThreshold={0.2}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem = {({ item }) => (
              <Starred onPress={() => this.handleNavigate(item, 'Github')}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
        />
      </Container>
    );
  }
}
