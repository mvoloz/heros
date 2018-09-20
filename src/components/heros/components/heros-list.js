import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { fetchHero } from '../actions';

class HerosList extends Component {
  state = {
    search: '',
    heros: [],
    activePage: 1
  };

  componentDidMount() {
    this.props.fetchHero('all');
  }

  componentWillReceiveProps(nextProps) {
    const { allLoaded } = nextProps;
    const { heros } = this.state;
    if (!heros.length && allLoaded) {
      this.setState({ heros: nextProps.allHeros });
    }
  }

  getHeros = () => {
    const { allLoaded, allHeros } = this.props;
    const { search } = this.state;
    if (!allLoaded) return [];
    if (search.length) {
      // filtering comparison is done on only alphabetic lowercase characters.
      return allHeros.filter(hero =>
        hero.name
          .replace(/[\W_]+/g, '')
          .toLowerCase()
          .includes(search)
      );
    }
    return allHeros;
  };

  handleFilter = debounce(value => {
    // debouncing to minimize re-renders
    this.setState({ search: value });
  }, 200);

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { isLoading } = this.props;

    const heros = this.getHeros();

    if (isLoading) return null; // i'm a fan of early returns

    return (
      <Container>
        <input
          type="text"
          placeholder="Search"
          onChange={e => this.handleFilter(e.target.value)}
        />

        <ListGroup>
          {heros.map(hero => (
            <ListGroupItem
              key={hero.id}
              tag="a"
              href="#"
              onClick={
                async () => this.props.fetchHero(hero.id, true)
                // 2nd value is for redirect, could have made it an object but would have been
                // more refactoring as i added this later.
              }
            >
              {hero.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

export default connect(
  state => ({
    allHeros: state.heros.allHeros,
    selected: state.heros.hero,
    isLoading: state.heros.isLoading,
    allLoaded: state.heros.allLoaded
  }),
  { fetchHero }
)(HerosList);
