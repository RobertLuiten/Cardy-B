"use client"

import React, { useState } from "react";
import { Election, ElectionProps } from "./election";

/**
 * This is the eligibleElections, which is basically the list of all upcoming elections the user
 * can vote in. Note that differenent elections are collections of races that happen at different
 * times (i.e. primary elections v.s. general elections). Need to still implement this though
 */


export interface EligibleElectionsProps {
    //Set for any list of election props
    electionList : ElectionProps[];
}

export interface EligibleElectionsState {
    current_election : ElectionProps;
}

export interface EligibleElections {
    //Set for any list of elections
    electionList : ElectionProps[];
}


/**
 * This is the component being rendered on the user's homepage, and will display
 * all elections for which they are eligible for. (Will be for the election dropdown
 * menu basically)
 */
export class EligibleElections extends React.Component <EligibleElectionsProps, EligibleElectionsState> {
    
    /**
     * Creates the list of elections!
     * @param props EligibleElectionProps containing all elections which the candidate is eligible for!
     */
    constructor(props : EligibleElectionsProps){
        super(props);
        if (props.electionList.length === 0){
            this.electionList = props.electionList;
        } else {
            this.state = {current_election : props.electionList[0]};
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
                <h1 className="You ain't eligible for any elections, bro. :("></h1>
            );
        } else {
            //TODO: Implement dropdown
            return (
                <div>
                <Election {...this.state.current_election}/>
                </div>
            );
        }
    }


}