import React, {Component} from 'react';
import axios from "axios";
import HitItem from "./HitItem";

class HitDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            hit:null
        }
    }
    getHits(id){
        // let url='https://pixabay.com/api/?key=22605411-6474a877a76d6bfd37b0e01e7&q='
        //     +this.state.currentkeyword+"&page="+this.state.currentPage+"&per_page="+this.state.pageSize;
        let url='https://pixabay.com/api/?key=22605411-6474a877a76d6bfd37b0e01e7&id='+id;
        axios.get(url).then((resp )=>{
            console.log(resp)

            this.setState({
                hit:resp.data.hits[0],
            });
        }).catch((err=>{
            console.log(err)
        }))

    }
    componentDidMount() {
        this.getHits(this.props.match.params.id)
    }

    render() {
        if(this.state.hit!=null)
        return (
            <HitItem hit={this.state.hit} details={true}/>
        );
        else {
            return <div></div>
        }
    }
}

export default HitDetails;