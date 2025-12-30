let patientLocationLocked = false;
let ambulanceNode = "A";
let routeLine, navigationTimer, patientMarker, accuracyCircle;

const roadGraph = {
    A: { lat: 17.3850, lng: 78.4860, neighbors: ["B", "C"] },
    B: { lat: 17.3900, lng: 78.4900, neighbors: ["A", "D"] },
    C: { lat: 17.3800, lng: 78.4800, neighbors: ["A", "D"] },
    D: { lat: 17.3950, lng: 78.4950, neighbors: ["B", "C", "H"] },
    H: { lat: 17.4015, lng: 78.4776, neighbors: [] }
};

let map = L.map("map").setView([17.385, 78.486], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
L.control.scale().addTo(map);

const ambulanceIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [46,46],
    iconAnchor: [23,46]
});

const patientIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25,41],
    iconAnchor: [12,41]
});

const hospitalIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
    iconSize: [44,44],
    iconAnchor: [22,44]
});

let ambulanceMarker = L.marker(
    [roadGraph.A.lat, roadGraph.A.lng],
    { icon: ambulanceIcon }
).addTo(map);

L.marker(
    [roadGraph.H.lat, roadGraph.H.lng],
    { icon: hospitalIcon }
).addTo(map).bindPopup("🏥 Hospital");

function edgeCost(a,b){ return 1; }

function aiFindFastestPath(start, goal){
    let open=[start], came={}, g={};
    Object.keys(roadGraph).forEach(n=>g[n]=Infinity);
    g[start]=0;
    while(open.length){
        let cur=open.shift();
        if(cur===goal) break;
        for(let n of roadGraph[cur].neighbors){
            let t=g[cur]+edgeCost(cur,n);
            if(t<g[n]){
                came[n]=cur; g[n]=t; open.push(n);
            }
        }
    }
    let path=[goal];
    while(came[path[0]]) path.unshift(came[path[0]]);
    return path;
}

function drawRoute(path){
    if(routeLine) map.removeLayer(routeLine);
    const coords=path.map(n=>[roadGraph[n].lat, roadGraph[n].lng]);
    routeLine=L.polyline(coords,{color:"#d32f2f",weight:6}).addTo(map);
    map.fitBounds(routeLine.getBounds());
    return coords;
}

function navigate(coords){
    clearInterval(navigationTimer);
    let i=0,t=0;
    navigationTimer=setInterval(()=>{
        if(i>=coords.length-1){clearInterval(navigationTimer);return;}
        t+=0.01;
        if(t>=1){t=0;i++;}
        ambulanceMarker.setLatLng([
            coords[i][0]+(coords[i+1][0]-coords[i][0])*t,
            coords[i][1]+(coords[i+1][1]-coords[i][1])*t
        ]);
    },50);
}

function updateDashboard(data){
    document.getElementById("caseId").innerText=data.id||"-";
    document.getElementById("urgency").innerText=data.urgency||"-";
    document.getElementById("locationSource").innerText=data.location_source||"-";
    document.getElementById("ambulance").innerText=data.ambulance?data.ambulance.id:"-";
    document.getElementById("route").innerText=data.route||"-";
    document.getElementById("eta").innerText=data.eta||"-";

    if(!data.location || patientLocationLocked) return;

    if(!patientMarker){
        patientMarker=L.marker(
            [data.location.lat,data.location.lng],
            {icon:patientIcon}
        ).addTo(map);
    }
    patientLocationLocked=true;

    // 🔔 Traffic Alert UI update
    const trafficBar = document.getElementById("trafficBar");
    const trafficText = document.getElementById("traffic");

    if (data.traffic_alert) {
        trafficBar.classList.remove("hidden");
        trafficText.innerText = "Alert Sent 🚦";
    } else {
        trafficBar.classList.add("hidden");
    }

}

function triggerSOS(){
    fetch("/sos",{method:"POST"}).then(r=>r.json()).then(updateDashboard);
}

function sendGPS(){
    patientLocationLocked=false;
    fetch("/update-location",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({gps:{lat:roadGraph.D.lat,lng:roadGraph.D.lng}})
    }).then(r=>r.json()).then(updateDashboard);
}

function sendSMS(){
    patientLocationLocked=false;
    fetch("/update-location",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sms:{lat:17.3726,lng:78.4801}})
    }).then(r=>r.json()).then(updateDashboard);
}

function assignAmbulance(){
    fetch("/assign-ambulance").then(r=>r.json()).then(updateDashboard);
}

function getRoute(){
    const path=aiFindFastestPath(ambulanceNode,"D");
    navigate(drawRoute(path));
}

function navigateToHospital(){
    ambulanceNode="D";
    const path=aiFindFastestPath("D","H");
    navigate(drawRoute(path));
}

function replan(){
    fetch("/replan").then(r=>r.json()).then(updateDashboard);
}

function trafficAlert(){
    fetch("/traffic-alert").then(r=>r.json()).then(updateDashboard);
    alert("🚦 Traffic Control Notified");
}

document.getElementById("traffic").innerText = "Alert Sent 🚦";