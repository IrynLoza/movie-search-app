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

#TODO 
#Change to get
@app.route('/api/movies', methods = ['POST'])
def get_titles():
    """Get all titles by name"""
    data = request.data
    data_dict = json.loads(data)
    name = data_dict['name']
    print(f'data===>> {name}')
    response_title = requests.get(f'http://www.omdbapi.com/?s={name}&apikey=fea3251d&')
    # response_year = 

    list_of_movies = response_title.json()
    titles = []
    years = []
    total_results = len(list_of_movies['Search'])

    if total_results > 0:
        for i in range(total_results):
            title = list_of_movies['Search'][i].get('Title')
            year = list_of_movies['Search'][i].get('Year')
            titles.append(title)
            years.append(year)
            
        print(titles)
    else:
        print('No such a movie')    

    return jsonify({'status': 'ok', 'titles': titles, 'years': years})









if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)