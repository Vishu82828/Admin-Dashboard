document.getElementById("btn").addEventListener("click",fetch_data)

async function fetch_data() {
    let stdata = await fetch("http://localhost:3000/Student")
    let json_data = await stdata.json()
    //console.log(json_data)
    let x = json_data.map((value)=>`
    
    <tr>
        <td>${value.postId}</td>
        <td>${value.id}</td>
        <td>${value.name}</td>
        <td>${value.email}</td>
    </tr>

    `).join("")
    document.getElementById("showdata").innerHTML = x
}