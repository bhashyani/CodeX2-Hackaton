let map = L.map("map").setView([17.385,78.486],13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const ambulanceIcon = L.icon({
    iconUrl:"https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize:[46,46],
    iconAnchor:[23,46]
});

const hospitalIcon = L.icon({
    iconUrl:"https://cdn-icons-png.flaticon.com/512/809/809957.png",
    iconSize:[44,44],
    iconAnchor:[22,44]
});

let ambulanceMarker = L.marker([17.385,78.486],{icon:ambulanceIcon}).addTo(map);
L.marker([17.4015,78.4776],{icon:hospitalIcon}).addTo(map);

function drawRoute(start,end){
    return [
        [start.lat,start.lng],
        [(start.lat+end.lat)/2,(start.lng+end.lng)/2],
        [end.lat,end.lng]
    ];
}

function animate(points){
    let i=0,t=0;
    setInterval(()=>{
        if(i>=points.length-1) return;
        t+=0.01;
        if(t>=1){t=0;i++;}
        ambulanceMarker.setLatLng([
            points[i][0]+(points[i+1][0]-points[i][0])*t,
            points[i][1]+(points[i+1][1]-points[i][1])*t
        ]);
    },50);
}

function navigateToPatient(){
    animate(drawRoute(
        {lat:17.385,lng:78.486},
        {lat:17.395,lng:78.495}
    ));
}

function pickupPatient(){
    document.getElementById("status").innerText="Patient Picked";
}

function navigateToHospital(){
    animate(drawRoute(
        {lat:17.395,lng:78.495},
        {lat:17.4015,lng:78.4776}
    ));
}

function sync(){
    fetch("/status").then(r=>r.json()).then(d=>{
        document.getElementById("caseId").innerText=d.id||"-";
        document.getElementById("eta").innerText=d.eta||"-";
    });
}
setInterval(sync,3000);
