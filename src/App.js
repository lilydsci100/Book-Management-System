import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [list, setlist] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://192.168.0.104:8080/test/hello")
      setlist(result.data)
  }
  fetchData();
  }, [])

  return (
    <div>this is app</div>
  );
}

export default App;
