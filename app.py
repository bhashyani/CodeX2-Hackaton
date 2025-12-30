from flask import Flask, jsonify, request, render_template
import json

app = Flask(__name__)

with open("data/ambulances.json") as f:
    ambulances = json.load(f)

emergency_case = {
    "id": None,
    "urgency": None,
    "location": None,
    "location_source": "Unknown",
    "ambulance": None,
    "route": None,
    "eta": None,
    "traffic_alert": False
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/driver")
def driver():
    return render_template("driver.html")

@app.route("/traffic")
def traffic():
    return render_template("traffic.html")

@app.route("/sos", methods=["POST"])
def sos():
    emergency_case.update({
        "id": "CASE001",
        "urgency": "Critical",
        "location": None,
        "location_source": "Unknown",
        "ambulance": None,
        "route": None,
        "eta": None,
        "traffic_alert": False
    })
    return jsonify(emergency_case)

@app.route("/update-location", methods=["POST"])
def update_location():
    data = request.json
    if "gps" in data:
        emergency_case["location"] = data["gps"]
        emergency_case["location_source"] = "GPS"
    elif "sms" in data:
        emergency_case["location"] = data["sms"]
        emergency_case["location_source"] = "SMS"
    return jsonify(emergency_case)

@app.route("/assign-ambulance")
def assign_ambulance():
    emergency_case["ambulance"] = ambulances[0]
    return jsonify(emergency_case)

@app.route("/route")
def route():
    if emergency_case["location"] and emergency_case["ambulance"]:
        emergency_case["route"] = "Ambulance → Patient"
        emergency_case["eta"] = "6 mins"
    return jsonify(emergency_case)

@app.route("/replan")
def replan():
    emergency_case["route"] = "Alternate Route (Traffic Avoided)"
    emergency_case["eta"] = "8 mins"
    return jsonify(emergency_case)

@app.route("/traffic-alert")
def traffic_alert():
    emergency_case["traffic_alert"] = True
    return jsonify(emergency_case)

@app.route("/status")
def status():
    return jsonify(emergency_case)

if __name__ == "__main__":
    app.run(debug=True)

