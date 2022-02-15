import React, { useEffect, useState } from "react";
import TableBodyTr from "../Components/Invoice/TableBodyTr";
import CustomerInvoice from "../Components/Invoice/CustomerInvoice";

import "./Invoice.css";

const Invoices = (props) => {
  const [packagesList, setPackagesList] = useState(); // for all list
  const [customersList, setCustomersList] = useState(); // for all list
  const [invoicesList, setCustomerInvoice] = useState(); // for Param list.
  const [isUrlParam, setIsUrlParam] = useState(false); // for Param list && for all list

  useEffect(() => {
    // specify the endpoint to hit while splitign the url
    let param = props.history.location.pathname.split(":")[1];

    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        if (param) {
          setCustomerInvoice({
            customer: data.customers.filter(
              (customer) => customer.id === Number(param)
            )[0],
            packages: data.packages.filter(
              (pack) => pack.customerid === Number(param)
            ),
            invoiceId: `${param}-${new Date().getTime()}`,
          });
          setIsUrlParam(true);
        } else {
          setCustomersList(data.customers);
          setPackagesList(data.packages);
          setIsUrlParam(false);
        }
      });
  }, []);

  // map the packages data + reduce the total price
  let totalPrice =
    invoicesList &&
    invoicesList.packages
      .map((item) => item.price)
      .reduce((acc, curr) => acc + curr, 0);

  // map the packages data + reduce the total weight
  // spliting the "gk" latters from the packages.weight
  let totalWeight =
    invoicesList &&
    invoicesList.packages
      .map((item) => item.weight.split("k")[0])
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);

  return (
    <>
      {isUrlParam ? (
        // spesific invoice for url customer id
        invoicesList.packages.length <= 0 ? (
          <p>No Packages for create invoce</p>
        ) : (
          <>
            <div>
              <p>NO. Invoices: {invoicesList.invoiceId}</p>
              <p>Customer Name: {invoicesList.customer.name}</p>
            </div>
            <table className="table_container">
              <thead>
                <tr>
                  <th>Package ID</th>
                  <th>Weight</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {invoicesList.packages &&
                  invoicesList.packages.map((pack) => (
                    <TableBodyTr
                      key={pack.id}
                      invoiceId={pack.id}
                      packageWeight={pack.weight}
                      packagekPrice={pack.price}
                    />
                  ))}
              </tbody>
              <tfooter>
                <tr>
                  <td></td>
                  <td>Total Weight: {totalWeight}KG</td>
                  <td>Total Price: {totalPrice}$</td>
                </tr>
              </tfooter>
            </table>
          </>
        )
      ) : (
        // all customers invoices list.
        <CustomerInvoice allData={{ customersList, packagesList }} />
      )}
    </>
  );
};

export default Invoices;
