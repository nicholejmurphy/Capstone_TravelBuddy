import React from "react";
import { Alert } from "reactstrap";

/** Alert Component shows error messages from a variety of components.
 *  - renders with "type" { success, danger, warning }
 *    which controls the color of alert
 *  - errors maps through to show each error message
 */
function Alerts({ type, messages }) {
  return (
    <div>
      {messages.map((message) => (
        <Alert color={type} key={message}>
          {message}
        </Alert>
      ))}
    </div>
  );
}

export default Alerts;
