import React, { Component } from 'react';
import { connect } from 'react-redux';
import S from 'string';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
  CardText,
  CardImg,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { fetchHero } from '../actions';

import { HeroPic } from './hero-pic';

class DetailView extends Component {
  componentDidMount() {
    console.log('DetailView CDM', this.props);
    const { error, isLoading, hero, id } = this.props;
    // this bit of weirdness is to allow for refreshes and direct links.
    // on initial page load this will always be null if hit directly.
    if (!hero && !isLoading) {
      this.props.fetchHero(id);
    }
  }

  renderItem = obj =>
    Object.keys(obj).map(o => {
      if (typeof obj[o] === 'object') {
        return (
          <ListGroupItem key={obj[o][0]}>{`${S(o).humanize().s}: ${
            obj[o][0]
          }`}</ListGroupItem>
        );
      }
      return (
        <ListGroupItem key={obj[o]}>{`${S(o).humanize().s}: ${
          obj[o]
        }`}</ListGroupItem>
      );
    });

  render() {
    console.log('DetailView RENDER', this.props);
    const { hero, error, isLoading } = this.props;

    if (isLoading) return null; // not showing this component at all and relying on global loader via redux;

    if (error) return <div>An error has occured</div>;
    if (!hero) return <div> NO DATA </div>;

    return (
      <Container>
        <Row>
          <Card>
            <CardHeader tag="h2">{hero.name}</CardHeader>
            <HeroPic src={hero.image.url} name={hero.name} />
            {
              // standard CardHero did not support refs of onError;
            }
            <CardBody>
              <CardSubtitle>{hero.biography.alterEgos}</CardSubtitle>
              <br />
              {
                // all of the below should have been moved to own components and a single function rendering all of it. but -- time.
              }
              <Row>
                <Col xs="12" sm="12">
                  <Row>
                    <h5>Biography</h5>
                    <ListGroup>{this.renderItem(hero.biography)}</ListGroup>
                    <hr />
                  </Row>
                </Col>
                <Col xs="12" sm="12">
                  <Row>
                    <h5>Connections</h5>
                    <ListGroup>{this.renderItem(hero.connections)}</ListGroup>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <h5>Appearace</h5>
                    <ListGroup>{this.renderItem(hero.appearance)}</ListGroup>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <h5>Power Stats</h5>
                    <ListGroup>{this.renderItem(hero.powerstats)}</ListGroup>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

DetailView.defaultProps = {
  isLoading: true
};

export default connect(
  state => {
    return {
      allHeros: state.heros.allHeros,
      hero: state.heros.hero,
      isLoading: state.heros.isLoading,
      allLoaded: state.heros.allLoaded,
      error: state.heros.error
    };
  },
  { fetchHero }
)(DetailView);

// export default connect(state => ({ hero: state.heros.hero }, {}))(DetailView);
