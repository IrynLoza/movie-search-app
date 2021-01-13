'use strict';

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useLocation = ReactRouterDOM.useLocation;
const useHistory = ReactRouterDOM.useHistory;

//Create component to handle web page with Search
function Search() {

    const [name, setName] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [pages, setPages] = React.useState([]);
    const [nominates, setNominate] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false)


    
    function search(value) {
        if (name) {
            fetch('/api/movies', {
                method: 'POST', 
                body: JSON.stringify({ name, page: value}),
                header: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 'ok') {
                        setMovies(data.response.Search)
                        setPages(Math.round(data.response.totalResults / 10))
                    } 

                })
                // Handle error
                .catch(err => {
                    console.log("Error Reading data " + err);
                });
        }      
    }

   

    function nominate(el) {
        // console.log(el)
        if (nominates.length < 5) {
            setNominate([...nominates, el])
            if (nominates.length === 4) {
                alert('You did 5 nominates!')
            }
        } else {
            alert("You've already done 5 nominates")
            // console.log([...nominates, el])
        }

        
    }

  

    function removeNominate(el) {
        console.log(el)
        const index = nominates.indexOf(el);
        if (index > -1) {
        nominates.splice(index, 1);
        }
        setDisabled(false)
    }



    




    

    
    return (
        <div>
            <p>The Shoppies!</p>
            <label htmlFor="search">Movie title</label>
            <br></br>
            <input id="search" type="text" placeholder="Search.." onChange={e => { setName(e.target.value)}} onKeyPress={event => {if (event.key === "Enter") {search()}}}></input>
            <button name="search" onClick={() => { search(1)}}>Search</button>
            <br></br>
            <p>Result for "{name}":</p>
            <ul>
                {movies.map((el, index) => {
                            return (
                                <li key={index}>
                                    <div><img height="70" width="50" src={el.Poster}></img>{el.Title} ({el.Year}) <button id="nominate" disabled={disabled} onClick={e => {nominate(el), setDisabled(true)}}>Nominate</button></div>
                                </li>
                            )
                        })}
            </ul>
            <div className="pagination">
                <a href="#">&laquo;</a>
                { Array.apply(null, Array(pages)).map((el, index) => {
                            return (
                                <a href="#" onClick={() => { search(index+1)}} key={index}>{index+1}</a>
                            )
                        })}

               
                <a href="#">&raquo;</a>
            </div>
            <p>Nominations:</p>
            <ul>
                {nominates.map((el, index) => {
                            return (
                                <li key={index}>
                                    <div>{el.Title} ({el.Year}) <button id="remove-nominate" onClick={e => {removeNominate(el)}}>Remove</button></div>
                                </li>
                            )
                        })}
            </ul>
           

        </div>
    )
}


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <Search />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

//Render full App 
ReactDOM.render(<App />, document.getElementById('root'))
