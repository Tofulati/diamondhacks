from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Directory where uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/send_message', methods=['POST'])
def send_message():
    try:
        # Get text message from the form data
        message = request.form.get('message')
        file = request.files.get('file')

        print(f"Received message: {message}")

        saved_file_info = None

        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            print(f"Saved file to: {file_path}")
            saved_file_info = {
                'filename': filename,
                'path': file_path
            }

        if not message:
            return jsonify({"status": "error", "message": "Message is empty"}), 400

        # Here, we simulate the bot response by echoing the message back
        bot_reply = f"Bot received: {message}"

        # Process or store the message and file info here (if needed)

        return jsonify({
            "status": "success",
            "message": message,
            "file": saved_file_info,
            "bot_reply": bot_reply  # Send back bot's response
        }), 200

    except Exception as e:
        print(f"Error while handling message: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
