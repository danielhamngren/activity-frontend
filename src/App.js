import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const API_URL = process.env.API_URL || "http://localhost:3000/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);

          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    let listItems;
    if (this.state.isLoaded && this.state.items) {
      listItems = this.state.items.map(item => (
        <tr key={item.id}>
          <td>{item.prefix}</td>
          <td>{item.datetime}</td>
          <td>{item.message}</td>
        </tr>
      ));
      console.log(listItems);
    } else {
      console.log(this.state);
    }

    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tbody>
              <tr>
                <th>Prefix</th>
                <th>Datetime</th>
                <th>Message</th>
              </tr>
              {listItems}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;
