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
 */
export class EligibleElections extends React.Component<EligibleElectionsProps, EligibleElectionsState> {

    /**
     * Creates a new EligibleElections!
     * @param props The Props for the user's EligibleElections
     */
    constructor(props: EligibleElectionsProps) {
        super(props);
        /**The array which stores the date off all the elections */
        const date_array : {voting_end : number, index : number}[] = new Array;
        this.props.elections.map((value, index) => date_array.push({voting_end : value.voting_end, index : index}));
        const date = new Date();
        /**The current date */
        const cur_date = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDay();
        date_array.filter((election) => election.voting_end >= cur_date);
        if (date_array.length == 0){
            this.state = { currentElection: 0 };
        } else {
            /**Convoluted sorting! */
            this.state = { currentElection: date_array.toSorted()[0].index };
        }
        // Defaults to the first election in the props for now!
        
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * The renderer for the EligibleElections component!
     * @returns A render of the EligibleElections component
     */
    render() {
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
