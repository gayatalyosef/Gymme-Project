
import React from "react";
import "./reviews.css"

const emojis = [
    <i className="fa-regular fa-face-smile fa-xl"></i>,
    <i className="fa-regular fa-face-meh fa-xl"></i>,
    <i className="fa-regular fa-face-frown-open fa-xl"></i>,
    <i className="fa-regular fa-face-laugh-beam fa-xl"></i>,
    <i className="fa-regular fa-face-grin-hearts fa-xl"></i>,
    <i className="fa-regular fa-face-dizzy fa-xl"></i>,
  ]; 
  

function Reviews({ item }) {
  const [newReview, setReview] = React.useState("");
  const [reviewEmojiIndex, setReviewEmoji] = React.useState(0);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const [showEmojiOptions, setOptionsDispaly] = React.useState("none");
  const emoji0Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-smile fa-xl"
      onClick={() => selectEmoji(0)}
    ></i>
  );
  const emoji1Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-meh fa-xl"
      onClick={() => selectEmoji(1)}
    ></i>
  );
  const emoji2Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-frown-open fa-xl"
      onClick={() => selectEmoji(2)}
    ></i>
  );
  const emoji3Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-laugh-beam fa-xl"
      onClick={() => selectEmoji(3)}
    ></i>
  );
  const emoji4Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-grin-hearts fa-xl"
      onClick={() => selectEmoji(4)}
    ></i>
  );
  const emoji5Select = (
    <i
      id="emjSelect"
      className="fa-regular fa-face-dizzy fa-xl"
      onClick={() => selectEmoji(5)}
    ></i>
  );


  //function to save the new review in newReview state
  function onChange(event) {
    setReview(event.target.value);
  }

  //function that openes or closes the emoji selection box on click
  function showEmojisOptions() {
    var swapDisplay = "none";
    if (showEmojiOptions === "none") {
      swapDisplay = "block";
    }
    setOptionsDispaly(swapDisplay);
  }

  //function to store the selected emoji in reviewEmoji state
  function selectEmoji(emoji_index) {
    setReviewEmoji(emoji_index);
  }

  //handler to post newReview 
  function postNewReview() {
    if (newReview != "") {
      item.reviews.push([reviewEmojiIndex, date, newReview]);
      setOptionsDispaly("none");
      document.getElementById("new-review").value = "";
      document.getElementById("new-review").placeholder = "add new review";
      setReviewEmoji(0);
      setReview("");

      //send to database
      const data = {
        "name" : item.name,
        "update_data": {
        "comments":[item.reviews]}
      };
      fetch('/api/update_comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      
    }
  }


    return (
      <div className="reviews-section">
        <div className="review-title"> Reviews: </div>
          <div className="studio-reviews">
            {item.reviews.map((s, index) => (
              <div className="user-review-container" key={index}>
                <div className="emoji-container"> {emojis[s[0]]}</div>
                  <div className="user-review">
                    <p className="date-review"> {s[1]} </p> {s[2]}
                  </div>
              </div>
              ))}
          </div>
          <div className="new-review-container">
            <input
              type="text"
              id="new-review"
              placeholder="add a review"
              onChange={onChange}
            ></input>
            <button id="emoji-btn" onClick={showEmojisOptions}>
              {emojis[reviewEmojiIndex]}
            </button>
            <button className="send-review" onClick={postNewReview}>
                send
            </button>
            <div id="review-under-line"></div>
            <div
              className="emoji-options"
              style={{ display: showEmojiOptions }}
            >
              {emoji0Select} {emoji1Select} {emoji2Select} {emoji3Select}{" "}
              {emoji4Select} {emoji5Select}{" "}
            </div>
          </div>
      </div>
    );
}

export default Reviews;