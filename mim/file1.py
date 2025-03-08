import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import Entry, Label, Button, Frame

# Define functions

def rect(t):
    return np.where(np.abs(t) <= 0.5, 1, 0)

def tri(t):
    return np.where(np.abs(t) <= 1, 1 - np.abs(t), 0)

def sinc(t):
    return np.sinc(t / np.pi)  # sinc function defined as sin(pi*t)/(pi*t)

def unit_step(t):
    return np.where(t >= 0, 1, 0)

def evaluate_function(t, formula):
    try:
        return eval(formula, {"t": t, "np": np, "rect": rect, "tri": tri, "sinc": sinc, "sin": np.sin, "cos": np.cos, "tan": np.tan, "exp": np.exp, "log": np.log, "sqrt": np.sqrt, "u": unit_step})
    except Exception as e:
        error_label.config(text=f"Error: {str(e)}")
        return None

def plot_signal():
    formula = input_box.get()
    t = np.linspace(-2, 2, 1000)
    y = evaluate_function(t, formula)
    
    if y is not None:
        plt.figure(figsize=(8, 4))
        plt.plot(t, y, label=f"x(t) = {formula}", color='b')
        plt.axhline(0, color='black', linewidth=0.5)
        plt.axvline(0, color='black', linewidth=0.5)
        plt.grid(True, linestyle='--', alpha=0.6)
        plt.ylim(min(y) - 1, max(y) + 1)
        plt.legend()
        plt.title("Visualisation du Signal x(t)")
        plt.xlabel("Temps t")
        plt.ylabel("Amplitude")
        plt.show()

def add_to_input(text):
    if text in ["sin", "cos", "tan", "exp", "log", "sqrt", "rect", "tri", "sinc", "u"]:
        input_box.insert(tk.END, f"{text}()")  # Add parentheses for functions
        input_box.icursor(len(input_box.get()) - 1)  # Move cursor inside parentheses
    else:
        input_box.insert(tk.END, text)

# Tkinter GUI Setup
root = tk.Tk()
root.title("Visualisation du Signal")
root.geometry("500x400")
root.configure(bg="#f0f0f0")

# Styling
button_bg = "#4CAF50"  # Green
button_fg = "#ffffff"  # White
button_active_bg = "#45a049"  # Darker green
button_hover_bg = "#66bb6a"  # Lighter green
entry_bg = "#ffffff"  # White
entry_fg = "#000000"  # Black
label_bg = "#f0f0f0"  # Light gray
label_fg = "#000000"  # Black
error_fg = "#ff0000"  # Red

# Function to add hover effect
def on_enter(e, button):
    button.config(bg=button_hover_bg)

def on_leave(e, button):
    button.config(bg=button_bg)

# Input Label and Entry
Label(root, text="Entrez une fonction de t (ex: 2*sin(t), rect(t-1), tri(t)):", bg=label_bg, fg=label_fg, font=("Arial", 12)).pack(pady=10)
input_box = Entry(root, width=40, bg=entry_bg, fg=entry_fg, font=("Arial", 12), relief="flat", bd=2)
input_box.pack(pady=10)
input_box.focus_set()  # Auto-focus on the input box

# Create a frame for the buttons
button_frame = Frame(root, bg=label_bg)
button_frame.pack(pady=10)

# Define buttons for common operations and functions
buttons = [
    'sin', 'cos', 'tan', 'exp', 'log', 'sqrt',
    'rect', 'tri', 'sinc', 'u', '(', ')', '+', '-', '*', '/', '^', 't'
]

# Add buttons to the frame
for i, text in enumerate(buttons):
    button = Button(
        button_frame, text=text, command=lambda t=text: add_to_input(t),
        bg=button_bg, fg=button_fg, activebackground=button_active_bg,
        font=("Arial", 10), width=5, relief="flat", bd=0
    )
    button.grid(row=i // 4, column=i % 4, padx=5, pady=5)
    # Add hover effects
    button.bind("<Enter>", lambda e, b=button: on_enter(e, b))
    button.bind("<Leave>", lambda e, b=button: on_leave(e, b))

# Plot Button
plot_button = Button(
    root, text="Tracer le signal", command=plot_signal,
    bg="#4CAF50", fg="#ffffff", activebackground="#45a049",
    font=("Arial", 12), relief="flat", bd=0
)
plot_button.pack(pady=10)
# Add hover effects to the plot button
plot_button.bind("<Enter>", lambda e: plot_button.config(bg=button_hover_bg))
plot_button.bind("<Leave>", lambda e: plot_button.config(bg=button_bg))

# Error Label
error_label = Label(root, text="", fg=error_fg, bg=label_bg, font=("Arial", 10))
error_label.pack()

root.mainloop()