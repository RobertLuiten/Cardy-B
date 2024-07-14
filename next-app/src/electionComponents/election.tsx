"use client"

import React from "react";
import { Contest, ContestProps } from "./contest";

/**
 * This is the elections class, this is basically a collection of contests during a particular election
 * that the user is eligible for! Simpliest class for sure, doesn't even have a state! Probably doesn't
 * need to be a class, but hopefully can make everything simpler!
 */


export interface ElectionProps {
    election_type : string;
    contests: ContestProps[];
}

export interface Election {
    election_type: string;
    contests: ContestProps[];
    render() : any;
}


/**
 * A simple election class!
 */
export class Election  extends React.Component <ElectionProps> {

    constructor (props: ElectionProps){
        super(props);
        this.election_type = props.election_type;
        this.contests = props.contests;

    }

    render() {
        return (
            <div>
                <h1 className="text-3xl font-bold">{this.election_type}</h1>
                {this.contests.map((contest, index) => 
                    <div key={index}>
                        <br></br>
                        <Contest {...contest}/>
                    </div>
                )}
            </div>
        );
    }


}