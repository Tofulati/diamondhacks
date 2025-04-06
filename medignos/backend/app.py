from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from model import generate_response
from classify import classify_image  # Replace with your actual model import

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.environ['FLASK_ENV'] = 'production'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/send_message', methods=['POST'])
def send_message():
    try:
        message = request.form.get('message')
        file = request.files.get('file')
        saved_file_info = None
        diagnosis_string = None

        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            saved_file_info = {'filename': filename, 'path': file_path}

            # Get the classification result from your model
            diagnosis_string = classify_image(file_path)  # Replace with actual model logic

        if not message and not file:
            return jsonify({"status": "error", "message": "Message or file required"}), 400

        # Construct message based on diagnosis
        if not message and diagnosis_string or message and diagnosis_string:
            message = (
                f"I got a diagnosis for my skin condition through a medical machine learning model. "
                f"If this happens, you will provide them with a description of the diagnosis and steps to treat/prevent the disease."
                f"This should be in the same format as the previous prompts or responses. "
                f"The following diagnosis was {diagnosis_string}. I want you to tell me more about it and give me resources or ways to address the issue."
            )

        bot_response = generate_response(message)

        return jsonify({
            "status": "success",
            "message": message,
            "response": bot_response,
            "file": saved_file_info,
            "diagnosis": diagnosis_string
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
