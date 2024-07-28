"use client"

import React from "react";
import { Election, ElectionProps } from "./election"

/**
 * A simple implemenetation of the Eligible Elections class!
 * TODO: FIX!!
 */

/**
 * The Props for all EligibleElections for the user
 */
export interface EligibleElectionsProps {
    /**The elections that the user is eligible for */
    elections : ElectionProps[];
}

/**
 * The internal state of the EligibleElections class
 */
export interface EligibleElectionsState {
    /**The currently selected election by the user (index of the election_list array, see below) */
    currentElection : ElectionProps;
}

/**
 * The interface for an EligibleElections
 */
export interface EligibleElections {
    /**The elections which the user is eligible for */
    elections : ElectionProps[];
    /**Renders the EligibleElections component */
    render() : any;
}

/**
 * The EligibleElections class, relatively simple for now!
 */
export class EligibleElections extends React.Component <EligibleElectionsProps, EligibleElectionsState>{
    
    /**
     * Creates a new EligibleElections!
     * @param props The Props for the user's EligibleElections
     */
    constructor (props : EligibleElectionsProps){
        super(props);
        this.elections = props.elections;
        this.state = {currentElection : this.elections[0]};
    }

    /**
     * The renderer for the EligibleElections component!
     * @returns A render of the EligibleElections component
     */
    render () {
        return (
            <div>
                <h3 className="text-xl">Selection An Election:</h3>
                {this.elections.map((election, index) =>
                <div key={index}>
                    <button onClick={() => this.setState({currentElection : election})}>{election.election_type}</button>
                </div>
                )}
                <br></br>
                <Election {...this.state.currentElection}/>
            </div>
        );
    }

}