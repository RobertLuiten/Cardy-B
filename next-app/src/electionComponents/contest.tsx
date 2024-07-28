"use client"

import React from "react";
import { Candidate, CandidateProps } from "./candidate";

/**
 * A simple implementation of the Contest class: probably the most confusing class by a long shot,
 * but hopefully clear enough to tell what's going on!
 */

/**
 * The props for a new contest
 */
export interface ContestProps {
    /**The boundary type for the election */
    boundary_type : string;
    /**The title of the election */
    title_string : string;
    /**The name of the election's area name */
    area_name : string;
    /**District char */
    district_char : string|null;
    /**Position char */
    position_char : string|null;
    /**The candidates running in the election */
    candidates : CandidateProps[];
    /**The function used to add candidates to a ballot (if part of an election) */
    addCandidate?(candidate : CandidateProps|null, election_name : String, remove_vote: () => void) : void;
}

/**
 * The internal state of the Contest
 */
export interface ContestState {
    /**The "pinned" candidate for the election (the one the user voted for, or null if otherwise) */
    pinned : CandidateProps|null;
    /**A map which determines whether a candidate has been removed from the contest or not */
    candidate_map : Map<CandidateProps, Boolean>;
    /**Determines whether the election has just been restored from the ballot */
    restored : Boolean;
}

/**
 * The interface for a Contest
 */
export interface Contest {
    /**Information about the contest */
    contest_info : ContestProps;
    /**Renders the contest */
    render() : any;
}


export class Contest extends React.Component <ContestProps, ContestState> {

    /**
     * Creates a contest based on the ContestProps
     * @param props ContestProps for the contest
     */
    constructor(props : ContestProps){
        super(props);
        this.contest_info = props;
        const candidate_map = new Map<CandidateProps, Boolean>();
        this.contest_info.candidates.map((candidate) => candidate_map.set(candidate, false));
        this.state = {pinned : null, candidate_map : candidate_map, restored : false};
    }

    /**
     * Pins a candidate, along with connecting a candidate if under an election
     * @param candidate The candidate to pin, or null if removing one
     */
    pinCandidate(candidate : CandidateProps|null){
        this.setState({restored : false}); 
        if (this.state.pinned != null){
            this.restoreCandidate(this.state.pinned);
        }
        this.setState({pinned : candidate});
        if (this.contest_info.addCandidate != null && candidate != null){
            this.restoreCandidate = this.restoreCandidate.bind(this);
            this.contest_info.addCandidate(candidate, this.contest_info.title_string, () => this.restoreCandidate(candidate));
        }
    }

    /**
     * Renders the contest
     * @returns A rendered list of the pinned candidate and others for the elections, or an empty section if there are no candidates avalible
     */
        render() {
            if (this.contest_info.candidates.length == 0){
                return(<div>
                    <h3 className="font-bold text-xl capitalize">{this.contest_info.title_string}</h3>
                    <p>Sorry, it seems there are no candidates for this election yet!</p>
                </div>)
            }
            return (
                <div>
                    <h3 className="font-bold text-xl capitalize">{this.contest_info.title_string}</h3>
                    <div >
                        {this.renderCandidates()}
                    </div>
                </div>
            );
        }

    /**
     * Renders the remaining & removed list of candidates
     * @returns A render of both lists next to each other, autopins candidates if there's more than 1 candidate in the race and all others are rejected,
     * or nothing if a candidate's been selected
     */
    renderCandidates(){
        if (this.state.pinned != null){
            return (
                <div></div>
            );
        } 
        const array = Array.from(this.state.candidate_map);
        const rejected = array.filter(item => item[1] === true);
        const remaining = array.filter(item => item[1] === false);
        if (remaining.length == 1 && this.contest_info.candidates.length > 1 && !this.state.restored){
            this.pinCandidate(remaining[0][0]);
        } else if (this.contest_info.candidates.length == 1){
            return (<div className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                <Candidate {...this.contest_info.candidates[0]}/>
                <div>
                    <div>
                        <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]" 
                        onClick={() => this.pinCandidate(this.contest_info.candidates[0])}>Vote</button>
                        </div>
                    </div>
                </div>
            );
            
        }
        if (this.state.restored){
            return (
                <div className="flex flex-row">
                {remaining.map((candidate_element, index) => 
                    <div key={index} className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        <Candidate {...candidate_element[0]}/>
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
                        <Candidate {...candidate_element[0]}/>
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
                    <Candidate {...candidate_element[0]}/>
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
                    <Candidate {...candidate_element[0]}/>
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
    removeCandidate(candidate : CandidateProps){
        this.setState({restored : false}); 
        const new_list = this.state.candidate_map;
        new_list.set(candidate, true);
        this.setState({candidate_map : new_list});
    }

    /**
     * Restores a candidate from the remaining list
     * @param candidate The candidate to restore
     */
    restoreCandidate(candidate : CandidateProps) : void {
        const new_list = this.state.candidate_map;
        new_list.set(candidate, false);
        this.setState({pinned : null, candidate_map : new_list});
        const array = Array.from(this.state.candidate_map);
        const rejected = array.filter(item => item[1] === true);
        if (rejected.length === this.contest_info.candidates.length - 1){
            this.setState({restored : true}); 
        } else {
            this.setState({restored : false});
        }
        console.log(this.state.restored);
    }

}