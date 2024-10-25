let apiKey = ""
let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
let place = document.getElementById("container")
fetch(apiUrl)
    .then(data => data.json())
    .then(item => {
        console.log(item)
        let media = `<img src="${item.url}" alt="${item.title}" class="apod-img" style="width:100%; height:auto;"></img>`
        place.innerHTML = `
            <div class="apod">
                <h2>${item.title}</h2>
                <p>${item.date}</p>
                ${media}
                <p>${item.explanation}</p>
            </div>
    `
    })
    .catch(error => {
        console.log("Api not loading bro !!!!")
        place.textContent = "NASA API is not Loading !!!!"
    })
