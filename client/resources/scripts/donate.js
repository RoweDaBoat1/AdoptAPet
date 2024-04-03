function handleOnLoad(){
    let html = `
        <form onsubmit = "return false">
            <label for = "shelterName">Select Shelter</label><br>
            <input type = "text" id = "shelterName" name = "shelterName"><br>
            <label for = "name">Full Name</label><br>
            <input type = "text" id = "name" name = "name"><br>
            <label for = "email">Email</label><br>
            <input type = "email" id = "email" name = "email"><br>
            <button style = "margin-top:10px" class = "btn btn-primary" >Submit</button>
        </form>
    `
    document.getElementById('donate').innerHTML = html
}