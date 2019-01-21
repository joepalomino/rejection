import React from "react";
import { formatRequest } from "../helpers";
import { jsx, css } from "@emotion/core";
import { object, shape, string, number } from "prop-types";

/** @jsx jsx */

RequestList.propTypes = {
  requests: object.isRequired
};

export default function RequestList(props) {
  const requests = props.requests;
  const requestsMap = Object.keys(props.requests).map(key =>
    formatRequest(requests[key])
  );

  return (
    <div>
      <ul>
        {requestsMap.map(({ request, from, value, id, timeStamp }) => (
          <li key={id}>
            {request}, {from}, {value}{" "}
            <button
              css={css`
                background: none;
                border: none;
                text-decoration: underline;
              `}
              onClick={() => props.onClick(id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
