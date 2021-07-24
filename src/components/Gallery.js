import React, {Component} from 'react';
import axios from "axios";
import HitItem from "./HitItem";
import SearchHitForm from "./SearchHitForm";
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


    getHits(keyword){
        // let url='https://pixabay.com/api/?key=22605411-6474a877a76d6bfd37b0e01e7&q='
        //     +this.state.currentkeyword+"&page="+this.state.currentPage+"&per_page="+this.state.pageSize;
        let url='https://pixabay.com/api/?key=22605411-6474a877a76d6bfd37b0e01e7&q='
            +keyword+"&page="+this.state.currentPage+"&per_page="+this.state.pageSize;
        axios.get(url).then((resp )=>{
            console.log(resp)
            let totalP = (resp.data.totalHits%this.state.pageSize===0)?
                resp.data.totalHits/this.state.pageSize:1+Math.floor(resp.data.totalHits/this.state.pageSize);
            this.setState({
                hits:resp.data.hits,
                totalPages:totalP,
                pages:new Array(totalP).fill(0),
                currentkeyword:keyword
            });

        }).catch((err=>{
            console.log(err)
        }))

    }
    search=(keyword)=>{//event
        //event.preventDefault();
        /*this.setState({
            currentkeyword:keyword
        })*/
        let page=1;
        this.setState({
            currentPage:1,
            page: []
        },()=>{
            this.getHits(keyword);
        })


    }
    goToPage=(page)=>{
        this.setState({
            currentPage: page
        },()=>{
            this.getHits(this.state.currentkeyword);
        })

    }

    render() {
        return (
            <div>
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
                <SearchHitForm onSearch={this.search}/>
                <div className="row">
                {
                    this.state.hits.map(hit=>
                        <HitItem hit={hit} details={false} key={hit.id}/>
                    )
                }
                </div>

            </div>
        )
    }
}

export default Gallery;
