import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';
import brgyList from '../../constants/brgyList'

export default class BrgyPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    };

    this.items = brgyList
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    let names = []
    this.items.forEach(e => {
      selectedItems.forEach(id => {
        if(e.id == id){
          names.push(e.name)
        }
      })
    })
    this.props.onPick(names)
  };

  render() {
    const { selectedItems } = this.state;
    return (
      <MultiSelect
        hideTags
        items={this.items}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component }}
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Pick Barangay"
        searchInputPlaceholderText="Search Barangay..."
        onChangeInput={() => {/* do nothing*/}}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="rgba(65, 105, 225, 0.3)"
        selectedItemIconColor="rgba(65, 105, 225, 0.3)"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#4169E1"
        submitButtonText="Done"
        fixedHeight={true}
        single={this.props.single}
      />
    );
  }
}
