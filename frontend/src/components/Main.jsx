import { Container, Button, Table } from "react-bootstrap";
import { useState } from "react";

function Main() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Groceries", amount: 500 },
    { id: 2, name: "Electricity Bill", amount: 1200 },
  ]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Expense Manager</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Expense</th>
            <th>Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" className="w-100 mt-3">
        Add Expense
      </Button>
    </Container>
  );
}

export default Main;
