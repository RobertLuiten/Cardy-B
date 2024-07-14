"use client"

import React, { useState } from "react";
import { Election, ElectionProps } from "./election";

/**
 * This is the eligibleElections, which is basically the list of all upcoming elections the user
 * can vote in. Note that differenent elections are collections of races that happen at different
 * times (i.e. primary elections v.s. general elections).
 * 
 * TODOs:
 * 1. Make actually work :D
 */


export interface EligibleElectionsProps {
    electionList : ElectionProps[]|null;
}

export interface EligibleElections {
    electionList : ElectionProps[]|null;
}


/**
 * This is the component being rendered on the user's homepage, and will display
 * all elections for which they are eligible for.
 */
export class EligibleElections extends React.Component <EligibleElectionsProps> {
    
    /**
     * Creates the list of elections!
     * @param props EligibleElectionProps containing all elections which the candidate is eligible for!
     */
    constructor(props : EligibleElectionsProps){
        super(props);
        if (props.electionList === null){
            this.electionList = null;
        } else {
            this.electionList = props.electionList;
        }
    }

    /**
     * Renders the eligibleElection component!
     * @returns A page where the client can look at the elections they're eligible for, or a message 
     * if they aren't eligible for any
     */
    render() {
        if (this.electionList === null){
            return (
                <h1 className="You ain't eligible for any elections, yo."></h1>
            );
        } else {
            const [myElection, setElection] = useState(this.electionList[0]);
            return (
                <div>
                    <select name="Elections" id="electionList">
                        {this.electionList.map((election, index) => 
                            <option key={index} onChange={() => setElection(election)}>
                                {election.election_type}
                            </option>
                        )}
                    </select>
                <Election {...myElection}/>
                </div>
            );
        }
    }



}