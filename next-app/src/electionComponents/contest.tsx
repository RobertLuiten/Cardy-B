"use client"

import React from "react";
import { Candidate } from "./candidate";

/**
 * A simple implementation of contest class
 */


export interface ContestProps {
    //Set to any contest props!
    contest_name : string;
    candidates : Candidate[];
    addCandidate?(candidate : Candidate|null, election_name : String) : void;
}

export interface ContestState {
    pinned : Candidate|null;
    remaining_candidates : Candidate[];
    removed_candidates : Candidate[];
}

export interface Contest {
    //Set for anything in contest
    contest_name : string;
    render() : any;
    renderPinned() : any;
    addCandidate?(candidate : Candidate|null, election_name : String) : void;
}


export class Contest extends React.Component <ContestProps, ContestState> {

    /**
     * Creates a contest based on the ContestProps
     * @param props ContestProps for the contest
     */
    constructor(props : ContestProps){
        super(props);
        this.contest_name = props.contest_name;
        this.state = {pinned : null, remaining_candidates : props.candidates, removed_candidates : []};
        if (props.addCandidate != undefined){
            this.addCandidate = props.addCandidate.bind(this);
        }
    }

    pinCandidate(candidate : Candidate|null){
        this.setState({pinned : candidate});
        if (candidate != null && this.addCandidate != null){
            this.addCandidate(candidate, this.contest_name);
        }
    }

    /**
     * Renders the pinned candidate
     * @returns A render of the pinned candidate
     */
    renderPinned() {
        if (this.state.pinned === null){
            return (
                <div className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    <p>No pinned candidate!</p>
                </div>
            );
        }
        return (
            <div className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
            border-1 rounded-lg p-6 flex flex-col gap-0 items-start w-[calc(200px+1.5rem)]">
                {this.state.pinned.render()}
                <button className="rounded-lg w-full h-full bg-[#FF0000] hover:bg-[#D3D3D3]" 
                onClick={() => this.pinCandidate(null)}>Unpin</button>
            </div>
        );
    }

    /**
     * The render for the contest
     * @returns A rendered list of the pinned candidate and others for the elections
     */
    render() {
        return (
            <div>
                <h3 className="font-bold text-xl">{this.contest_name}</h3>
                <div >
                    {this.renderLists()}
                </div>
            </div>
        );
    }

    /**
     * Renders the remaining & removed list of candidates
     * @returns A render of both lists next to each other
     */
    renderLists(){
        return (
            <div className="flex flex-row">
                <div>
                    {this.renderPinned()}
                </div>
            {this.state.remaining_candidates.map((candidate, index) => 
                <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    {candidate.render()}
                    <div>
                    <div>
                        <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]" 
                        onClick={() => this.pinCandidate(candidate)}>Pin!</button>
                    </div>
                    <div>
                        <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]" 
                        onClick={() => this.removeCandidate(candidate)}>Remove!</button>               
                    </div>
                    </div>
                </div>
            )}
            {this.state.removed_candidates.map((candidate, index) => 
                <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    {candidate.render()}
                    <button className="rounded-lg w-full h-full bg-[#008000] hover:bg-[#D3D3D3]" 
                    onClick={() => this.restoreCandidate(candidate)}>Restore!</button>  
                </div>
            )}
            </div>
        );
    }

    /**
     * Removes a candidate from the remaining list
     * @param candidate The candidate to remove
     */
    removeCandidate(candidate : Candidate){
        const new_removed = this.state.removed_candidates;
        new_removed.push(candidate);
        this.setState({remaining_candidates : this.state.remaining_candidates.filter(item => item != candidate),
            removed_candidates : new_removed});
    }

    /**
     * Restores a candidate from the remaining list
     * @param candidate The candidate to restore
     */
    restoreCandidate(candidate : Candidate){
        const new_remaining = this.state.remaining_candidates;
        new_remaining.push(candidate);
        this.setState({remaining_candidates : new_remaining, 
            removed_candidates : this.state.removed_candidates.filter(item => item != candidate)});
    }

}