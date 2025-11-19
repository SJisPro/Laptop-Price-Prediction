from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = joblib.load("laptop_price_model.joblib")

# Input schema
class LaptopSpecs(BaseModel):
    Company: str
    TypeName: str
    Inches: float
    Ram: int
    Memory: int
    Weight: float
    Cpu_brand: str
    Gpu_brand: str
    OpSys: str

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/ready")
def readiness_check():
    return {"status": "ready"}

@app.get("/options")
def get_dropdown_options():
    return {
        "Company": ["Dell", "HP", "Lenovo", "Asus", "Acer", "Apple", "MSI", "Toshiba"],
        "TypeName": ["Ultrabook", "Notebook", "Gaming", "2 in 1 Convertible", "Workstation"],
        "Cpu_brand": ["Intel", "AMD", "Samsung"],
        "Gpu_brand": ["Intel", "Nvidia", "AMD"],
        "OpSys": ["Windows 10", "Mac OS X", "Linux", "No OS"],
        "Inches": [11.6, 13.3, 14.0, 15.6, 16.0, 17.3],
        "Weight": [1.0, 1.2, 1.5, 1.8, 2.0, 2.2, 2.5, 3.0],
        "Ram": [4, 8, 16, 32],
        "Memory": [128, 256, 512, 1024, 2048]
    }



@app.post("/predict")
def predict_price(data: LaptopSpecs):
    input_df = pd.DataFrame([data.dict()])
    prediction = model.predict(input_df)
    return {"predicted_price": round(prediction[0], 2)}

@app.get("/")
def root():
    return {"status": "Backend is live 🎉"}
