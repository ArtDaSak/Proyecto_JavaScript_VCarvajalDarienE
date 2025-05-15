fetch("https://www.dnd5eapi.co/api/2014/classes")
.then((response) => response.json())
.then((data) => {
    console.log("Fetched data:", data);
    const characterList = document.getElementById("character-list");
    if (characterList) {
        data.results.forEach((character) => {
            const characterItem = document.createElement("li");
            characterItem.textContent = character.name;
            characterList.appendChild(characterItem);
        });
    } else {
        console.error('Element with id "character-list" not found in the DOM.');
    }
})
.catch((error) => {
    console.error("Error fetching character list:", error);
});