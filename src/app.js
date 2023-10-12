import React from "react";
import "./index.css"
import Img from "../src/assts/background_01.jpg"
import { AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit, AiOutlineFolderAdd } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"
import { GrUpdate } from "react-icons/gr"
export default class App extends React.Component {
    state = {
        data: {},
        myarry: [],
        myindex: {},
        update: true,
        update1: false
    }
    handlegetdata = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    handlesetdata = () => {
        this.setState({
            myarry: [...this.state.myarry, this.state.data],
            data: { inp: "",time:"" },
            // update1: true
        })

    }
    handledel = (i) => {
        let x = this.state.myarry
        x.splice(i, 1)
        this.setState({
            myarry: x
        })
    }
    handleedit = (i) => {
        this.setState({
            data: { inp: this.state.myarry[i].inp,time:this.state.myarry[i].time },
            myindex: i,
            update: false,
            update1:true
        })
    }
    handelupdate = () => {
        let z = this.state.myarry
        z[this.state.myindex].inp = this.state.data.inp

        this.setState({
            myarry: z,
            data: { inp: "" },
            update: true
        })
    }
    handleup = (i) => {
        if (i === 0) {
            alert(`already at top`)
        }
        else {
            let up = this.state.myarry
            let a

            a = up[i].inp
            up[i].inp = up[i - 1].inp
            up[i - 1].inp = a
            this.setState({
                myarry: up
            })
        }


    }
    handledown = (i) => {
        if (i === this.state.myarry.length - 1) {
            alert(`already at bottom`)
        }
        else {
            let down = this.state.myarry
            let a;
            a = down[i]
            down[i] = down[i + 1]
            down[i + 1] = a
            this.setState({
                myarry: down,
            })
        }
    }

    render() {
        console.log(this.state.myarry);
        return (
            <>
                <div className="bg_1 w-[100%] h-[100vh]" style={{ backgroundImage: `url(${Img})` }}>
                    <div className="py-10  min-w-[25rem] max-w-[70rem] mx-auto  text-center " >
                        <input className="w-[50%] p-2 font-semibold rounded-md bg-[#BDA401] outline-none " name="inp" value={this.state.data.inp} onChange={this.handlegetdata} />
                        <input type="time" className="w-[20%] p-2 font-semibold rounded-md bg-[#BDA401] outline-none ml-4" name="time" value={this.state.data.time}  onChange={this.handlegetdata}  />
                        {this.state.update ? <button className="  bg-[#B59C01] py-2 px-4 ml-4 rounded-md " onClick={this.handlesetdata}><AiOutlineFolderAdd /></button> : false}
                        {this.state.update1 ? <button className=" bg-[#B59C01] py-2 px-4 ml-4 rounded-md " onClick={this.handelupdate}><GrUpdate /></button> : false}

                    </div>
                    <table className="table-fixed w-[90%] sm:w-[70%] mx-auto ">
                        <thead>
                            <tr className=" bg-[#B59C01]  ">
                                <th className="py-2">Sr</th>
                                <th>Input value</th>
                                <th>time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.myarry.map((ele, index) => {
                                return (
                                    <tr className="text-center font-semibold py-4 border-2 border-black">
                                        <td className="py-2">{index + 1}</td>
                                        <td>{ele.inp}</td>
                                        <td>{ele.time}</td>
                                        <td className="flex py-2 justify-evenly text-xl">
                                            <AiOutlineArrowUp onClick={() => { this.handleup(index) }} /><AiOutlineArrowDown onClick={() => { this.handledown(index) }} /><AiFillEdit onClick={() => { this.handleedit(index) }} /><BsFillTrashFill onClick={() => { this.handledel(index) }} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

}