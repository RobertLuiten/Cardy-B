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
        // Defaults to the first election in the props for now!
        this.state = { currentElection: 0 };
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
                            {election.election_type}
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

}
