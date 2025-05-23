let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
let message = document.getElementById("message");
let playAgainBtn = document.getElementById("playAgainBtn");

// ✅ List of allowed fruits
const fruits = ["apple", "banana", "mango", "orange", "grapes"];

for (let item of lists) {
  item.addEventListener("dragstart", function (e) {
    let selected = e.target;

    //  Right Box
    rightBox.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    rightBox.addEventListener("drop", function (e) {
      e.preventDefault();
      const text = selected.innerText.trim().toLowerCase();

      if (fruits.includes(text)) {
        rightBox.appendChild(selected);
        message.innerText = `✅ ${text} is a fruit!`;
        message.style.color = "green";

        //  Check if all fruits are dropped
        const droppedItems = rightBox.querySelectorAll(".list");
        const droppedFruits = Array.from(droppedItems).filter((item) =>
          fruits.includes(item.innerText.trim().toLowerCase())
        );

        if (droppedFruits.length === fruits.length) {
          message.innerText = "🎉 You Win!";
          message.style.color = "darkorange";
          playAgainBtn.style.display = "inline-block";
        }
      } else {
        message.innerText = `❌ ${text} is not a fruit!`;
        message.style.color = "red";
      }

      selected = null;
    });

    //  Left Box
    leftBox.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    leftBox.addEventListener("drop", function (e) {
      e.preventDefault();
      leftBox.appendChild(selected);
      selected = null;
      message.innerText = "";
      playAgainBtn.style.display = "none";
    });
  });
}

//  Play Again Button
playAgainBtn.addEventListener("click", () => {
  window.location.reload();
});
