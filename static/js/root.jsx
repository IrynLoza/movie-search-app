'use strict';

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const Prompt = ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const { Container, Col, Row } = ReactBootstrap;

//Create component to handle web page with Search
function Search() {

    const [name, setName] = React.useState('');
    const [movies, setMovies] = React.useState([]);
    const [pages, setPages] = React.useState([]);
    const [nominates, setNominate] = React.useState([]);

    function search(value) {
        if (name) {
            fetch('/api/movies', {
                method: 'POST',
                body: JSON.stringify({ name, page: value }),
                header: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 'ok') {
                        //Add active key to object 
                        setMovies(data.response.Search.map(el => {
                            return {
                                active: false,
                                ...el
                            }
                        }))
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
        el.active = true;
        // console.log(el)
        if (nominates.length < 5) {
            setNominate([...nominates, el])
            if (nominates.length === 4) {
                toastr["success"]('Congratylations! You successfully did 5 nominates!')
            }
        } else {
            toastr["error"]("You've already done 5 nominates")
            // console.log([...nominates, el])
        }


    }



    function removeNominate(el, index) {
        // const index = nominates.indexOf(el);
        nominates.splice(index, 1);
        console.log('nominates==>', nominates)
        console.log('nominates==>', nominates)
        setNominate([...nominates])
        el.active = false;
    }


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                    <br></br>
                    <h1>The Shoppies</h1>
                    </Col>
                </Row>
            
            
                <Row>
                    <Col> 
            <br></br>
            <h4>Movie title</h4>
            <br></br>
            <input className="search" id="search" type="text" placeholder="Search movie" onChange={e => { setName(e.target.value) }} onKeyPress={event => { if (event.key === "Enter") { search() } }}></input>
            <button className="button" name="search" onClick={() => { search(1) }}>Search</button>
            <br></br>
            </Col>
                </Row>
            

                <Row>       
                    <Col sm={8}> 
                    <br></br> 
            <h4>Result for {name.length > 0 ? `"${name}"` :  undefined }</h4>
            <div>
                {movies.length === 0 ? "Search and nominate your favorite movie" : movies.map((el, index) => {
                    return (
                        <div key={index}>
                            <br></br>
                            <div className="center"><span className="title">{el.Title}</span><br></br><img src={el.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/1/16/No_image_available_450_x_600.svg' : el.Poster}></img>Year of release {el.Year}<br></br><button className="button" id="nominate" disabled={el.active} onClick={e => { nominate(el) }}>Nominate</button><br></br></div>
                        </div>
                    )
                })}
            </div>
            {/* <div className="center"> 
                {Array.apply(null, Array(pages)).map((el, index) => {
                    return (
                        <div className="content_detail__pagination cdp" actpage="1">
                        <a href="#!-1" class="cdp_i">prev</a>
                        <a href="#" onClick={() => { search(index + 1) }} key={index}>{index + 1}</a>
                        <a href="#!+1" class="cdp_i">next</a>
                        </div>
                    )
                })}
            </div> */}
            <div className="center"> 
                {pages.length === 0 ? undefined : Array.apply(null, Array(pages)).map((el, index) => {
                    return (
                        // <a href="#">&laquo;</a>
                        <a href="#" onClick={() => { search(index + 1) }} key={index}>{index + 1}</a>
                        // <a href="#">&laquo;</a>
                    )
                })}
            </div>
            </Col>
                    <Col sm={4}> 
                    <br></br>         
            <h4>Nominations</h4>
            <br></br>
            <ul>
                {nominates.map((el, index) => {
                    return (
                        <li key={index}>
                            <div>{el.Title} ({el.Year}) <button className="button" id="remove-nominate" onClick={e => { removeNominate(el, index) }}>Remove</button></div>
                            <br></br>
                        </li>
                    )
                })}
            </ul>
            </Col>
                </Row>
            </Container>
        </div>
    )
}


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/"><Search /></Route>
                </Switch>
            </div>
        </Router>
    );
}

//Render full App 
ReactDOM.render(<App />, document.getElementById('root'))
