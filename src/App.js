import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [counter, setCounter] = useState(0);

  const [isloading, setLoading] = useState(true);
  const [personData, setData] = useState([]);
  const [complete, setComplete] = useState([]);

  function changeCounter(event) {
    setCounter(counter + 1);
  }
  // useEffect(() => {
  //   //  fetch("https://m07u-9a308-default-rtdb.firebaseio.com/meetup.json")
  //   fetch(`https://randomuser.me/api`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data.results);
  //       setComplete(JSON.stringify(data));
  //     })
  //     .catch((err) => console.log(err));
  //   setLoading(false);
  // }, []);
  const loadMore = () => {
    changeCounter();
    fetch(`https://randomuser.me/api?page=${counter}`)
      .then((response) => response.json())
      .then((data) => {
        const old = [...personData, ...data.results];
        setData(old);
        setComplete(JSON.stringify(data));
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);
  // ?page=${pagenumber}  .then((data) => {
  //   const list = [];
  //   for (let key in data) {
  //     const person = { id: key, ...data[key] };
  //     list.push(person);
  //     console.log(key);
  //   }
  //   console.log(list[0]);
  //   setData(data.results);
  //   setComplete(JSON.stringify(data));
  //   console.log(typeof data.results);
  // })

  if (isloading) return <p>...Loading</p>;
  return (
    <div className='App'>
      <p>{counter}</p>
      <button onClick={changeCounter}>counter</button>
      <br></br>
      <button onClick={loadMore}>Load More person</button>
      {personData.map((data, idx) => (
        <div key={idx}>
          {" "}
          <p>
            {" "}
            `{data.name.first} {data.name.last}`
          </p>
          <img src={data.picture.large} />
        </div>
      ))}
      <p>{complete}</p>
    </div>
  );
}

export default App;
