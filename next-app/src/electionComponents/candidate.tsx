"use client"

import React from "react";

/**
 * A simple implementation of a candidate!
 */


export interface CandidateProps {
    candidate_name : string;
}

export interface Candidate {
    candidate_name : string;
    render() : any;
}


export class Candidate {

    constructor (props : CandidateProps){
        this.candidate_name = props.candidate_name;
    }

    /**
     * A simple renderer
     * @returns A rendered card of the candidate
     */
    render() {
        return (
            <div>
                <h1 className="text-sm sm:text-lg">{this.candidate_name}</h1>
            </div>
        );
    }
}