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
import Icon from "./Icon";

interface Matchup {
  offense: Types,
  main: Types,
  dual: null | Types,
  answer: Effective,
}

interface HistoryMatch {
  matchup: Matchup;
  answer: Effective;
}

interface IState {
  gen: TypeChart;
  matchup: Matchup;
  history: HistoryMatch[];
}

const generations: {[gen: string]: TypeChart} = {
  gen1,
  gen2to5,
  gen6
};

function roll(max: number, min = 0) {
  return Math.floor((Math.random() * (max - min)) + min);
}
const historySize = 10;
class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      gen: gen6,
      matchup: this.chooseMatchup(gen6),
      history: [],
    };
  }

  private chooseMatchup(gen: TypeChart): Matchup {
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
      answer: expectedStrength
    }
  }

  private onEffectivenessSelection(answer: Effective) {
    const {gen, matchup, history} = this.state;
    history.unshift({matchup, answer});
    const newMatchup = this.chooseMatchup(gen);
    this.setState({history, matchup: newMatchup});
  }

  render() {
    const makeSelectButton = (effective: Effective) => {
      const isEnabled = ((effective !== Effective.DualSuper && effective !== Effective.DualWeak) || !!this.state.matchup.dual);
      let txt = effective.toString();
      if (txt.startsWith("0.")) {
        txt = txt.replace("0.", ".");
      }
      return (
        <Button
          key={effective}
          bsSize="lg"
          onClick={this.onEffectivenessSelection.bind(this, effective)}
          disabled={!isEnabled}
          className="answer-button"
        >
          {txt}
        </Button>
      );
    };
    return (
      <div className="App">
        <DocumentTile title="Pokemon Type Match Test">
          <Grid>
            <Row>
              <Col xs={12}>
                <PageHeader>
                  Pokemon Type Match Test
                </PageHeader>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Row>
                  <Col xsOffset={2}>
                    <img src={TypeImagesUrl[this.state.matchup.offense]} alt={`Offense ${Types[this.state.matchup.offense]}`}/>
                    <img src={vsUrl} alt="Versus"/>
                    <img src={TypeImagesUrl[this.state.matchup.main]} alt={`Main ${Types[this.state.matchup.main]}`}/>
                    {!!this.state.matchup.dual
                      ? <img src={TypeImagesUrl[this.state.matchup.dual]} alt={`Dual ${Types[this.state.matchup.dual]}`}/>
                      : null
                    }
                  </Col>
                </Row>
                <Row className="answer-button-row">
                  <Col xs={2} smOffset={1} sm={1} mdOffset={0} md={2}>
                    {makeSelectButton(Effective.Not)}
                  </Col>
                  <Col xs={2} sm={1} md={2}>
                    {makeSelectButton(Effective.DualWeak)}
                  </Col>
                  <Col xs={2} sm={1} md={2}>
                    {makeSelectButton(Effective.Weak)}
                  </Col>
                  <Col xs={2} sm={1} md={2}>
                    {makeSelectButton(Effective.Normal)}
                  </Col>
                  <Col xs={2} sm={1} md={2}>
                    {makeSelectButton(Effective.Super)}
                  </Col>
                  <Col xs={2} sm={1} md={2}>
                    {makeSelectButton(Effective.DualSuper)}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={4}>
                <Panel>
                  <Panel.Heading>History</Panel.Heading>
                  <Panel.Body>
                    <ListGroup className="history-list">
                      {this.state.history.slice(0, historySize).map((history, i) => {
                        const correct = history.answer === history.matchup.answer;
                        return <ListGroupItem
                          key={this.state.history.length - i}
                          className={`history-list-item history-list-item-${correct ? "correct" : "failed"}`}
                        >
                          <Icon library="fa" glyph={correct ? "check" : "times"} style={{color: correct ? "green" : "red"}}/>
                          <img src={TypeImagesUrl[history.matchup.offense]} className="type-img" alt={`Offense ${Types[history.matchup.offense]}`}/>
                          <img src={vsUrl} className="vs-img" alt="Versus"/>
                          <img src={TypeImagesUrl[history.matchup.main]} className="type-img" alt={`Main ${Types[history.matchup.main]}`}/>
                          {!!history.matchup.dual
                            ? <img src={TypeImagesUrl[history.matchup.dual]} className="type-img" alt={`Dual ${Types[history.matchup.dual]}`}/>
                            : null
                          }
                          <span>:{history.matchup.answer}x</span>
                        </ListGroupItem>
                      })}
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
