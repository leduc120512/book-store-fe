import React, { useState } from "react";
import Customer from "../Customer";
import EditCustomer from "../Editcustomer";

function Customers({ customers, onUpdateCustomer }) {
  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  // when PATCH request happens; auto-hides the form, pushes changes to display
  function handleCustomerUpdate(updatedCustomer) {
    setIsEditing(false);
    onUpdateCustomer((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  }

  // capture user input in edit form inputs
  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  // needed logic for conditional rendering of the form - shows the customer you want when you want them, and hides it when you don't
  function changeEditState(customer) {
    if (isEditing && customer.id === editForm.id) {
      setIsEditing(false); // hides the form if it's the same customer being edited
    } else {
      setIsEditing(true); // shows the form if a new customer is selected
    }
  }

  // capture the customer you wish to edit, set to state
  function captureEdit(clickedCustomer) {
    const selectedCustomer = customers.find(
      (customer) => customer.id === clickedCustomer.id
    );
    setEditForm(selectedCustomer);
  }

  return (
    <div>
      {isEditing ? (
        <EditCustomer
          editForm={editForm}
          handleChange={handleChange}
          handleCustomerUpdate={handleCustomerUpdate}
        />
      ) : null}
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Modify Customer</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <Customer
              key={customer.id}
              customer={customer}
              captureEdit={captureEdit}
              changeEditState={changeEditState}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Customers;
