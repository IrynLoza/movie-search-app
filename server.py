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
    return render_template('index.html')

@app.route('/api/movies', methods = ['POST'])
def get_titles():
    """Get all titles by name"""
    data = request.data
    dataDict = json.loads(data)
    name = dataDict['name']
    print(f'data===>> {name}')
    response = requests.get(f'http://www.omdbapi.com/?s={name}&apikey=fea3251d&')

    list_of_movies = response.json()
    titles = []
    total_results = len(list_of_movies['Search'])

    if total_results > 0:
        for i in range(total_results):
            title = list_of_movies['Search'][i].get('Title')
            titles.append(title)
            
        print(titles)
    else:
        print('No such a movie')    

    return jsonify({'status': 'ok', 'titles': titles})









if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)