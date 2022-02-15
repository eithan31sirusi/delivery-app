import React from "react";

import "./TableBody.css";

// output

const TableBodyTr = ({ invoiceId, packageWeight, packagekPrice }) => {
  return (
    <tr>
      <td>{invoiceId}</td>
      <td>{packageWeight}</td>
      <td>{packagekPrice}$</td>
    </tr>
  );
};

export default TableBodyTr;
