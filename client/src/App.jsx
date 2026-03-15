import { useState } from "react";
import InternList from "./components/InternList";
import InternForm from "./components/InternForm";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editIntern, setEditIntern] = useState(null);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="app">
      <h1>Intern Tracker</h1>
      <InternForm
        onSuccess={handleRefresh}
        editIntern={editIntern}
        setEditIntern={setEditIntern}
      />
      <InternList
        refresh={refresh}
        onEdit={setEditIntern}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

export default App;