import React, { Component } from 'react';
import { Picker, Form, Item, Text } from 'react-native';
import getBrgyList from '../../../getBrgyList';
import firebase from 'react-native-firebase';
import getDataWithProps from '../../tools/firestore/getDataWithProps'

export default class BrgyDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      role: 'reporter',
      items: []
    };
  }

  componentDidMount(){
    this.setRole()
    this.setItems()
    let selectedBrgyId = 0
    this.state.items.forEach(e => {
      if(e.name == this.props.selected){
        selectedBrgyId = e.id
      }
    })
    this.setState({selected: selectedBrgyId})
  }

  componentWillReceiveProps(props){
    this.setState({selected: props.selected})
  }

  setItems(){
    this.setState({items: getBrgyList()})
  }

  setRole(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid
        getDataWithProps('Users', { uid: uid }).then(res => {
          let role = res[0].data.role
          this.setState({ role })
          if(role == 'brgy_officer' || role == 'police_officer'){
            let brgys = res[0].data.brgys
            let items = this.state.items
            let tmp = []

            items.forEach(e => {
              brgys.forEach(brgy => {
                if(e.name == brgy){
                  tmp.push(e)
                }
              })
            })

            this.setState({items: tmp})
          }
        })
      }
    })
  }

  onValueChange(value) {
    this.setState({selected: value});
    this.props.onPick(value)
  }

  render() {
    const {selected, role} = this.state
    let enabled = role == 'brgy_officer' || role == 'police_officer' || role == 'superadmin'

    return (
      <Picker
        enabled={enabled}
        mode="dropdown"
        style={{ width: 220 }}
        placeholder={'Select type of the crime'}
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
        { this.state.items.map((item) => {
            return (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            )
          })
        }
      </Picker>
    );
  }
}
