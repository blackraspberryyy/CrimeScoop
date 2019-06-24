import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

// Retrieve Firebase Messaging object.
// const messaging = firebase.messaging();

export default class Pending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        }
    }
    componentDidMount() {
        this.setState({ reports: this.props.reports });
        // console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ reports: nextProps.reports });
        console.log(nextProps)
    }

    render() {
        return (
            <Container>
                <Content>

                    <List>
                        {this.state.reports.map((report, key) => {
                            return (
                                <ListItem thumbnail key={key}>
                                    <Left>
                                        <Thumbnail square source={{ uri: 'Image URL' }} />
                                    </Left>
                                    <Body>
                                        <Text>{report.crime.name}</Text>
                                        <Text note numberOfLines={1}>{report.location}</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent>
                                            <Text>View</Text>
                                        </Button>
                                    </Right>
                                </ListItem>
                            );
                        })}

                    </List>
                </Content>
            </Container>
        );
    }


}