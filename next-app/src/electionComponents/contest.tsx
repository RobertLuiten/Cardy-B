"use client"

import React from "react";
import { Candidate } from "./candidate";

/**
 * A simple implementation of the Contest class: probably the most confusing class by a long shot,
 * but hopefully clear enough to tell what's going on!
 */


export interface ContestProps {
    //Set to any contest props!
    contest_name : string;
    candidates : Candidate[];
    addCandidate?(candidate : Candidate|null, election_name : String, remove_vote: () => void) : void;
}

export interface ContestState {
    pinned : Candidate|null;
    candidate_map : Map<Candidate, Boolean>;
    restored : Boolean;
}

export interface Contest {
    //Set for anything in contest
    contest_name : string;
    candidates : Candidate[];
    render() : any;
    renderPinned() : any;
    addCandidate?(candidate : Candidate|null, election_name : String, remove_vote: () => void) : void;
}


export class Contest extends React.Component <ContestProps, ContestState> {

    /**
     * Creates a contest based on the ContestProps
     * @param props ContestProps for the contest
     */
    constructor(props : ContestProps){
        super(props);
        this.contest_name = props.contest_name;
        this.candidates = props.candidates;
        const candidate_map = new Map<Candidate, Boolean>();
        this.candidates.map((candidate) => candidate_map.set(candidate, false));
        this.state = {pinned : null, candidate_map : candidate_map, restored : false};
        if (props.addCandidate != undefined){
            this.addCandidate = props.addCandidate;
        }
    }

    /**
     * Pins a candidate, along with connecting a candidate if under an election
     * @param candidate The candidate to pin, or null if removing one
     */
    pinCandidate(candidate : Candidate|null){
        this.setState({restored : false}); 
        if (this.state.pinned != null){
            this.restoreCandidate(this.state.pinned);
        }
        this.setState({pinned : candidate});
        if (this.addCandidate != null && candidate != null){
            this.restoreCandidate = this.restoreCandidate.bind(this);
            this.addCandidate(candidate, this.contest_name, () => this.restoreCandidate(candidate));
        }
    }

    /**
     * Renders the contest
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
     * @returns A render of both lists next to each other, autopins candidates if there's more than 1 candidate in the race and all others are rejected,
     * or nothing if a candidate's been selected
     */
    renderLists(){
        if (this.state.pinned != null){
            return (
                <div></div>
            );
        } 
        const array = Array.from(this.state.candidate_map);
        const rejected = array.filter(item => item[1] === true);
        const remaining = array.filter(item => item[1] === false);
        if (remaining.length == 1 && this.candidates.length > 1 && !this.state.restored){
            this.pinCandidate(remaining[0][0]);
        }
        if (this.state.restored){
            return (
                <div className="flex flex-row">
                {remaining.map((candidate_element, index) => 
                    <div key={index} className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        {candidate_element[0].render()}
                        <div>
                        <div>
                            <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]" 
                            onClick={() => this.pinCandidate(candidate_element[0])}>Vote</button>
                        </div>
                        </div>
                    </div>
                )}
                {rejected.map((candidate_element, index) => 
                    <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                    border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        {candidate_element[0].render()}
                        <button className="rounded-lg w-full h-full bg-[#008000] hover:bg-[#D3D3D3]" 
                        onClick={() => this.restoreCandidate(candidate_element[0])}>Restore!</button>  
                    </div>
                )}
                </div>
            );

        }
        return (
            <div className="flex flex-row">
            {remaining.map((candidate_element, index) => 
                <div key={index} className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    {candidate_element[0].render()}
                    <div>
                    <div>
                        <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]" 
                        onClick={() => this.pinCandidate(candidate_element[0])}>Vote</button>
                    </div>
                    <div>
                        <button className="rounded-lg w-full h-full bg-[#ffcbcb] hover:bg-[#D3D3D3]" 
                        onClick={() => this.removeCandidate(candidate_element[0])}>Reject</button>               
                    </div>
                    </div>
                </div>
            )}
            {rejected.map((candidate_element, index) => 
                <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    {candidate_element[0].render()}
                    <button className="rounded-lg w-full h-full bg-[#008000] hover:bg-[#D3D3D3]" 
                    onClick={() => this.restoreCandidate(candidate_element[0])}>Restore!</button>  
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
        this.setState({restored : false}); 
        const new_list = this.state.candidate_map;
        new_list.set(candidate, true);
        this.setState({candidate_map : new_list});
    }

    /**
     * Restores a candidate from the remaining list
     * @param candidate The candidate to restore
     */
    restoreCandidate(candidate : Candidate) : void {
        const new_list = this.state.candidate_map;
        new_list.set(candidate, false);
        this.setState({pinned : null, candidate_map : new_list});
        const array = Array.from(this.state.candidate_map);
        const rejected = array.filter(item => item[1] === true);
        if (rejected.length === this.candidates.length - 1){
            this.setState({restored : true}); 
        } else {
            this.setState({restored : false});
        }
        console.log(this.state.restored);
    }

}