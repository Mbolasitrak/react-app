import React, {Component} from 'react';
import axios from "axios";
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state={
            hits:[],
            currentPage:1,
            pageSize:10,
            currentkeyword:'',
            totalPages:1,
            pages:[]
        }
    }
    componentDidMount() {
        //this.getHits();
    }
    setKeyword=(event)=>{
        this.setState({
            currentkeyword: event.target.value
        })
    }

    getHits(){
        let url='https://pixabay.com/api/?key=22605411-6474a877a76d6bfd37b0e01e7&q='
            +this.state.currentkeyword+"&page="+this.state.currentPage+"&per_page="+this.state.pageSize;
        axios.get(url).then((resp )=>{
            console.log(resp)
            let totalP = (resp.data.totalHits%this.state.pageSize===0)?
                resp.data.totalHits/this.state.pageSize:1+resp.data.totalHits/this.state.pageSize;
            this.setState({
                hits:resp.data.hits,
                totalPages:totalP,
                pages:new Array(totalP).fill(0)
            });

        }).catch((err=>{
            console.log(err)
        }))

    }
    search=(event)=>{
        event.preventDefault();
        this.getHits();

    }
    goToPage=(page)=>{
        this.setState({
            currentPage: page
        },()=>{
            this.getHits();
        })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.search}>
                    <div>{this.state.currentkeyword}</div>
                    <div className="row m-2 p-2">
                        <div className="col">
                            <input type="text"
                                   value={this.state.currentkeyword}
                                   onChange={this.setKeyword}
                                   className="form-control" placeholder="keyword"/>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success" type="submit">Chercher</button>
                        </div>

                    </div>
                </form>
                <div className="row">
                {

                    this.state.hits.map(hit=>
                    <div className ="col-md-4" key={hit.id}>
                        <div className = "card">
                            <div className = "card-header">
                                {hit.tags} | {hit.webformatWidth} x {hit.webformatHeight}
                            </div>
                            <div className="card-body">
                                <img className="card-img" height={200} src={hit.webformatURL} alt="hit image"/>
                            </div>
                        </div>
                    </div>

                    )
                }
                </div>
                <div>
                    <ul className="nav nav-pills">
                        {
                            this.state.pages.map((v,index)=>

                                <li key={index}>
                                    <button className={this.state.currentPage===index+1?'btn btn-primary':'btn btn-link'} alt={"hit"} onClick={()=>this.goToPage(index+1)}>{index+1}</button>
                                </li>
                            )
                        }
                    </ul>

                </div>
            </div>
        )
    }
}

export default Gallery;
