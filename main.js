import "./assets/style/style.css";
import imgUrl from "./assets/img/Vienna.jpg";
const app = document.querySelector("#app");

app.innerHTML = `
<h1>Search a city and look at its quality of life</h1>

<div class="vienna">
    <p>According to the Economist Intelligence Unit (EIU), the most liveable city in the world in 2022 is Vienna. 
        Check out its scores!
    </p>
</div>


<div class="box">
    <form class="inputBox">
        <input type="text" id="textArea" class="input" placeholder="Write here a city..." required=""/>
        <button type="submit" class="btn btn-outline-dark btn-lg" id="btn">Let's Go</button>
    </form>
        <img src="${imgUrl}" alt="Image of Vienna" class="photo" id="photo"/>
</div>


<div id="summary"></div>
<div id="categories"></div>

<footer>Made with &#x2764; by &#0169;Anna Miolato, 2022</footer>
`;

const textArea = document.getElementById("textArea");
const summary = document.getElementById("summary");
const categories = document.getElementById("categories");
const form = document.getElementsByClassName("inputBox")[0];

//Add button event on click
form.addEventListener("submit", (e) => {
  e.preventDefault();
  summary.innerHTML = "";
  summary.style.color = "black";
  categories.innerHTML = "";
  fetchData(correctInput(textArea.value));
});

// Fetch API function
const fetchData = async (city) => {
  try {
    const response = await fetch(
      `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
    );
    if (response.status === 200) {
      const text = await response.json();
      const { categories, summary } = text;

      //Open description's city in html page
      const paragr = document.getElementById("summary");
      paragr.insertAdjacentHTML("afterbegin", summary);

      //Open categories & scores in html page
      categories.forEach((e, i) => {
        const elem = document.createElement("div");
        elem.id = `cat${i}`;
        elem.textContent = `${e.name}: ${e.score_out_of_10.toFixed(2)}`;
        elem.setAttribute("style", `color: ${e.color};`);
        document.getElementById("categories").appendChild(elem);

        // Show score with window scroll page
        window.scrollTo(300, 500);
      });
      return;
    }
    showError("The requested city is not available.");
  } catch (e) {
    showError(
      "There was an error from the server, please try later."
    );
  }
};

//Function to adjust input research without empty space or uppercase
const correctInput = (input) => input.toLowerCase().replace(" ", "-");

// Function to manage errors
const showError = (errorMessage) => {
  summary.style.color = "red";
  summary.innerHTML = `${errorMessage} Write it in English.`;
  categories.innerHTML = "";
};
