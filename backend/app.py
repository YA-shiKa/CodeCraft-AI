from flask import Flask, request, jsonify
from flask_cors import CORS
from codegen import generate_code

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    language = data.get("language", "python")
    task = data.get("task", "")

    if not task.strip():
        return jsonify({"code": "// Please describe your task."})

    prompt = f"### Language: {language}\n### Task: {task}\n### Code:"
    try:
        result = generate_code(prompt)
        return jsonify({"code": result})
    except Exception as e:
        return jsonify({"code": f"// Error: {str(e)}"})

if __name__ == '__main__':
    app.run(debug=True)
