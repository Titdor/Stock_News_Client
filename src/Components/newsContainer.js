import React, { useState, useEffect, useReducer} from "react";
import axios from "axios";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";

function Newscontainer() {
  const [text, setText] = useState("");
  const [article, setArticle] = useState([]);
  


  function handleChange(event) {
    setText(event.target.value);
  }

  async function handleKeyPress(event) {
    if (event.key === "Enter") {
      console.log("Enter has been pressed");
      const timeEnterIsPressed = new Date();  
      await axios.post(
        "http://localhost:3001/test1/timePost", 
          { search: text,
            time: timeEnterIsPressed },
          {
            headers: {
              "Content-type": "application/json",
            },
          })
      .then(res=>{setArticle(res.data.data)})          
      .then(setText(""));
    }
  }


  // function homeClick() {
  //   setHome(true);
  //   setBezingaNews(false);
  //   console.log("code is working");
  // }

  // function bezingaClick() {
  //   setHome(false);
  //   setBezingaNews(true);
  //   console.log("code is working");
  // }

  useEffect(()=>{
    async function getDailyFetchedNews() {
      await axios.get("http://localhost:3001/test1/timeDailyPosts")
      .then((res)=>{
        setArticle(res.data.data);
      });
    }
    getDailyFetchedNews();
  },[])


  return (
    <div>
      <div className="header">
        <h1>StockNews</h1>
        <div className="search-box">
            <input
              type="text"
              name="search"
              placeholder="Search for"
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            ></input>
        </div>
        {/* <p onClick={homeClick}>Home</p> */}
        {/* <p onClick={bezingaClick}>Bezinga</p> */}
      </div>
      <div className="content">
        <h1>LATEST NEWS</h1>
        {article &&
          article.map((news, index) => {
            return (
              <div className="container" key={index}>
                <div className="headline">
                  <img src={news.image_url} alt="picture" className="news.Image"></img>
                  <div className="content">
                    <p className="date">
                      {moment(news.published_at).format("DD/MM/YYYY")}
                    </p>
                    <a href={news.url} className="title">
                      {news.title}
                    </a>
                    <p className="description">{news.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Newscontainer;
