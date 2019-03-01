import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { get, post } from 'axios';

const Container = styled.div`
  display: grid;
  grid: 'num1 operation num2 equals response';
  height: 100px;
  width: 500px;
  margin: 40px 40px;
  padding: 10px 10px;
  border: 1px solid #ddd;
`;

const NumberInput = styled.input`
  display: inline-block;
  width: 34px;
  height: 20px;
  transform: scale(2);
  align-self: center;
  justify-self: center;
`;

const NumberOutput = styled(NumberInput)`
  color: green;
`;

const Equals = styled.div`
  display: inline-block;
  align-self: center;
  justify-self: center;
  font-size: 200%;
`;

const Operation = styled(Equals)`
  color: blue;
`;

const OperationOptionsList = styled.div`
  display: none;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background: #f3f3f3;
  padding: 10px 10px;
  color: blue;
  z-index: 1;

  ${Operation}:hover & {
    display: block;
  }
`;

const OperationOption = styled.button`
  border: none;
  background: #f3f3f3;
  padding: 10px 10px;
  font-size: 75%;

  &:hover {
    background: #dddddd;
  }
`;

const ping = async () => {
  await post('/ping');
};

const operations = ['+', '-', 'X', '/'];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = { num1: 0, num2: 0, operation: '+', response: 'Hello World, This is your sum: 0' };

    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    this.handleAddOneClick = this.handleAddOneClick.bind(this);
    this.handleOperationChange = this.handleOperationChange.bind(this);
  }

  componentDidMount() {
    setInterval(ping, 1000);
  }

  async handleNumberInputChange(value, numType) {
    const { [numType === 'num1' ? 'num2' : 'num1']: otherNumber, operation } = this.state;
    if (operation === '+' || operation === '-') {
      const {
        data: { sum: response },
      } = await get('/api/add', {
        params: {
          num1: operation === '-' && numType === 'num2' ? -1 * value : value,
          num2: operation === '-' && numType === 'num1' ? -1 * otherNumber : otherNumber,
        },
      });
      this.setState({ [numType]: value, response });
    } else if (operation === 'X' || operation === '/') {
      const {
        data: { product: response },
      } = await get('/api/multiply', {
        params: {
          num1: operation === '/' && numType === 'num2' ? 1 / value : value,
          num2: operation === '/' && numType === 'num1' ? 1 / otherNumber : otherNumber,
        },
      });
      this.setState({ [numType]: value, response });
    }
  }

  async handleAddOneClick() {
    const { num1, num2 } = this.state;
    const {
      data: { sum: response },
    } = await get('/api/addPLusOne', { params: { num1, num2 } });
    this.setState({ response });
  }

  handleOperationChange({ target: { value: operation } }) {
    this.setState({ operation }, () => {
      const { num1 } = this.state;
      this.handleNumberInputChange(num1, 'num1');
    });
  }

  render() {
    const { num1, num2, operation, response } = this.state;
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
          <Operation gridArea="operation">
            {operation}
            <OperationOptionsList>
              {operations
                .filter(o => o !== operation)
                .map(o => (
                  <OperationOption value={o} key={o} type="submit" onClick={this.handleOperationChange}>
                    {o}
                  </OperationOption>
                ))}
            </OperationOptionsList>
          </Operation>
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
