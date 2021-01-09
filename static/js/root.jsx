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
    const [titles, setTitles] = React.useState([]);
    const [years, setYears] = React.useState([]);
    
    function search() {
    
        fetch('/api/movies', {
            method: 'POST',
            body: JSON.stringify({name}),
            header: {
                'Content-Type': 'application/json',
                // 'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 'ok') {
                    setTitles(data.titles)
                    setYears(data.years)
                } 
            })
            // Handle error
            .catch(err => {
                console.log("Error Reading data " + err);
              });
    }

    


    return (
        <div>
            <p>The Shoppies!</p>
            <label htmlFor="search">Movie title</label>
            <br></br>
            <input id="search" type="text" placeholder="Search.." onChange={e => { setName(e.target.value)}} onKeyPress={event => {if (event.key === "Enter") {search()}}}></input>
            <button name="search" onClick={search}>Search</button>
            <br></br>
            <p>Result for "{name}"</p>
            <br></br>
            <ul>
                {titles.map((el, index) => {
                    let year = years[index];
                            return (
                                <li key={index}>{el} {year} <button name="nominate">Nominate</button></li>
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
