"use client"

import React from "react";
import { Contest, ContestProps } from "./contest";
import { Candidate } from "./candidate";

/**
 * This is the elections class, this is basically a collection of contests during a particular election
 * that the user is eligible for! Simpliest class for sure, doesn't even have a state! Probably doesn't
 * need to be a class, but hopefully can make everything simpler!
 */


export interface ElectionProps {
    //Set for any election props
    election_type : string;
    contests: ContestProps[];
}

export interface Election {
    //Set for any election
    election_type: string;
    contests: ContestProps[];
    render() : any;
}

export interface ElectionState{
    ballot : Map<String, Candidate|null>;
}


/**
 * A simple election class!
 */
export class Election  extends React.Component <ElectionProps, ElectionState> {

    /**
     * Creates a new election
     * @param props The props for that Election!
     */
    constructor (props: ElectionProps){
        super(props);
        this.addCandidate = this.addCandidate.bind(this);
        this.election_type = props.election_type;
        props.contests.map((contest) => contest.addCandidate = this.addCandidate);
        this.contests = props.contests;
        const newBallot = new Map<String, Candidate|null>();
        props.contests.map((contest, index) => newBallot.set(contest.contest_name, null));
        this.state = {ballot : newBallot};
    }

    /**
     * Adds a candidate to the ballot for the given election!
     * @param candidate The candidate to add to the ballot
     * @param election_name The name of the election
     */
    addCandidate (candidate : Candidate|null, election_name : String){
        this.setState({ballot : this.state.ballot.set(election_name, candidate)});
    }

    /**
     * Renders the election
     * @returns The user ballot & all contest for the election
     */
    render() {
        return (
            <div>
                <h1 className="text-3xl font-bold">{this.election_type}</h1>
                <br></br>
                <div>
                <h1 className="text-xl">Your Ballot!</h1>
                <div className="flex flex-row">
                    {Array.from(this.state.ballot).map(([name, selection], index) =>
                    <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                    border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        {name}
                        {selection?.render()}
                    </div>
                    )}
                </div>
            </div>
                {this.contests.map((contest, index) => 
                    <div key={index}>
                        <br></br>
                        <Contest {...contest}/>
                    </div>
                )}
            </div>
        );
    }


}