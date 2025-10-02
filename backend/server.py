from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

class batsmanData(BaseModel):
    player: str
    mat: int
    runs: int
    sr: float
    avg: float
    fours: int
    sixes: int
    start_year: int
    end_year: int

class bowlerData(BaseModel):
    player: str
    mat: int
    wickets: int
    econ: float
    sr: float
    start_year: int
    end_year: int

class requestData(BaseModel):
    player_data: batsmanData | bowlerData

batting_model = joblib.load('models/analysis/batting_model.pkl')
bowling_model = joblib.load('models/analysis/bowling_model.pkl')

def calculate_batsman_data(player_data: batsmanData):
    boundary_pct = ((player_data.fours*4) + (player_data.sixes*6))/(player_data.runs)
    career_length = player_data.end_year - player_data.start_year


    model_data = pd.DataFrame([{
        "mat": player_data.mat,
        "runs": player_data.runs,
        "avg": player_data.avg,
        "sr": player_data.sr,
        "career_length": career_length,
        "fours": player_data.fours,
        "sixes": player_data.sixes,
        "boundary_pct": boundary_pct,
        
    }])
    return model_data

def calculate_bowler_data(player_data: bowlerData):
    career_length = player_data.end_year - player_data.start_year

    model_data = pd.DataFrame([{
        "mat": player_data.mat,
        "wickets": player_data.wickets,
        "econ": player_data.econ,
        "sr": player_data.sr,
        "career_length": career_length,
    }])

    return model_data

def classify_batter(player_data):
    model_data = calculate_batsman_data(player_data)
    predicted_category = batting_model.predict(model_data)
    return predicted_category[0]

def classify_bowler(player_data):
    model_data = calculate_bowler_data(player_data)
    predicted_category = bowling_model.predict(model_data)
    return predicted_category[0]
    

@app.post("/predict/{player_type}")

def predict(player_type: str, request: requestData):
    if player_type.lower() == "batsman":
        response = classify_batter(request.player_data)
    
    elif player_type.lower() == "bowler":
        response = classify_bowler(request.player_data)
    
    return {"predicted_category": response}

