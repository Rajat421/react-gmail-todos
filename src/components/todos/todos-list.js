
import React, { Component } from 'react';
import axios from 'axios'
import {URLS} from '../../common/url-constants'
import './todos.css'
class TodoList extends Component {
    constructor(props){
        super(props)
      this.token=""
      this.headers=""
        this.state={
            upcomingEvents:[],
            isFormOpen:false
        }
        this.openForm=this.openForm.bind(this);
        this.formHandler=this.formHandler.bind(this);
        this.addTodos=this.addTodos.bind(this);
        this.closeForm=this.closeForm.bind(this)
        this.deleteTodo=this.deleteTodo.bind(this)
        this.logout=this.logout.bind(this)
        if(!localStorage.getItem('token')){
            props.history.push('/')
        }
        else{
            this.user =JSON.parse(localStorage.getItem('user'));
            this.token =JSON.parse(localStorage.getItem('token'));
        }

    }
    componentDidMount(){
        if(typeof this.user.name==="undefined"){
            this.props.history.push('/')
        }
        axios.get(URLS.LIST+"/?timeMin="+ (new Date()).toISOString() ,{headers:{Authorization:this.token}}).then(response=>{
            this.setState({
                upcomingEvents:response.data.items
            })
        })

    }
    deleteTodo(id){
        axios.delete(URLS.DELETE+"/"+id,{headers:{Authorization:this.token}}).then(res=>{
            this.setState({
                upcomingEvents:this.state.upcomingEvents.filter(data=>{
                    if(data.id!==id){
                        return data
                    }

                })
            })
        })
    }
    logout(){
        this.props.history.push('/')

        localStorage.clear()
    }
    openForm(){
        this.setState({
            isFormOpen:true
        })
    }
    closeForm(){
        this.setState({
            isFormOpen:false
        })
    }
    addTodos(){
        let obj ={
            end:{
                dateTime:new Date(this.state.end_date)
            },
            start:{
                dateTime:new Date(this.state.start_date)
            },
            summary:this.state.todos
        }
        axios.post(URLS.ADD,obj,{headers:{Authorization:this.token}}).then(res=>{
            this.setState({
                upcomingEvents:[...this.state.upcomingEvents,res.data],
                isFormOpen:false
            })
        })
    }
    formHandler(e){

        this.setState({
                [e.target.name]:e.target.value
            },()=>{
                console.log(this.state)
        })

    }

    render() {
        let {upcomingEvents} =this.state;
        return (
            <div className="container">
                <section className="container user_container">
                    <div className="row text-center user_text" style={{marginTop:"7%"}}>
                       <h3> {this.user.name}</h3>
                    </div>
                    <div className="row text-center user_text">
                        <h4>{this.user.email}</h4>
                    </div>
                    <div className="row text-right lout">
                      <button className="btn btn-danger " onClick={this.logout}>Logout</button>
                    </div>
                </section>
                {(!this.state.isFormOpen) ?
                    <div className=" todos">
                    <h3 className="text-center">TODO LIST</h3>

                    {
                        upcomingEvents.map((data, index)=>(
                            <div key={index} className="row todo-element">
                                <div className="col-md-4">
                                    {data.summary}
                                </div>
                                <div className="col-md-3">
                                    start date = {data.start.dateTime}
                                </div>
                                <div className="col-md-3">
                                    end date = {data.end.dateTime}
                                </div>
                                <div className="col-md-offset-1 col-md-1">
                                    <button className="btn btn-info" onClick={()=>this.deleteTodo(data.id)}>delete</button>
                                </div>
                            </div>
                        ))
                    }
                    <div className="row btn_padding text-center">
                    <button className="btn btn-primary" onClick={this.openForm}>ADD TODO</button>
                        </div>
                </div> :
                    <div>
                    <form>
                        <div className="form-group">
                            <label >Todo Description</label>
                            <input type="text" onChange={this.formHandler} name="todos" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label >start date</label>
                            <input type="date" onChange={this.formHandler} name="start_date" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label >end date</label>
                            <input type="date" onChange={this.formHandler}  name="end_date" className="form-control"/>
                        </div>
                        <button type="button" className="btn btn-default" onClick={this.addTodos}>Add</button>
                    </form>
                </div>
                }
            </div>
        );
    }
}

export default TodoList;
