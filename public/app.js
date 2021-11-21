import axios from "axios";

export default class App {
    constructor() {
        this.baseUrl = "https://api-marvel-growdev1.herokuapp.com"
    }

    getCharacters () {
        let url = `${this.baseUrl}/character`

        axios.get(url)
            .then(response => response.data)
            .catch(error => console.log(error))
    }
}