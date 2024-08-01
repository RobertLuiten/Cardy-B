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
    boundary_type: string;
    /**The title of the election */
    title_string: string;
    /**The name of the election's area name */
    area_name: string;
    /**District char */
    district_char: string | null;
    /**Position char */
    position_char: string | null;
    /**The candidates running in the election */
    candidates: CandidateProps[];
    /**The function used to add candidates to a ballot (if part of an election) */
    addCandidate?(candidate: CandidateProps | null, election_name: String, remove_vote: () => void): void;
}

/**
 * The internal state of the Contest
 */
export interface ContestState {
    /**The "pinned" candidate for the election (the one the user voted for, or null if otherwise) */
    pinned: CandidateProps | null;
    /**The set of candidates rejected by the user */
    rejected: Set<CandidateProps>;
    /**Must be true if a candidate's vote was just removed and they're the only candidate not rejected, false otherwise */
    restored: Boolean;
}

/**
 * The interface for a Contest
 */
export interface Contest {
    /**Renders the contest */
    render(): any;
}

/**
 * A contest composed of Candidates
 */
export class Contest extends React.Component<ContestProps, ContestState> {

    /**
     * Creates a contest based on the ContestProps
     * @param props ContestProps for the contest
     */
    constructor(props: ContestProps) {
        super(props);
        const candidate_map = new Map<CandidateProps, Boolean>();
        this.props.candidates.map((candidate) => candidate_map.set(candidate, false));
        this.state = { pinned: null, restored: false, rejected: new Set<CandidateProps>() };
    }

    /**
     * Renders the contest
     * @returns A rendered list of the pinned candidate and others for the elections, or an empty section if there are no candidates avalible
     */
    render() {
        if (this.props.candidates.length == 0) {
            return (<div>
                <h3 className="font-bold text-xl capitalize">{this.props.title_string}</h3>
                <p>Sorry, it seems there are no candidates for this election yet!</p>
            </div>)
        }
        return (
            <div>
                <h3 className="font-bold text-xl capitalize">{this.props.title_string}</h3>
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
    renderCandidates() {
        //Empty message if there's no candidates in the contest
        if (this.state.pinned != null) {
            return (
                <div></div>
            );
        }
        //Pins the single remaining candidate as long as there's more than one in the race
        if (this.props.candidates.length - this.state.rejected.size == 1 && this.props.candidates.length > 1
            && !this.state.restored) {
            //What this confusing line basically does it grab the only remaining candidate; inefficent but nothing bad
            this.pinCandidate(Array.from(this.props.candidates).filter(candidate => !this.state.rejected.has(candidate))[0]);
        } else if (this.props.candidates.length == 1) {
            //Edge case if there's only a single Candidate in an election: only gives the user the 'vote' button!
            return (
                <div className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 
                    rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    <Candidate {...this.props.candidates[0]} />
                    <div>
                        <div>
                            <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]"
                                onClick={() => this.pinCandidate(this.props.candidates[0])}>Vote</button>
                        </div>
                    </div>
                </div>
            );
        }
        //If none of these cases are right, it simply renders the remaining then rejected candidates like normal!
        return (
            <div className="flex flex-row">
                {this.props.candidates.map((candidate, index) =>
                    <div key={index}>
                        {this.renderRemaining(candidate)}
                    </div>
                )}
                {this.props.candidates.map((candidate, index) =>
                    <div key={index}>
                        {this.renderRejected(candidate)}
                    </div>
                )}
            </div>
        );
    }

    /**
     * Renders Candidate Cards for remaining candidates
     * @param candidate The Candidate to render
     * @returns A rendered candidate card if the candidate isn't rejected, nothing if otherwise
     */
    renderRemaining(candidate: CandidateProps) {
        //Checks to make sure the candidate hasn't been rejected before rendering
        if (!this.state.rejected.has(candidate)) {
            //If the candidate has just been restored by eliminating other candidates, the "Vote" button will be the only option
            if (this.state.restored) {
                return (
                    <div className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                        <Candidate {...candidate} />
                        <div>
                            <div>
                                <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]"
                                    onClick={() => this.pinCandidate(candidate)}>Vote</button>
                            </div>
                        </div>
                    </div>
                );

            }
            //If not, the user will have both the "Vote" & "Reject" button
            return (
                <div className="flex-none content-center bg-card hover:bg-neutral-100 elevation-1 border border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    <Candidate {...candidate} />
                    <div>
                        <div>
                            <button className="rounded-lg w-full h-full bg-[#947fee] hover:bg-[#D3D3D3]"
                                onClick={() => this.pinCandidate(candidate)}>Vote</button>
                        </div>
                        <div>
                            <button className="rounded-lg w-full h-full bg-[#ffcbcb] hover:bg-[#D3D3D3]"
                                onClick={() => this.removeCandidate(candidate)}>Reject</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    /**
     * Renders candidate cards for rejected candidates
     * @param candidate The Candidate to render
     * @returns A rendered candidate card if the Candidate is rejected, nothing if otherwise
     */
    renderRejected(candidate: CandidateProps) {
        //Sees whether the candidate has been rejected or not
        if (this.state.rejected.has(candidate)) {
            return (
                <div className="flex-none bg-card hover:bg-neutral-100 elevation-1 border 
                border-1 rounded-lg p-6 flex flex-col gap-0 items-start h-full w-[calc(200px+1.5rem)]">
                    <Candidate {...candidate} />
                    <button className="rounded-lg w-full h-full bg-[#008000] hover:bg-[#D3D3D3]"
                        onClick={() => this.restoreCandidate(candidate)}>Restore!</button>
                </div>
            );
        }
    }

    /**
     * Pins a candidate, along with connecting a candidate if under an election
     * @param candidate The candidate to pin, or null if removing one
     */
    pinCandidate(candidate: CandidateProps | null) {
        this.setState({ restored: false });
        if (this.state.pinned != null) {
            this.restoreCandidate(this.state.pinned);
        }
        this.setState({ pinned: candidate });
        if (this.props.addCandidate != null && candidate != null) {
            this.restoreCandidate = this.restoreCandidate.bind(this);
            this.props.addCandidate(candidate, this.props.title_string, () => this.restoreCandidate(candidate));
        }
    }

    /**
     * Removes a candidate from the remaining list
     * @param candidate The candidate to remove
     */
    removeCandidate(candidate: CandidateProps) {
        this.setState({ restored: false });
        const new_set = this.state.rejected;
        new_set.add(candidate);
        this.setState({ rejected: new_set });
    }

    /**
     * Restores a candidate from the remaining list
     * @param candidate The candidate to restore
     */
    restoreCandidate(candidate: CandidateProps): void {
        const new_set = this.state.rejected;
        new_set.delete(candidate);
        this.setState({ pinned: null, rejected: new_set });
        if (this.state.rejected.size === this.props.candidates.length - 1) {
            this.setState({ restored: true });
        } else {
            this.setState({ restored: false });
        }
    }

}