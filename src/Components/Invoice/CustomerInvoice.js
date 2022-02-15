import React, { useState, useEffect } from "react";

import "./CustomerInvoice.css";
const CustomerInvoice = ({ allData }) => {
  const [invoiceList, setInvoiceList] = useState([]);

  useEffect(() => {
    allData &&
      allData.customersList &&
      allData.customersList.map((customer) =>
        setInvoiceList((prev) => [
          ...prev,
          {
            customer,
            key: "value",
            packages: [
              ...allData.packagesList.find(
                (pack) => pack.customerid == Number(customer.id)
              ),
            ],
            invoiceId: `${customer.id}-${new Date().getTime()}`,
          },
        ])
      );
  }, []);

  // console.log('====================================');
  console.log(invoiceList);
  // console.log('====================================');

  return (
    <div className="invoice_container">
      <p>All invoices List</p>

      <p>NO. Invoice</p>
      <div className="table_container">
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Customer Name</th>
              <th>Weight</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Customer Name</td>
              <td>Weight KG</td>
              <td>Price $</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerInvoice;
