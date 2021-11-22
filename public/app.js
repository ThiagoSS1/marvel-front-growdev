
export default class App {
    constructor() {
        this.baseUrl = "https://api-marvel-growdev1.herokuapp.com"
        this.emptyImage = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
    }

    getCharacters (page = 1, title = null) {
        let url = `${this.baseUrl}/character?page=${page}`;
        let paginationsReset = false

        if (title !== null) {
            url += `&title=${title}`;
            paginationsReset = true
        }

        axios.get(url)
            .then(response => {
                const { data, current_page, total_Pages } = response.data;

                this.populateCharacters(data)
                this.createPaginations(current_page, total_Pages, paginationsReset)
            })
            .catch(error => console.log(error))
    }


    getCharacter (id) {
        let url = `${this.baseUrl}/character/${id}`;

        axios.get(url)
            .then(response => {
                this.loadDetail(response.data)
            })
            .catch(error => console.log(error));
    }

    createPaginations (current_page, total_Pages, reset) {

        if (reset) {
            document.getElementsByClassName("pagination")[0].innerHTML = '';
        }

        if (!document.querySelectorAll(".pagination li").length) { // verificando se existe li criados

            for (let i = 1; i <= total_Pages; i++) {
                const page = `<li class="page-item">
                                    <a class="page-link" data-page="${i}" href="#">${i}</a>
                              </li> `

                document.getElementsByClassName("pagination")[0].innerHTML += page;
            }
            for (let button of document.getElementsByClassName("page-link")) {
                button.addEventListener("click", (event) => {
                    event.preventDefault();

                    const page = parseInt(event.target.dataset.page)
                    this.getCharacters(page)
                })
            }
        }

        document.querySelector(".page-item").classList.remove("active")

        for (let pageItem of document.querySelectorAll(".page-item")) {
            pageItem.classList.remove("active")
        }
        document.querySelector(`.page-link[data-page="${current_page}"]`).parentNode.classList.add("active");
    }

    populateCharacters (data) {

        const listHtml = document.getElementById("list");

        listHtml.innerHTML = " ";

        data.forEach(character => {

            if (character.thumbnail.path === this.emptyImage) {
                character.image = 'https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-0-1536x1536.png'
            } else {
                character.image = `${character.thumbnail.path}.${character.thumbnail.extension}`
            }

            const col = `<div class="col-2">
                            <div class="card" data-id"="${character.id}">
                                <img width="200" height="250" class="card-img-top" src="${character.image}">
                                <span>${character.name} </span>
                            </div>
                        </div>`;

            listHtml.innerHTML += col;
        })


       

        // let saveButton = document.querySelectorAll(".js_buy");

        // for (let button of saveButton) {
        //     button.addEventListener("click", function(event)  {
               
        //         const id = event.target.dataset.id;
        //         console.log( event.target.dataset.id)
                
        //     })
        // }

        // let btn = document.querySelectorAll(".js_buy");
        // for (let i = 0; i < btn.length; i++) {
        //     btn[i].addEventListener("click", function () {
        //          console.log(this.parentNode.getAttribute("data-id"))
        //        // this.getCharacter(id)
        //     })
        // }
    
       
        // for (let card of document.getElementsByClassName('card')) {
        //     card.addEventListener("click", (event) => {
        //         const id = event.target.parentNode.dataset.id;
               
        //         console.log(event.target.parentNode.dataset.id)
        //         console.log(id)
        //          this.getCharacter(id)
        //     })
        // }




    }

    setFilter () {
        document.getElementsByName("search")[0].addEventListener("keyup", (event) => {
            const title = event.target.value.trim();
            console.log(title);
            if (title.length >= 3) {
                this.getCharacters(1, title)
            }
        })
    }

    loadDetail (character) {
        this.switchPage('detail')
        console.log(character)
    
    }

    switchPage() {
        document.querySelector('.detail').classList.toggle('d-none');
        document.querySelector('.home').classList.toggle('d-none');
      
    }
}
