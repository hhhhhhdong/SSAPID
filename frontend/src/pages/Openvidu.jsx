// docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-server-kms:2.20.0

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import axios from "api/axios";
import OpenViduSession from "openvidu-react";

class Openvidu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionName: "SessionA",
      userNickname: `OpenVidu_User_${Math.floor(Math.random() * 100)}`,
      token: undefined,
    };

    this.handlerJoinSessionEvent = this.handlerJoinSessionEvent.bind(this);
    this.handlerLeaveSessionEvent = this.handlerLeaveSessionEvent.bind(this);
    this.handlerErrorEvent = this.handlerErrorEvent.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }

  handlerJoinSessionEvent() {
    console.log("Join session");
  }

  handlerLeaveSessionEvent() {
    console.log("Leave session");
    this.setState({
      session: undefined,
    });
  }

  handlerErrorEvent() {
    console.log("Leave session");
  }

  handleChangeSessionId(e) {
    this.setState({
      sessionName: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      userNickname: e.target.value,
    });
  }

  joinSession(event) {
    axios
      .post("/session", this.state)
      .then((res) => {
        this.setState({
          token: res.data.token,
          session: true,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
    event.preventDefault();
  }

  render() {
    const { sessionName } = this.state;
    const { userNickname } = this.state;
    const { token } = this.state;
    return (
      <div>
        {this.state.session === undefined ? (
          <div id="join">
            <div id="join-dialog">
              <h1> Join a video session </h1>
              <form onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    type="text"
                    id="userName"
                    value={userNickname}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    type="text"
                    id="sessionId"
                    value={sessionName}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p>
                  <input name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : (
          <div id="session">
            <OpenViduSession
              id="opv-session"
              sessionName={sessionName}
              user={userNickname}
              token={token}
              joinSession={this.handlerJoinSessionEvent}
              leaveSession={this.handlerLeaveSessionEvent}
              error={this.handlerErrorEvent}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Openvidu;
