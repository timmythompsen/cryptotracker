import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddBtn = props => (
  <span className="add-btn" {...props}>
    Add Coin
  </span>
);

export default AddBtn;