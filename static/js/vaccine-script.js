async function API(id, full_Date) {

    const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${full_Date}`);
    const data = await response.json();
    return data;
}
const districtid = [
    { district_id: 391, district_name: "Ahmednagar" },
    { district_id: 364, district_name: "Akola" },
    { district_id: 366, district_name: "Amravati" },
    { district_id: 397, district_name: "Aurangabad" },
    { district_id: 384, district_name: "Beed" },
    { district_id: 370, district_name: "Bhandara" },
    { district_id: 367, district_name: "Buldhana" },
    { district_id: 380, district_name: "Chandrapur" },
    { district_id: 388, district_name: "Dhule" },
    { district_id: 379, district_name: "Gadchiroli" },
    { district_id: 378, district_name: "Gondia" },
    { district_id: 386, district_name: "Hingoli" },
    { district_id: 390, district_name: "Jalgaon" },
    { district_id: 396, district_name: "Jalna" },
    { district_id: 371, district_name: "Kolhapur" },
    { district_id: 383, district_name: "Latur" },
    { district_id: 395, district_name: "Mumbai" },
    { district_id: 365, district_name: "Nagpur" },
    { district_id: 382, district_name: "Nanded" },
    { district_id: 387, district_name: "Nandurbar" },
    { district_id: 389, district_name: "Nashik" },
    { district_id: 381, district_name: "Osmanabad" },
    { district_id: 394, district_name: "Palghar" },
    { district_id: 385, district_name: "Parbhani" },
    { district_id: 363, district_name: "Pune" },
    { district_id: 393, district_name: "Raigad" },
    { district_id: 372, district_name: "Ratnagiri" },
    { district_id: 373, district_name: "Sangli" },
    { district_id: 376, district_name: "Satara" },
    { district_id: 374, district_name: "Sindhudurg" },
    { district_id: 375, district_name: "Solapur" },
    { district_id: 392, district_name: "Thane" },
    { district_id: 377, district_name: "Wardha" },
    { district_id: 369, district_name: "Washim" },
    { district_id: 368, district_name: "Yavatmal" },
]
document.querySelector('.submit').addEventListener('click', function (e) {

    //getting district and date from the form 
    const district = document.querySelector("#District").value;
    const date = document.querySelector("#date").value;

    //formatting the date in proper format
    var dd = new Date(date).getDate()
    var mm = new Date(date).getMonth() + 1
    var yyyy = new Date(date).getFullYear()
    var full_Date = dd + "-" + mm + "-" + yyyy

    //getting district id
    var check_district = districtid.filter(dis => dis.district_name == district)

    //console.log(check_district[0].district_id) //returns district id
    var id = check_district[0].district_id;
    //calling api function and passing district and date to it

    API(id, full_Date).then(data => {
        document.querySelector(".allcards").innerHTML = ''
        document.querySelector(".allcards").innerHTML += `<h2>Vaccination Details</h2>`;

        // console.log(data["sessions"]) 
        let vaccineData = data["sessions"]

        vaccineData.forEach(element => {

            document.querySelector(".allcards").innerHTML += `
            <div class="card">
        <p><mark> Address: </mark>${element.address}</p>
        <p><mark> Available Capacity:</mark>${element.available_capacity}</p>
        <p><mark> Available Capacity Dose1:</mark>${element.available_capacity_dose1}</p>
        <p><mark> Available Capacity Dose2:</mark>${element.available_capacity_dose2}</p>
        <p><mark> Block Name:</mark>${element.block_name}</p>
        <p><mark> Center-ID:</mark>${element.center_id}</p>
        <p><mark> Date: </mark>${element.date}</p>
        <p><mark> District Name:</mark>${element.district_name}</p>
        <p><mark> Fee:</mark>${element.fee}</p>
        <p><mark> Fee-Type:</mark>${element.fee_type}</p>
        <p><mark> Min-age limit:</mark>${element.min_age_limit}</p>
        <p><mark> Name:</mark>${element.name}</p>
        <p><mark> Pincode:</mark>${element.pincode}</p>
        <p><mark> State Name:</mark>${element.state_name}</p>
        <p><mark> Slots:</mark>${element.slots}</p>
        <p><mark> From:</mark>${element.from}</p>
        <p><mark> To:</mark>${element.to}</p>
        <p><mark> Vaccine:</mark>${element.vaccine}</p>
      </div>
            `
        });
    })
})



