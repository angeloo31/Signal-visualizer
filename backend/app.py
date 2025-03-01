from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend/build")
CORS(app)  # Enable CORS for all routes

# Define functions
def rect(t):
    return np.where(np.abs(t) <= 0.5, 1, 0)

def tri(t):
    return np.where(np.abs(t) <= 1, 1 - np.abs(t), 0)

def sinc(t):
    return np.sinc(t / np.pi)

def unit_step(t):
    return np.where(t >= 0, 1, 0)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    formula = data.get('formula')
    t = np.linspace(-2, 2, 1000)
    
    try:
        # Evaluate the formula
        y = eval(formula, {"t": t, "np": np, "rect": rect, "tri": tri, "sinc": sinc, "sin": np.sin, "cos": np.cos, "tan": np.tan, "exp": np.exp, "log": np.log, "sqrt": np.sqrt, "u": unit_step})
        return jsonify({"t": t.tolist(), "y": y.tolist()})
    except Exception as e:
        # Log the error for debugging
        print(f"Error evaluating formula: {e}")
        return jsonify({"error": f"Error evaluating formula: {str(e)}"}), 400

# Serve React Frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)