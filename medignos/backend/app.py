from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from model import generate_response

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/send_message', methods=['POST'])
def send_message():
    try:
        message = request.form.get('message')
        file = request.files.get('file')

        print(f"Received message: {message}")
        saved_file_info = None

        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            saved_file_info = {
                'filename': filename,
                'path': file_path
            }

        if not message and not file:
            return jsonify({"status": "error", "message": "Message or file required"}), 400
        
        bot_response = generate_response(message)
        print("Bot response:", bot_response)  # Log the bot response

        return jsonify({
            "status": "success",
            "message": message,
            "response": bot_response,  # Ensure this is the correct response key
            "file": saved_file_info
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
