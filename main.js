import './assets/style/style.css'
import imgUrl from './assets/img/Vienna.jpg'

document.querySelector('#app').innerHTML = `
<h1>Search a city and look at its quality of life</h1>

<div class="vienna">
    <p>According to the Economist Intelligence Unit (EIU), the most liveable city in the world in 2022 is Vienna. 
        Check out its scores!
    </p>
</div>

<div class="box">
    <div class="inputBox">
        <input type="text" id="textArea" class="input" placeholder="Write here a city..." required=""/>
        <button type="submit" class="btn btn-outline-dark btn-lg" id="btn">Let's Go!</button>
    </div>
        <img src="./assets/img/Vienna.jpg" alt="Image of Vienna" class="photo" id="photo"/>
</div>

    <div id="summary"></div>
    <div id="categories"></div>

<footer>Made with &#x2764; by &#0169;Anna Miolato, 2022</footer>
`

//Add variables
const btn = document.getElementById('btn');
const textArea = document.getElementById('textArea');
let city; 
let summary = document.getElementById('summary');
let categories =  document.getElementById('categories');

document.getElementById('photo').src = imgUrl;

//Add button event on click
btn.addEventListener('click', (e) => {
    if (textArea.value == "") {
        e.preventDefault();
        summary.style.color = "red";
        summary.innerHTML = 'You need to add a city in english!';
        categories.innerHTML = "";
    } else {
        city = correctInput(textArea.value);
        summary.innerHTML= ""; 
        summary.style.color = "black";
        categories.innerHTML= "";
                
        getData();   
    }
 });

// Add event on submit -- parole cambiate: textArea & keyup
 textArea.addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.key === 'Enter'){
        btn.click();
    }
 });


// Fetch API function
async function getData() {
    const response = await fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`);
    if (response.status !== 404) {
        const text = await response.json();
        const {categories, summary} = text;
        
        //Open description's city in html page
        const paragr = document.getElementById('summary');
        paragr.insertAdjacentHTML('afterbegin', summary);
        
        //Open categories & scores in html page
        text.categories.forEach((e,i)=>{
        const elem = document.createElement("div");
        elem.id = `cat${i}`;
        elem.textContent = `${e.name}: ${(e.score_out_of_10).toFixed(2)}`;
        elem.setAttribute("style", `color: ${e.color};`);
        document.getElementById('categories').appendChild(elem);

        // Show score with window scroll page
        window.scrollTo(300,500);
    
})} else {
    getError();
}};


//Function to adjust input research without empty space or uppercase
function correctInput(input) {
    input = input.toLowerCase();
    input = input.replace(' ','-');
    return input;
};

 // Function to manage errors
 function getError(errorMessage){
    errorMessage = 'This city is not avaiable. Please try again. <br><strong>Write it in English!</strong>';
    summary.style.color = "red";
    summary.innerHTML = errorMessage;
    categories.innerHTML = "";
    return errorMessage;
    };
