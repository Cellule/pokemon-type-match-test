import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/fontawesome-free/css/all.css"
import React, { Component } from 'react';
import './App.css';
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Panel,
  ListGroup,
  ListGroupItem,
  Button,
  ButtonProps,
} from "react-bootstrap"
import DocumentTile from "react-document-title";

import gen1 from "./charts/gen1";
import gen2to5 from "./charts/gen2to5";
import gen6 from "./charts/gen6";
import {
  TypeImagesUrl,
  Types,
  TypeChart,
  Effective
} from "./types";
import vsUrl from "./img/Versus_sign.png";

interface IState {
  gen: TypeChart;
  offense: Types,
  main: Types,
  dual: null | Types,
  expectedStrength: Effective
}

const generations: {[gen: string]: TypeChart} = {
  gen1,
  gen2to5,
  gen6
};

function roll(max: number, min = 0) {
  return Math.floor((Math.random() * (max - min)) + min);
}

class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gen: gen6,
      ...this.chooseMatchup(gen6)
    };
  }

  private chooseMatchup(gen: TypeChart) {
    const {types, count} = gen;
    const offense = roll(count) as Types;
    const main = roll(count) as Types;
    const isDual = roll(10) >= 9;
    let dual = null;
    let dualStrength = 1;
    if (isDual) {
      do {
        dual = roll(count) as Types;
      } while (dual === main);
      dualStrength = types[dual][offense];
    }
    const expectedStrength = types[main][offense] * dualStrength;
    return {
      offense,
      main,
      dual,
      expectedStrength
    }
  }

  render() {
    const typeSelectButtonProps: ButtonProps = {
      bsSize: "lg",
    }
    return (
      <div className="App">
        <DocumentTile title="Pokemon Type Match Test">
          <Grid>
            <Row>
              <Col sm={12}>
                <PageHeader>
                  Pokemon Type Match Test
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={4}>
                <Row>
                  <img src={TypeImagesUrl[this.state.offense]} alt={`Offense ${Types[this.state.offense]}`}/>
                  <img src={vsUrl} alt="Versus"/>
                  <img src={TypeImagesUrl[this.state.main]} alt={`Main ${Types[this.state.main]}`}/>
                  {!!this.state.dual
                    ? <img src={TypeImagesUrl[this.state.dual]} alt={`Dual ${Types[this.state.dual]}`}/>
                    : null
                  }
                </Row>
                <Row>
                  <Button key={Effective.Not} {...typeSelectButtonProps}>{Effective.Not}x</Button>
                  {!!this.state.dual
                    ? <Button key={Effective.DualWeak} {...typeSelectButtonProps}>{Effective.DualWeak}x</Button>
                    : null
                  }
                  <Button key={Effective.Weak} {...typeSelectButtonProps}>{Effective.Weak}x</Button>
                  <Button key={Effective.Normal} {...typeSelectButtonProps}>{Effective.Normal}x</Button>
                  <Button key={Effective.Super} {...typeSelectButtonProps}>{Effective.Super}x</Button>
                  {!!this.state.dual
                    ? <Button key={Effective.DualSuper} {...typeSelectButtonProps}>{Effective.DualSuper}x</Button>
                    : null
                  }
                </Row>
              </Col>
              <Col sm={12} md={3}>
                <Panel>
                  <Panel.Heading>History</Panel.Heading>
                  <Panel.Body>
                    <ListGroup>
                      <ListGroupItem>last match</ListGroupItem>
                    </ListGroup>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Grid>
        </DocumentTile>
      </div>
    );
  }
}

export default App;
