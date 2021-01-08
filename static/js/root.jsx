'use strict';

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useLocation = ReactRouterDOM.useLocation;
const useHistory = ReactRouterDOM.useHistory;

//Create component to handle Homepage
function Search() {

    const [name, setName] = React.useState('');
    console.log(name)
    
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
                    console.log(`data with titles===>${data.titles}`)
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
