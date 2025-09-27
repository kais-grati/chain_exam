from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64
import os

app = Flask(__name__)
CORS(app)

def load_api_key():
    try:
        with open('api_key.txt', 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        return None

API_KEY = load_api_key()

@app.route('/api/ocr', methods=['POST'])
def extract_text():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Aucun fichier envoyé'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'Nom de fichier vide'}), 400
        
        image_content = file.read()
        image_base64 = base64.b64encode(image_content).decode('utf-8')
        
        url = f'https://vision.googleapis.com/v1/images:annotate?key={API_KEY}'
        
        request_body = {
            "requests": [{
                "image": {"content": image_base64},
                "features": [{"type": "DOCUMENT_TEXT_DETECTION"}]
            }]
        }
        
        response = requests.post(url, json=request_body)
        result = response.json()
        
        if 'responses' in result and len(result['responses']) > 0:
            if 'textAnnotations' in result['responses'][0]:
                extracted_text = result['responses'][0]['textAnnotations'][0]['description']
                return jsonify({'success': True, 'text': extracted_text}), 200
        
        return jsonify({'success': False, 'message': 'Aucun texte détecté'}), 200
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)