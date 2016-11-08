import React, { Component } from 'react';
import { Panel, Button} from 'react-bootstrap';
import Link from '../Link';
import 'whatwg-fetch';

class StatWidget extends Component{ // eslint-disable-line
  static propTypes = {
    style: React.PropTypes.string,
    count: React.PropTypes.string,
    headerText: React.PropTypes.string,
    icon: React.PropTypes.string,
    footerText: React.PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      text: "Get cat name!"
    }
  }

  getNumber(json) {
    let number = Math.floor(Math.random()*( Object.keys(json).length));
    console.log(number);

    return number; 
  }

  buttonClicked() {
    console.log('the button was clicked!');
    fetch('https://raw.githubusercontent.com/sindresorhus/superb/master/words.json')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          text: json[this.getNumber(json)],
        });
      });
  }

  // componentWillMount() {
  //   Api.get('https://raw.githubusercontent.com/sindresorhus/superb/master/words.json').then((data) => {

  //   })
  // }

  render() {
    return (
      <Panel
        className="stat"
        className={this.props.style}

        header={<div className="row">
          <div className="col-xs-3">
            <i
              className={this.props.icon}
            />
          </div>
          <div className="col-xs-9 text-right">
            <div className="huge">
              {
                this.props.count
              }
            </div>
            <div>
              {
                this.props.headerText
              }
            </div>
          </div>
        </div>}

        footer={
          <Link
            to={
              this.props.linkTo // eslint-disable-line
            }
          >
          <Button block onClick={ (e) => { this.buttonClicked(); } }>{this.state.text}</Button>
            <span className="pull-left">
              {
                this.props.footerText
              }
            </span>
            <span className="pull-right"><i className="fa fa-arrow-circle-right" /></span>
            <div className="clearfix" />
          </Link>}
      />

    );
  }
}

export default StatWidget;
