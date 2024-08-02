"use client";

import React from "react";
import { Election, ElectionProps } from "./election";

/**
 * The Props for all EligibleElections for the user
 */
export interface EligibleElectionsProps {
    /** The elections that the user is eligible for */
    elections: ElectionProps[];
}

/**
 * The internal state of the EligibleElections class
 */
export interface EligibleElectionsState {
    /** The currently selected election by the user (index of the election array, see below) */
    currentElection: number;
}

/**
 * The EligibleElections class allows the user to select a specific election!
 * TODOS:
 * 1. Remove the option to select a different election when the user's ballot is full (may need to pass function
 * with Election class)
 * 2. Allow candidates to carry over even when the user switches elections (may need to pass function to Election class)
 * 3. Make it so EligibleElections shows the (most current -> recent upcoming -> closest past election) first
 */
export class EligibleElections extends React.Component<EligibleElectionsProps, EligibleElectionsState> {

    /**
     * Creates a new EligibleElections!
     * @param props The Props for the user's EligibleElections
     */
    constructor(props: EligibleElectionsProps) {
        super(props);
        if (props.elections.length == 0){
            this.state = { currentElection : -1};
        } else {
            const date_array : {voting_end : number, index : number}[] = new Array;
            this.props.elections.map((value, index) => date_array.push({voting_end : value.voting_end, index : index}));
            const date = new Date();
            const cur_date = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDay();
            let start_index = 0;
            let best_date = this.props.elections[0].voting_start;
            for (let i = 0; i < this.props.elections.length; i++){
                if (this.props.elections[i].voting_start <= cur_date && this.props.elections[i].voting_end >= cur_date){
                    start_index = i;
                    i = this.props.elections.length;
                } else if (this.props.elections[i].voting_start - cur_date > best_date - cur_date 
                    && this.props.elections[i].voting_start - cur_date > 0){
                    start_index = i;
                    best_date = this.props.elections[i].voting_start;
                } else if (this.props.elections[i].voting_start - cur_date > best_date - cur_date
                    && best_date - cur_date < 0){
                    start_index = i;
                    best_date = this.props.elections[i].voting_start;
                }
            }
            this.state = {currentElection : start_index}
        }
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * The renderer for the EligibleElections component!
     * @returns A render of the EligibleElections component, or a message if no elections exist
     * for the user
     */
    render() {
        if (this.state.currentElection == -1){
            <p>It seems that there are no current elections for you avalible at the moment!</p>
        }
        return (
            <div>
                <h3 className="text-xl">Select An Election:</h3>
                <select value={this.state.currentElection} onChange={this.handleChange} className="capitalize">
                    {this.props.elections.map((election, index) => (
                        <option key={index} value={index} className="capitalize">
                            {election.election_type}: {this.getDate(election.voting_start)} - {this.getDate(election.voting_end)}
                        </option>
                    ))}
                </select>
                <br></br>
                <br></br>
                <Election key={this.state.currentElection} {...this.props.elections[this.state.currentElection]} />
            </div>
        );
    }

    /**
    * Changes the selected election
    * @param event The change event from the select element
    */
    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newIndex = parseInt(event.target.value, 10);
        this.setState({ currentElection: newIndex });
    }

    /**
     * Helper function for converting unformated dates from elections into strings
     * @param dateNum A numbered date in the form of YYYYMMDD
     * @returns The date in string form "YYYY/MM/DD"
     */
    getDate(dateNum : number) : string {
        return (Math.floor((dateNum % 10000) / 100) + "/" + 
            Math.floor(dateNum % 100) + "/" + Math.floor(dateNum / 10000));
    }

}
