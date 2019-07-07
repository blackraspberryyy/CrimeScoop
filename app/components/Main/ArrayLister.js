import React, { Component } from 'react';
import { List, ListItem, Text, Form, Item, Input, Button, Icon, View, Right, Left, Body } from 'native-base';
import { StyleSheet } from 'react-native'

export default class ArrayLister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentText: '',
      selected: -1
    };
  }

  componentDidMount(){
    this.setState({items: this.props.items})
  }
  componentWillReceiveProps(nextProps){
    this.setState({items: nextProps.items})
  }

  addItem = () => {
    this.setState({selected: -1}) //close edit
    let currItems = this.state.items
    if(this.state.currentText == ''){
      //don't add
    }else{
      currItems.push(this.state.currentText)
      this.setState({items: currItems})
      this.setState({currentText: ''})
      this.props.onChangeList(this.state.items)
    }
  }

  editItem = (e, key) => {
    let currItems = this.state.items
    currItems[key] = e
    this.setState({items: currItems})
    this.props.onChangeList(this.state.items)
  }
  
  removeItem = (key) => {
    let currItems = this.state.items
    currItems.splice(key, 1)
    this.setState({items: currItems})
    this.props.onChangeList(this.state.items)
  }

  render() {
    let title = this.props.title ? this.props.title : ''
    let renderList = <Text>No {title}</Text>
    if(this.state.items.length > 0){
      renderList = this.state.items.map((e, key) => {
        if(this.state.selected == key){
          return (
            <ListItem 
              noIndent={true}
              key={key} 
              icon
            >
              <Body>
                <Item style={{marginRight: 0, backgroundColor: '#efefef', marginTop: 8}}>
                  <Input
                    onChangeText={e => this.editItem(e, key)}
                    value={this.state.items[key]}
                  />
                </Item>
              </Body>
              <Left>
                <Button transparent onPress={() => this.setState({selected: -1})}>
                  <Icon name='close' style={{color: 'red'}}/>
                </Button>
              </Left>
            </ListItem>
          )
        }else{
          return (
            <ListItem 
              noIndent={true}
              key={key} 
              icon
            >
              <Body>
                <Text>{e}</Text>
              </Body>
              <Left>
                <View style={{ flexDirection: 'row'}}>
                  <Button transparent onPress={() => this.setState({selected: key})}>
                    <Icon name='create'/>
                  </Button>
                  <Button transparent onPress={() => this.removeItem(key)}>
                    <Icon name='trash' style={{color: 'red'}}/>
                  </Button>
                </View>
              </Left>
            </ListItem>
          )
        }
      })
    }else{
      renderList = <ListItem noIndent={true} >
        <Text>No {title}</Text>
      </ListItem>
    }

    return (
      <View>
        <List style={styles.container}>
          <ListItem itemDivider>
            <Text style={{fontWeight: 'bold'}}>{title}:</Text>
          </ListItem>    
          {renderList}
        </List>
        <Form>
          <Item rounded regular style={{backgroundColor: '#EFEFEF', marginRight: 0}}>
            <Input
              placeholder={"Add " + title}
              onChangeText={e => this.setState({currentText: e})}
              value={this.state.currentText}
            />
            <Button 
              transparent 
              onPress={() => this.addItem()}
            >
              <Icon name="add" style={{color: 'green'}}/>
            </Button>
          </Item>
        </Form>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    marginVertical: 8
  }
})