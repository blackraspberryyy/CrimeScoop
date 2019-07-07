import React, { Component } from 'react';
import { List, ListItem, Left, Body, Right, Text, Thumbnail } from 'native-base';
import ReportsModal from '../../pages/modals/ReportsModal';

export default class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      selected: {},
      visibility: false
    };
  }

  componentDidMount(){
    if(this.props.reports){
      this.setState({reports: this.props.reports})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reports){
      this.setState({reports: nextProps.reports})
    }
  }

  render() {
    let { reports } = this.state
    let status = [
      <Text style={{color: '#ccc'}}>Pending</Text>,
      <Text style={{color: '#CCCC00'}}>Responding</Text>,
      <Text style={{color: 'green'}}>Solved</Text>,
      <Text style={{color: 'red'}}>Bogus</Text>
    ]

    let renderList = <ListItem noIndent={true}><Text>No Reports</Text></ListItem>
    if(reports.length > 0){
      renderList = reports.map((report, key) => {
        let reportImage = <Thumbnail square source={require('../../assets/placeholder-img.jpg')} />
        if(report.data.upload != ''){
          reportImage = <Thumbnail square source={{ uri: report.data.upload }} />
        }

        let stat = report.data && report.data.status ? status[report.data.status - 1] : <Text>Unknown</Text>

        return(
          <ListItem
            noIndent={true}
            key={key} 
            thumbnail
            button={true}
            onPress={() => {
              this.setState({selected: report})
              this.setState({visibility: true})
            }}
          >
            <Left>
              { reportImage }
            </Left>
            <Body>
              <Text>{report.data.crime.name}</Text>
              <Text note>{report.data.barangay}</Text>
              <Text note numberOfLines={2}>{report.data.location}</Text>
            </Body>
            <Right>
              { stat }
            </Right>
          </ListItem>
        )
      })
    }
    
    {/* Main Render */}
    return (
      <List>
        { renderList }
        
        { this.state.visibility && (
          <ReportsModal 
            visibility={this.state.visibility}
            report={this.state.selected}
            onClose={e => this.setState({visibility: e})}
          />
        )}
      </List>
    );
  }
}
