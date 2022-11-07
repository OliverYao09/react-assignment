import React, { useState } from 'react';
import FamilyChart from './components/FamilyChart';
import { GenerateChartData } from './components/formatter';
import { familyTree } from './testData';

function App() {
  const arr = GenerateChartData(familyTree);
  const [list, setList] = useState(arr);

  return (
    <div className="App">{list.length && <FamilyChart data={list} />}</div>
  );
}

export default App;
