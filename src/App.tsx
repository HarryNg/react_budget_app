import IncomeForm from "./components/IncomeForm";
import ExpenseForm from "./components/ExpenseForm";
import TargetForm from "./components/TargetForm";


function App() {

  return (
    <>
      <div className="container">
        <IncomeForm />
        <ExpenseForm />
        <TargetForm />
      </div>
    </>
  );
}

export default App;
