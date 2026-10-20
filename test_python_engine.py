import urllib.request
import json

base_url = "http://localhost:8000"

def test_endpoint(name, path, method="GET", body=None):
    url = f"{base_url}{path}"
    req = urllib.request.Request(url, method=method)
    req.add_header("Content-Type", "application/json")
    data_bytes = json.dumps(body).encode("utf-8") if body else None
    
    with urllib.request.urlopen(req, data=data_bytes) as resp:
        assert resp.status == 200, f"Expected 200, got {resp.status}"
        res_json = json.loads(resp.read().decode("utf-8"))
        print(f"✅ {name}: PASSED")
        return res_json

print("=====================================================")
print("🧪 TESTING UTA PYTHON CORE ENGINE (FASTAPI)")
print("=====================================================")

# 1. Health
test_endpoint("Health Check", "/api/py/health")

# 2. Tournament Bracket Solver
bracket_res = test_endpoint(
    "Tournament Bracket Solver",
    "/api/py/tournaments/generate-bracket",
    method="POST",
    body={
        "tournament_name": "Utah Premier Cricket Cup 2027",
        "teams": [
            {"id": "t1", "name": "Salt Lake Strikers", "seed": 1},
            {"id": "t2", "name": "Wasatch Warriors", "seed": 2},
            {"id": "t3", "name": "Sandy Super Kings", "seed": 3},
            {"id": "t4", "name": "Draper Daredevils", "seed": 4},
            {"id": "t5", "name": "Lehi Lions", "seed": 5},
            {"id": "t6", "name": "Provo Panthers", "seed": 6}
        ],
        "courts_available": 2
    }
)
print(f"   -> Bracket Size: {bracket_res['bracket_size']} slots, Total Matches: {len(bracket_res['matches'])}")

# 3. ICC Net Run Rate Engine
nrr_res = test_endpoint(
    "ICC Net Run Rate Engine",
    "/api/py/tournaments/calculate-nrr",
    method="POST",
    body={
        "runs_scored": 185,
        "overs_faced": 20.0,
        "runs_conceded": 142,
        "overs_bowled": 19.4
    }
)
print(f"   -> NRR: {nrr_res['net_run_rate']} ({nrr_res['status']})")

# 4. Financial Forecasting
forecast_res = test_endpoint(
    "Financial Forecast Engine",
    "/api/py/analytics/financial-forecast",
    method="POST",
    body={
        "current_active_members": 350,
        "projected_member_growth_percent": 20.0,
        "average_membership_fee": 50.0,
        "expected_event_ticket_revenue": 30000.0,
        "confirmed_sponsorship_revenue": 20000.0,
        "projected_annual_expenses": 45000.0
    }
)
print(f"   -> Total Projected Revenue: ${forecast_res['total_projected_revenue']:,.2f}")
print(f"   -> Net Operating Surplus: ${forecast_res['projected_net_operating_surplus']:,.2f}")

# 5. Smart Announcement Synthesis
comm_res = test_endpoint(
    "Announcement Synthesizer",
    "/api/py/communications/synthesize-announcement",
    method="POST",
    body={
        "event_title": "Grand Sankranthi Sambaralu 2027",
        "telugu_title": "సంక్రాంతి సంబరాలు",
        "date_str": "Saturday, Jan 16, 2027 at 10:00 AM",
        "venue_name": "Salt Lake Arts Center",
        "registration_url": "https://utahtelugu.org/events/sankranthi-sambaralu-2027",
        "highlights": [
            "Gaalipatam (Kite Flying) Festival",
            "Muggulu (Rangoli) Competition",
            "Authentic Grand Telugu Feast",
            "Classical Kuchipudi & Folk Stage Performances"
        ]
    }
)
print(f"   -> Generated WhatsApp Broadcast & Telugu Greeting: {comm_res['telugu_greeting']}")

print("=====================================================")
print("🎉 ALL PYTHON ENGINE TESTS PASSED!")
print("=====================================================")
