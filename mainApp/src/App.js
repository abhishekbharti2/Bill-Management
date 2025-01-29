import './App.css';
import Addbill from './Component/Addbill';
import Chart from './Component/Chart'
import Navbar from './Component/Navbar'

export default function App() {

    return (
      <>
      <Navbar/>
      <div className='container'>
        <Chart/>
        <Addbill/>
      </div>
      </>
    );
}
