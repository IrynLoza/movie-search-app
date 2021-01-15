from flask import Flask, render_template, request, redirect, jsonify

import json
import os
import requests

app = Flask(__name__)
app.secret_key = 'dev'
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']

#The main endpoint
@app.route('/')
def root():
    """Render homepage"""

    return render_template('index.html')


@app.route('/api/movies', methods = ['POST'])
def get_titles():
    """Get all titles by name"""

    data = request.data
    data_dict = json.loads(data)
    name = data_dict['name']
    page = data_dict['page']
    response_title = requests.get(f'http://www.omdbapi.com/?s={name}&apikey=fea3251d&page={page}')
    list_of_movies = response_title.json()

    return jsonify({'status': 'ok', 'response': list_of_movies })




if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)