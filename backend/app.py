from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")
CORS(app, origins=["http://localhost:5173"])

# **Signal Functions**
def rect(t):
    return np.where(np.abs(t) <= 0.5, 1, 0)

def tri(t):
    return np.where(np.abs(t) <= 1, 1 - np.abs(t), 0)

def sinc(t):
    return np.sinc(t / np.pi)

def u(t):
    return np.where(t >= 0, 1, 0)

def calculate_energy(y, t):
    """Calculate the energy of the signal as the integral of y^2."""
    dt = t[1] - t[0]  # Time step
    return np.trapz(y**2, dx=dt)

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    formula = data.get('formula')
    t = np.linspace(-2, 2, 1000)

    try:
        # Remplacement des fonctions
        formula = formula.replace("rect(", "rect_func(")
        formula = formula.replace("tri(", "tri_func(")
        formula = formula.replace("sinc(", "sinc_func(")
        formula = formula.replace("u(", "u_func(")

        local_dict = {
            "t": t,
            "pi": np.pi,
            "sin": np.sin,
            "cos": np.cos,
            "tan": np.tan,
            "exp": np.exp,
            "log": lambda x: np.log(np.abs(x) + 1e-9),
            "sqrt": lambda x: np.sqrt(np.abs(x)),
            "rect_func": rect,
            "tri_func": tri,
            "sinc_func": sinc,
            "u_func": u
        }

        y = eval(formula, {"__builtins__": {}}, local_dict)
        energy = calculate_energy(y, t)

        return jsonify({"t": t.tolist(), "y": y.tolist(), "energy": energy})

    except Exception as e:
        print(f"Error evaluating formula: {e}")
        return jsonify({"error": f"Error evaluating formula: {str(e)}"}), 400

@app.route('/')
@app.route('/<path:path>')
def serve(path="index.html"):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(debug=True)
