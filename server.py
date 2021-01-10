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
    page = data_dict['page']
    print(f'data===>> {name}')
    print(f'data===>> {page}')
    response_title = requests.get(f'http://www.omdbapi.com/?s={name}&apikey=fea3251d&page={page}')
    list_of_movies = response_title.json()
    # total_results = int(response_title.json()['totalResults'])
    # print(f'total_results===> {total_results}')

    # full_list_of_movies = []

    # for i in range(total_results//10):
    #     response_title = requests.get(f'http://www.omdbapi.com/?s={name}&apikey=fea3251d&page={page}')
    #     list_of_movies = response_title.json()
    #     full_list_of_movies+= list_of_movies['Search']
    #     page+= 1

    # print(f'full_list_of_movies===> {full_list_of_movies}')
    
    # titles = []
    # years = []
   
#    res = [ sub['gfg'] for sub in test_list ] 
    # if total_results > 0:
    #     pages = round(len(full_list_of_movies)// 10) 
    #     for i in range(len(full_list_of_movies)):
    #         title = full_list_of_movies[i]['Title']
    #         print(f'title===> {title}')
    #         print(f'i===> {i}')
            
    #         titles.append(title)
    #         year = full_list_of_movies[i]['Year']
    #         years.append(year) 


    #         # for element in full_list_of_movies[i]['Search']:
    #         #     print(f'element===> {element}')
    #         # title = full_list_of_movies[i]['Search']
    #         # print(f'element===> {element['Title']}')
    
    # else:
    #     print('No such a movie')

    # print(titles)        

    # return jsonify({'status': 'ok', 'titles': titles, 'years': years, 'pages': pages})

    return jsonify({'status': 'ok', 'response': list_of_movies })









if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)