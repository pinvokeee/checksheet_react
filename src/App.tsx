import './App.css';
import { CheckItemList } from './components/checksheet/items';
import { sheetConfig } from './interface/interface';

const App = () => 
{
  //@ts-ignore
  const s : sheetConfig = sheet_data as sheetConfig;

  console.log(s);

  return (
    <div className="App">
      
      <CheckItemList sheet={s.presets[0]}></CheckItemList>

    </div>
  );
}

export default App;