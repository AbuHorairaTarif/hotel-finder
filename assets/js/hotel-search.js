import { BOOKING_API_KEY } from "./config.js";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': BOOKING_API_KEY,
        'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
    }
};

var loc, checkInDate, checkOutDate;
let result = document.getElementById("result");
document.getElementById("myForm").addEventListener("submit", async function a(event) {
    //     // Prevent the default form submission
    event.preventDefault();
    result.innerHTML = '';
    loc = document.getElementById("location").value;
    checkInDate = document.getElementById("checkin_date").value;
    checkOutDate = document.getElementById("checkout_date").value;

    const url = 'https://booking-com13.p.rapidapi.com/stays/properties/list-v2?location=' + loc + '&checkin_date=' + checkInDate + '&checkout_date=' + checkOutDate + '&language_code=en-us&currency_code=USD';


    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (data.message === "Successful") {
            data.data.forEach(function (data, index) {
                var content = `
            <div class="card">
            <div class="card-img">
                <img src="https://cf.bstatic.com${data.basicPropertyData.photos.main.highResJpegUrl.relativeUrl}" loading="lazy" alt="card-img" height="300" width="300">
            </div>
            <h2 class="card-title"><a href="${data.idDetail}" data-id="${data.idDetail}" id="idDetailBtn">${data.displayName.text}</a></h2>
            <p class="text-primary text-center">Located At: ${data.basicPropertyData.location.address}, ${data.basicPropertyData.location.city}</p>
            <p class="text-warning rating">Rating: ${data.basicPropertyData.starRating.value}/5</p>
        </div>      
            `;
                result.innerHTML += content;
            });
        }
        else {

            result.innerHTML = `
            <p class="text-danger">Search result is not available.</p>
            `;
        }


    } catch (error) {
        console.log(error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var idDetailBtn = document.getElementById("idDetailBtn");
    console.log(idDetailBtn);
    idDetailBtn.addEventListener("click", function (event) {
        event.preventDefault();
        let index = (idDetailBtn.baseURI).length;
        let lastin = (idDetailBtn.href).length;
        let findLocation = (idDetailBtn.href).substring(index, lastin);
        console.log(findLocation);
    })
})

