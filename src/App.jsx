import { Component, useState } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: '',
    };
    //console.log('1: Constructor initialized');
  }

  componentDidMount() {
    // console.log('3: update state with new data');
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            // console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (e) => {
    const searchedString = e.target.value.toLowerCase();
    // console.log(e.target.value);
    this.setState(() => {
      return { searchField: searchedString };
    });
  };

  render() {
    console.log('2: render called');

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div clasName="App">
        <input
          className="search-box"
          type="search"
          placeholder="Search"
          onChange={onSearchChange}
        />

        {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
