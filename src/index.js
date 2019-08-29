import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const sum = arr => arr.reduce((acc, curr) => acc + curr, 0);

function calculateShares(salaries, amount) {
  const totalSalaries = sum(salaries);

  const shares = salaries.map(salary => salary / totalSalaries);
  const amounts = shares.map(share => amount * share);

  const check = sum(amounts);

  console.assert(
    check === amount,
    `total paid does not add up, was ${check}, should be ${amount}`,
    { totalSalaries, shares, amounts }
  );

  return amounts;
}

const replace = (arr, i, value) => [
  ...arr.slice(0, i),
  value,
  ...arr.slice(i + 1),
];

function App() {
  const [numberPeople, setNumberPeople] = React.useState(2);
  const [salaries, setSalaries] = React.useState([2315, 3147]);
  const [amount, setAmount] = React.useState(955);

  React.useEffect(
    () =>
      setSalaries(salaries =>
        Array.from({ length: numberPeople }, (_, i) => salaries[i] || 0)
      ),
    [numberPeople]
  );

  const amounts = calculateShares(salaries, amount);

  return (
    <div className="App">
      <h1>Cost split based on salary</h1>
      {salaries.map((salary, i) => (
        <div className="group" key={i}>
          <label htmlFor={`salary-${i}`}>Salary {i + 1}: </label>
          <span className="spacer" />
          <input
            type="number"
            id={`salary-${i}`}
            value={salary}
            onChange={e =>
              setSalaries(replace(salaries, i, Number(e.target.value)))
            }
          />
        </div>
      ))}

      <div className="group">
        <label htmlFor="amount">Cost: </label>
        <span className="spacer" />
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
        />
      </div>

      <hr />

      {amounts.map((amount, i) => (
        <div className="group" key={i}>
          <label htmlFor={`amount-${i}`}>Amount {i + 1}: </label>
          <span className="spacer" />
          <output id={`amount-${i}`}>{amount.toFixed(2)}</output>
        </div>
      ))}

      <button onClick={() => setNumberPeople(numberPeople + 1)}>+</button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
