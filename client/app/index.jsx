import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { get, post } from 'axios';

const Container = styled.div`
  display: grid;
  grid: 'num1 plus num2 equals response';
  height: 100px;
  width: 500px;
  margin: 40px 40px;
  padding: 10px 10px;
  border: 1px solid #ddd;
`;

const NumberInput = styled.input`
  display: inline-block;
  width: 32px;
  height: 20px;
  transform: scale(2);
  align-self: center;
  justify-self: center;
`;

const NumberOutput = styled(NumberInput)``;

const Equals = styled.p`
  display: inline-block;
  align-self: center;
  justify-self: center;
  font-size: 200%;
`;

const Plus = styled(Equals)`
  color: blue;
`;

const ping = async () => {
  await post('/ping');
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { num1: 0, num2: 0, response: 'Hello World, This is your sum: 0' };

    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    this.handleAddOneClick = this.handleAddOneClick.bind(this);
  }

  componentDidMount() {
    setInterval(ping, 1000);
  }

  async handleNumberInputChange(value, num) {
    const { [num === 'num1' ? 'num2' : 'num1']: otherNumber } = this.state;
    const {
      data: { sum: response },
    } = await get('/api/add', { params: { num1: value, num2: otherNumber } });
    this.setState({ [num]: value, response });
  }

  async handleAddOneClick() {
    const { num1, num2 } = this.state;
    const {
      data: { sum: response },
    } = await get('/api/addPlusOne', { params: { num1, num2 } });
    this.setState({ response });
  }

  render() {
    const { num1, num2, response } = this.state;
    return (
      <Fragment>
        <div>{response}</div>
        <button type="submit" onClick={this.handleAddOneClick}>
          Add one
        </button>
        <Container>
          <NumberInput
            type="number"
            value={num1}
            gridArea="num1"
            onChange={({ target: { value } }) => this.handleNumberInputChange(value, 'num1')}
          />
          <Plus gridArea="plus">+</Plus>
          <NumberInput
            type="number"
            value={num2}
            gridArea="num2"
            onChange={({ target: { value } }) => this.handleNumberInputChange(value, 'num2')}
          />
          <Equals gridArea="equals">=</Equals>
          <NumberOutput gridArea="response" type="text" value={response.split(': ')[1]} readOnly />
        </Container>
      </Fragment>
    );
  }
}
