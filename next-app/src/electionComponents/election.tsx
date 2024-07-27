"use client"

import React from "react";
import { Contest, ContestProps } from "./contest";
import { Candidate } from "./candidate";

/**
 * A simple implementation of an Election class
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
    //The ballot of candidates in the form of a map!
    ballot : Map<String, Candidate|null>;
    remove_vote : Map<Candidate, () => void>;
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
        const remove_vote = new Map<Candidate, () => void>();
        props.contests.map((contest) => newBallot.set(contest.contest_name, null));
        this.state = {ballot : newBallot, remove_vote : remove_vote};
    }

    /**
     * Adds a candidate to the ballot for the given election!
     * @param candidate The candidate to add to the ballot
     * @param election_name The name of the election
     * @param remove_vote The function which will remove the candidate from the ballot
     */
    addCandidate (candidate : Candidate|null, election_name : String, remove_vote : () => void){
        if (candidate != null){
            this.setState({remove_vote : this.state.remove_vote.set(candidate, remove_vote)});
        }
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
                <h1 className="text-xl">{this.votesLeftMessage()}</h1>
                <div className="flex flex-row">
                    {Array.from(this.state.ballot).map(([name, selection], index) =>
                    <div key={index} className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                    border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        {this.renderBallotCard(name, selection)}
                    </div>
                    )}
                </div>
            </div>
            {this.emailInput()}
                {this.contests.map((contest, index) => 
                    <div key={index}>
                        <br></br>
                        <Contest {...contest}/>
                    </div>
                )}
            </div>
        );
    }

    /**
     * A message based on the amount of votes the user has left
     * @returns A specialized message depending of the amount of votes the user has left
     */
    votesLeftMessage() : String {
        let votesCast = this.votesCast();
        const ballot = Array.from(this.state.ballot);
        if (votesCast === 0){
            return "No votes cast. Vote for or reject candidates to get started!"
        } else if (votesCast === ballot.length){
            return "Congratulations, all votes cast!"
        }
        return votesCast + " votes cast!";
    }

    /**
     * Renders the email box component (PLEASE NOTE THAT THIS WILL BE MADE PRETTIER AND FUNCTIONAL
     * IN THE FINAL PRODUCT!)
     * @returns An empty div if all votes have not been cast, an email entry compenent otherwise
     */
    emailInput(){
        const ballot = Array.from(this.state.ballot);
        if (this.votesCast() == ballot.length){
            return (
                <div>
                    <p className="text-xl">Remove votes for candidates if you wish to edit your ballot!</p>
                    <p>Enter your email below!</p>
                    <input type="text" className="box-border h-10 w-64 p-4 border-4"></input>
                    <button>Enter!</button>
                </div>
            );
        }
        return (
            <div></div>
        );
    }

    /**
     * @returns The amount of votes casted in the election
     */
    votesCast() : number {
        const ballot = Array.from(this.state.ballot);
        let votesCast = 0;
        for (let i = 0; i < ballot.length; i++){
            if (ballot[i][1] != undefined){
                votesCast++;
            }
        }
        return votesCast;
    }

    /**
     * Renders each individual card for the user's ballot
     * @param election_name The name of the election for the card
     * @param candidate The candidate voted for in that election, or null if otherwise
     * @returns A rendered version of the ballot card, along with an unpin button
     */
    renderBallotCard (election_name : String, candidate : Candidate|null){
        if (candidate === null){
            return (
                <div>
                    {election_name}
                    <p>No candidate selected!</p>
                </div>
            );
        }
        const remove = this.state.remove_vote.get(candidate);
        if (remove != undefined){
            return (
                <div>
                    {election_name}
                    {candidate?.render()}
                    <button className="rounded-lg w-full h-full bg-[#ff0000] hover:bg-[#D3D3D3]"
                    onClick={() => {remove(); this.removeCandidate(election_name, candidate);}}>Remove Vote</button>
                </div>
    
            );
        }
    }

    /**
     * Removes the candidate from the ballot
     * @param election_name The name of the election from which to remove the candidate from
     * @param candidate The candidate themselves
     */
    removeCandidate(election_name : String, candidate : Candidate){
        const new_remove = this.state.remove_vote;
        new_remove.delete(candidate);
        this.setState({ballot : this.state.ballot.set(election_name, null), remove_vote : new_remove});
        this.state.remove_vote.get(candidate);
    }


}