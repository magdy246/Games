// ! mmorpg
// ! shooter
// ! sailing
// ! permadeath
// ! superhero
// ! pixel

import { Info } from "./info.js";

export class Cards {
  constructor() {
    this.category = $(".nav-link").on("click", this.getdata.bind(this));
    this.getdata();
    new Info();
  }

  async getdata(e) {
    if (e) {
      e.preventDefault();
    }
    let category;
    if ((category = e)) {
      category = $(e.target).attr("id");
      $(".nav-link").removeClass("active");
      $(e.target).closest(".nav-link").addClass("active");      
    } else {
      category = "mmorpg";
    }
    $("#cards").html(`
    <div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
    <span class="loader"></span>
    </div>
    `);
    let API = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    let data = await this.showData(API);
    // &console.log(data);
    let card = "";
    for (let i = 0; i < data.length; i++) {
      card += `<div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-3 px-2">
                <div class="card rr bg-transparent h-100" id="${data[i].id}">
                    <div class="style-card d-flex flex-column">
                        <div class="p-3">
                            <figure>
                                <img src="${
                                  data[i].thumbnail
                                }" class="card-img-top w-100" alt="thumbnail163">
                            </figure>
                            <figcaption class="game-name d-flex justify-content-between align-items-center">
                                <h3 class="text-white h6">${data[i].title}</h3>
                                <span class="px-2 py-1 text-white rounded-2">free</span>
                            </figcaption>
                            <p class="pra-header text-center text-white opacity-50 mb-0 mx-auto">
                            ${data[i].short_description
                              .split(" ")
                              .slice(0, 6)
                              .join(",")}
                            </p>
                        </div>
                    </div>
                    <div class="card-body d-flex justify-content-between align-items-center border-top border-dark p-2">
                        <span class="badge badge-color text-white rounded-2">${
                          data[i].genre
                        }</span>
                        <span class="badge badge-color text-white rounded-2">${
                          data[i].platform
                        }</span>
                    </div>
                </div>
            </div>`;
    }
    $("#cards").html(card);
  }

  async showData(API) {
    let options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "6136a998ffmshcd15065277cd4e1p1e51bbjsn8490486e2958",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let response = await fetch(API, options);
    let result = await response.json();
    return result;
  }
}
