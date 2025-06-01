# 💻 Laptop Price Predictor (ML + FastAPI + React)

This is a full-stack web application to predict laptop prices using a machine learning model. Built with:

- 🧠 **Backend**: Python, FastAPI, Scikit-learn, Joblib
- 🌐 **Frontend**: React.js (Create React App)
- 📦 **Model**: Trained on laptop specs dataset, serialized via joblib
- ☁️ **Deployment**: Backend on Render, Frontend on Vercel

## 🔧 Features
- Predict laptop prices based on input specs
- Dropdowns and toggle buttons for quick selection
- Fully deployed, mobile-friendly UI

## 📸 Screenshot

![Screenshot 2025-06-01 170017](https://github.com/user-attachments/assets/e7842c9f-db07-4558-b6f0-7e18831c2617)

## 📁 Project Structure
```
laptop-price-predictor/
├── backend/           # FastAPI app
│   ├── main.py
│   ├── laptop_price_model.joblib
│   └── requirements.txt
├── frontend/          # React app
│   ├── public/
│   ├── src/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### ▶ Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### ▶ Frontend (React)
```bash
cd frontend
npm install
npm start
```

> Update `App.js` to point to your backend URL (especially after deployment):
```js
axios.get("https://your-backend.onrender.com/options")
axios.post("https://your-backend.onrender.com/predict", form)
```

---

## 🌍 Deployment

### ✅ Backend on Render
1. Upload `main.py`, `model.joblib`, `requirements.txt`
2. Set start command:
   ```bash
   uvicorn main:app --host=0.0.0.0 --port=10000
   ```
3. Enable CORS (already in `main.py`)

### ✅ Frontend on Vercel
1. Deploy via GitHub monorepo
2. Set root directory to `frontend`
3. Add env var (optional): `REACT_APP_API_URL=https://your-backend.onrender.com`

---

## 🎯 Sample Input Fields
- Company: Dell, HP, Lenovo...
- Type: Ultrabook, Gaming...
- Screen Size: 13.3", 14.0", 15.6"...
- RAM: 4GB, 8GB, 16GB...
- Memory: 256GB, 512GB, 1TB...

---

## 📦 Requirements (Backend)
```
fastapi
uvicorn
pydantic
numpy
pandas
scikit-learn
joblib
```

---

## 📝 License
MIT License

---

## 🤝 Acknowledgments
- Laptop price dataset (Kaggle or custom)
- FastAPI and React docs
- Render & Vercel for free hosting

---

## 📬 Contact
Feel free to reach out for suggestions, bugs, or collaboration!
