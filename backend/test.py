import requests

new_player = {
    "player": "pratyush",
    "mat": 25,
    "runs": 750,
    "avg": 32.5,
    "sr": 135.0,
    "fours": 65,
    "sixes": 30,
    "start_year":2010,
    "end_year":2025
}

response = requests.post(url='http://127.0.0.1:8000/predict',data=new_player)
print(response)
