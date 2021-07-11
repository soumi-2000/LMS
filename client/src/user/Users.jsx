import React, {Component} from 'react'
import { Row, Col, Container, Card } from 'mdbreact';
import auth from '../auth/auth-helper.js'
import {listUsers} from './api-user.js'
import FindPeople from './profile/FindPeople'

const styles = {
  heading: {
    fontWeight: 400,
    padding: 10,
    color: "white"
  }
}
class Users extends Component {
  state = {
      users: [],
      error: ''
  }

  componentDidMount() {
    const jwt = auth.isAuthenticated()
    let userId = jwt.user._id
    listUsers().then((users) => {
      console.log(users)
      if (!users) {
        console.log("No users!")
      } else {
        let students = []
        for (let i = 0; i < users.length; i++) {
          if (users[i]._id !== userId) {
            students.push(users[i])
          }
        }
        this.setState({users: students})
      }
      console.log(this.state.users)
    })
  }

  render() {
    return (
      <Container>
      <Row>
        <Col>
            <h3 style={styles.heading} type="title">Connect</h3>
          <hr />
          <Card>
            <FindPeople/>
          </Card>
        </Col>
      </Row>    
    </Container>
    )
  }
}

export default Users;
