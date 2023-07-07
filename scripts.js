
const search_btn = document.querySelector("#search-btn");
const sound = document.getElementById("sound");
const input = document.getElementById("input");

input.addEventListener('keypress', (e)=> {
    if (e.key === "Enter") {
        e.preventDefault();
        search_btn.click();
    }
});

function findWord(){
    const input_text = input.value;
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    search(url, input_text);
}

async function search(url, word){
    try{
        response = await fetch(url+word);
        result = await response.json();
        format_data(result);
    }
    catch (error){
        console.log(`Error ${error}`);
    }
   
}

function format_data(result){
    str = ` 
    
        <div class="word">
            <h3>${result[0].word}</h3>
            <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div class="details">
            <p>${result[0].meanings[0].partOfSpeech}</p>
            <p>${result[0].phonetics[1].text}</p>
        </div>
        <ol>
        `
        for (let item of result[0].meanings[0].definitions){
            str += `
            <li>
            <div class="word-meaning">
                <p>${item.definition}</p>
            </div>
            <div class="word-example">
                <p>${item.example || ""}</p>
            </div>
            </li>
        `
        }
        str += "</ol>";
      
        document.querySelector(".result").innerHTML = str;

        sound_link = result[0].phonetics[0].audio;
            
        if (sound_link === ""){
            sound_link = result[0].phonetics[1].audio;
        }

        sound.setAttribute("src", `${sound_link}`)
}

function playSound(){
    sound.play();
}


