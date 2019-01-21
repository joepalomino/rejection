import React, { Component } from "react";
import { formatRequest, generateUID } from "../helpers";
import Requests from "./Requests";
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

/** @jsx jsx */

const Btn = props => (
  <button
    css={css`
      cursor: pointer;
      border: 0;
      border-radius: 6px;
      padding: 0.5rem 0.9rem;
      color: white;
      line-height: 1.3;
      font-size: 0.87rem;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      margin: 0.5rem;
      appearance: none;
      outline: none;
    `}
    {...props}
  />
);

const PrimaryBtn = props => (
  <Btn
    css={css`
      background-color: #ef476b;
    `}
    {...props}
  />
);

const SecondaryBtn = props => (
  <Btn
    css={css`
      background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    `}
    {...props}
  />
);

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 16px;
  border: 2px solid #777;
`;
export default class Home extends Component {
  state = {
    request: "",
    from: "",
    requests: {}
  };

  calcValue = () => {
    return Object.keys(this.state.requests).reduce(
      (accu, key) => accu + this.state.requests[key].value,
      0
    );
  };

  handleInputChange = e => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    const { name } = e.target;
    const value = name === "accepted" ? 1 : 10;

    this.setState(state => {
      const { request, from } = state;
      const UID = generateUID();
      const requests = {
        ...state.requests,
        [UID]: {
          id: UID,
          request,
          from,
          value,
          timeStamp: Date.now(),
          result: name
        }
      };

      localStorage.setItem("requests", JSON.stringify(requests));

      return {
        requests,
        from: "",
        request: ""
      };
    });
  };

  handleDeleteClick = id => {
    console.log(id);

    this.setState(state => {
      const filteredRequestsKeys = Object.keys(state.requests).filter(
        key => key !== id
      );

      const updatedRequests = filteredRequestsKeys.reduce(
        (obj, key) => ({ ...obj, [key]: formatRequest(state.requests[key]) }),
        {}
      );

      localStorage.setItem("requests", JSON.stringify(updatedRequests));

      return {
        requests: updatedRequests
      };
    });
  };

  hydrateStateWithLocalStorage = () => {
    const requests = JSON.parse(localStorage.getItem("requests"));
    if (requests) {
      this.setState({ requests });
    }
  };

  countVal = result => {
    console.log(result);

    const { requests } = this.state;

    return Object.keys(requests).reduce(
      (count, key) => (requests[key].result === result ? count + 1 : count),
      0
    );
  };

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
  }

  render() {
    const { request, from, requests } = this.state;
    return (
      <div>
        Total:
        <h1>{requests && this.calcValue()}</h1>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <div
            css={css`
              margin-right: 2rem;
            `}
          >
            Approvals: <h1>{this.countVal("accepted")}</h1>
          </div>
          <div>
            Rejections: <h1>{this.countVal("rejected")}</h1>
          </div>
        </div>
        <form onSubmit={e => e.preventDefault()}>
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <Input
                type="text"
                placeholder="Request"
                onChange={this.handleInputChange}
                value={request}
                name="request"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="From"
                onChange={this.handleInputChange}
                value={from}
                name="from"
              />
            </div>
          </div>

          <div>
            <PrimaryBtn
              onClick={this.handleSubmit}
              name="accepted"
              type="submit"
              disabled={!(Boolean(request) && Boolean(from))}
            >
              Accepted
            </PrimaryBtn>
            <SecondaryBtn
              onClick={this.handleSubmit}
              name="rejected"
              type="submit"
              disabled={!(Boolean(request) && Boolean(from))}
            >
              Rejected
            </SecondaryBtn>
          </div>
        </form>
        <Requests requests={requests} onClick={this.handleDeleteClick} />
      </div>
    );
  }
}
