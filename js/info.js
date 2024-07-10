export class Info {
  constructor() {
    $("#cards").on("click", ".card", this.details.bind(this));
  }

  async details(e) {
    let idDetails = $(e.currentTarget).attr("id");
    $("#info")
      .html(`<div class="Loader position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center">
    <span class="loader"></span>
    </div>`);
    let API = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idDetails}`;
    let data = await this.showDetails(API);
    // &console.log(data);
    let Details;
    Details = `
    <div class="overflow-y-scroll bg-infoormation z-2 position-fixed top-0 bottom-0 start-0 end-0 z-3">
    <div class="container vh-100">
    <header class="d-flex justify-content-between align-items-center">
    <h1 class="text-center h3 py-4">Details Game</h1>
            <button class="btn-close btn-close-white" id="btnClose"></button>
            </header>
            <div class="row g-4" id="detailsContent">
            <div class="col-md-4">
            <img src="${data.thumbnail}" class="w-100" alt="image details">
            </div>
            <div class="col-md-8">
            <h3>Title: ${data.title}</h3>
            <p>Category: <span class="badge text-bg-info"> ${
              data.genre
            }</span> </p>
            <p>Platform: <span class="badge text-bg-info"> ${
              data.platform
            }</span> </p>
            <p>Status: <span class="badge text-bg-info"> ${
              data.status
            }</span> </p>
            <p class="small">${data.description}</p>
            <a class="btn btn-outline-warning text-white mb-5" target="_blank"
            href="${data.game_url}">Show Game</a>
            </div>
            </div>
            </div>
            </div>`;
    $("#info").html(Details);

    $("#btnClose").on("click", function () {
      $("#info").html("");
      $("#body").removeClass("overflow-hidden");
    });
    $("#body").addClass("overflow-hidden");
  }

  async showDetails(API) {
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
