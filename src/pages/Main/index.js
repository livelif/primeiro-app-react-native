import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Form, Input, SubmitButton, List, User, Avatar,
  Name, Bio, ProfileButton, ProfileButtonText } from './styles';

import PropTypes from 'prop-types';


export default class Main extends Component {

  static navigationOptions = {
    title: 'Olá mundo',
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if(users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if(prevState.users !=  users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({loading: true});

    const response = await api.get(`/users/${newUser}`)
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    })

    Keyboard.dismiss();
  }

  handleNavigate = (user, pageName) => {
    const { navigation } = this.props;

    navigation.navigate(pageName, { user});
  }

  render() {
    const { users, newUser, loading } = this.state;


    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuario"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
          />
          <SubmitButton onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF"/>
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{ item.name }</Name>
              <Bio>{ item.bio }</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item, 'User')}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}


