import React, { Component } from "react";
import Linkify from "linkifyjs/react";
import MaterialTable from "material-table";
import "./App.css";

const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    let params = new URL(window.location).searchParams;
    let user_id = params.get("user");
    console.log(user_id);
    if (user_id) {
      fetch(`${REACT_APP_API_URL}/${user_id}`)
        .then(res => res.json())
        .then(
          result => {
            console.log(result);

            let items = result.map(item => {
              item.date = item.datetime.split("T")[0];
              return item;
            });
            this.setState({
              isLoaded: true,
              items: items
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
  }

  render() {
    let listItems;
    if (this.state.isLoaded && this.state.items) {
      listItems = (
        <MaterialTable
          data={this.state.items}
          columns={[
            { field: "prefix" },
            { field: "date" },
            { field: "message" }
          ]}
        />
      );
      // listItems = this.state.items.map(item => (
      //   <tr key={item.id}>
      //     <td>{item.prefix}</td>
      //     <td>{item.datetime}</td>
      //     <td>
      //       <Linkify>{item.message}</Linkify>
      //     </td>
      //   </tr>
      // ));
      // console.log(listItems);
    } else {
      console.log(this.state);
    }

    return <div className="App">{listItems}</div>;
  }
}

export default App;
