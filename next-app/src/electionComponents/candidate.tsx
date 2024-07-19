"use client"

import React from "react";

/**
 * A simple implementation of a candidate! Candidates are now objects, which should
 * hopefully help with keeping everything relatively simple.
 */


export interface CandidateProps {
    //Place all candidate props here
    candidate_name : string;
}

export interface Candidate {
    //Place all candidate info here
    candidate_name : string;
    render() : any;
}


export class Candidate {

    /**
     * Creates a new candidate
     * @param props The information on the candidate
     */
    constructor (props : CandidateProps){
        this.candidate_name = props.candidate_name;
    }

    /**
     * Renders the candidate
     * @returns A generic rendered "card" for the candidate
     */
    render() {
        return (
            <div>
                <h1 className="text-sm sm:text-lg">{this.candidate_name}</h1>
            </div>
        );
    }
}