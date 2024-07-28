"use client"

import React from "react";
import { Contest, ContestProps } from "./contest";
import { Candidate, CandidateProps } from "./candidate";

/**
 * The props to create a new eleciton!
 */
export interface ElectionProps {
    /**The ID for the election */
    election_id : number;
    /**The type of the election (i.e. primary, general) */
    election_type : string;
    /**The voting start date (YYYY/MM/DD) */
    voting_start : number;
    /**The registration date (YYYY/MM/DD) */
    register_by : number;
    /**The voting end date (YYYY/MM/DD) */
    voting_end: number;
    /**The contests which are happening within the election */
    contests: ContestProps[];
}

/**
 * The interface for an election
 */
export interface Election {
    /**The information about that particular election */
    election_info: ElectionProps;
    /**Renders the election component */
    render() : any;
}

/**
 * The stateful items in an election
 */
export interface ElectionState{
    /**The user's ballot for that particular election */
    ballot : Map<String, CandidateProps|null>;
    /**A map to remove a candidate from the contest they were voted from*/
    remove_vote : Map<CandidateProps, () => void>;
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
        this.election_info = props;
        props.contests.map((contest) => contest.addCandidate = this.addCandidate);
        const newBallot = new Map<String, CandidateProps|null>();
        const remove_vote = new Map<CandidateProps, () => void>();
        props.contests.map((contest) => newBallot.set(contest.title_string, null));
        this.state = {ballot : newBallot, remove_vote : remove_vote};
    }

    /**
     * Adds a candidate to the ballot for the given election!
     * @param candidate The candidate to add to the ballot
     * @param election_name The name of the election
     * @param remove_vote The function which will remove the candidate from the ballot
     */
    addCandidate (candidate : CandidateProps|null, election_name : String, remove_vote : () => void){
        if (candidate != null){
            this.setState({remove_vote : this.state.remove_vote.set(candidate, remove_vote)});
        }
        this.setState({ballot : this.state.ballot.set(election_name, candidate)});
    }

    /**
     * Renders the election component
     * @returns The user ballot & all contest for the election
     */
    render() {
        return (
            <div>
                <h1 className="text-3xl font-bold capitalize">{this.election_info.election_type}</h1>
                <h1 className="text-xl font-bold">Voting Starts: {Math.floor((this.election_info.voting_start%10000)/100)}/
                    {Math.floor(this.election_info.voting_start%100)}/
                    {Math.floor(this.election_info.voting_start/10000)}
                </h1>
                <h1 className="text-xl font-bold">Voting Ends: {Math.floor((this.election_info.voting_end%10000)/100)}/
                    {Math.floor(this.election_info.voting_end%100)}/
                    {Math.floor(this.election_info.voting_end/10000)}
                </h1>
                <h1 className="text-xl font-bold">Register By: {Math.floor((this.election_info.register_by%10000)/100)}/
                    {Math.floor(this.election_info.register_by%100)}/
                    {Math.floor(this.election_info.register_by/10000)}
                </h1>
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
                {this.election_info.contests.map((contest, index) => 
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
     * Renders the email box component (NOT FUNCTION & UGLY CURRENTLY)
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
     * Calculates the total amount of votes cast so far in an election
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
    renderBallotCard (election_name : String, candidate : CandidateProps|null){
        if (candidate === null){
            return (
                <div>
                    <p className="capitalize">{election_name}</p>
                    <p>No candidate selected!</p>
                </div>
            );
        }
        const remove = this.state.remove_vote.get(candidate);
        if (remove != undefined){
            return (
                <div>
                    <p className="capitalize">{election_name}</p>
                    <Candidate {...candidate}/>
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
    removeCandidate(election_name : String, candidate : CandidateProps){
        const new_remove = this.state.remove_vote;
        new_remove.delete(candidate);
        this.setState({ballot : this.state.ballot.set(election_name, null), remove_vote : new_remove});
        this.state.remove_vote.get(candidate);
    }


}