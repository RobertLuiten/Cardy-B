"use client"

import React from "react";
import { Candidate } from "./candidate";

/**
 * A simple implementation of contest class
 */


export interface ContestProps {
    contest_name : string;
    candidates : Candidate[];
}

export interface ContestState {
    pinned : Candidate|null;
}

export interface Contest {
    candidates : Candidate[];
    contest_name : string;
    render() : any;
    renderPinned() : any;
}


export class Contest extends React.Component <ContestProps, ContestState> {

    constructor(props : ContestProps){
        super(props);
        this.candidates = props.candidates;
        this.contest_name = props.contest_name;
        this.state = {pinned : null};
    }

    /**
     * Returns the pinned candidate
     * @returns A render of the pinned candidate
     */
    renderPinned() {
        if (this.state.pinned === null){
            return (
                <div>
                    <p>No pinned candidate!</p>
                </div>
            );
        }
        return (
            <div>
                {this.state.pinned.render()}
                <button onClick={() => (this.setState({pinned : null}))}>Unpin</button>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3 className="font-bold text-xl">{this.contest_name}</h3>
                <div >
                <div className="flex flex-row">
                    <div className="box-content h-32 w-32 p-4 border-4">
                        {this.renderPinned()}
                    </div>
                    {this.candidates.map((candidate, index) => 
                        <div key={index} className="box-content h-32 w-32 p-4 border-4">
                            {candidate.render()}
                            <button onClick={() => (this.setState({pinned : candidate}))}>Pin!</button>
                        </div>
                    )}
                </div>
                </div>

                
            </div>
        );
    }

}