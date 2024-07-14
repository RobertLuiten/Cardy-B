"use client"

import React from "react";
import { Candidate } from "./candidate";

export interface BallotProps {
    electionName : string;
}

export interface BallotState {
    selected : {election_name : string, person : Candidate|null };
}

export interface Ballot {

}

export class Election  extends React.Component <BallotProps, BallotState> {

    constructor(props : BallotProps){
        super(props);
        
    }
}