"use client"

import React from "react";

/**
 * A simple implementation of a candidate! Candidates are now objects, which should
 * hopefully help with keeping everything relatively simple.
 */

/**
 * The props for a candidate in an election
 */
export interface CandidateProps {
    /**The name of the Candidate */
    name : string;
    /**A link to a headshot for the candidate, or null if none */
    image : string|null;
    /**The email for the candidate, or null if none */
    email : string|null;
    /**The website for the candidate, or null if none */
    website : string|null;
    /**The information for the about section for the Candidate*/
    about : AboutCandidate;
}

/**
 * The interface for the about section for a Candidate
 */
export interface AboutCandidate {
    /**The Politigram informtation for the candidate */
    politigram : PolitigramProps;
    /*The education information for the candidate w/ politigram metrics*/
    education : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**The occupation information for the candidate w/ politigram metrics*/
    occupation : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**Candidate statement information for the candidate w/ politigram metrics*/
    statement : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**Candidate financing information for the candidate w/ politigram metrics*/
    financing : {text : string|null, community?: [[number, number]], humanitarianism?: [[number, number]], prosperity?: [[number, number]], 
        liberty?: [[number, number]], utilitarianism? : [[number, number]]}|{};
    /**ClearVote's sources for the candidates */
    sources : {name : string, link : string}[];
}

/**
 * The interface for a Candidate
 */
export interface Candidate {
    /**Renders the candidate */
    render() : any;
}

/**
 * The interface for PolitigramProps, mainly composed of the political focus metrics
 */
export interface PolitigramProps {
    /**The Candidate's focus on community */
    community : number;
    /**The Candidate's focus on humanitarianism*/
    humanitarianism : number;
    /**The Candidate's focus on prosperity */
    prosperity : number;
    /**The Candidate's focus on liberty */
    liberty : number;
    /**The Candidate's focus on utilitarianism */
    utilitarianism : number;
}

/**
 * The class for the candidate
 */
export class Candidate extends React.Component <CandidateProps> {

    /**
     * Creates a new candidate
     * @param props The information on the candidate
     */
    constructor (props : CandidateProps){
        super(props);
    }

    /**
     * Renders the candidate
     * @returns A generic rendered "card" for the candidate
     */
    render() {
        if (this.props.image != null && this.props){
            return (
                <div>
                    <h1 className="text-sm sm:text-lg">{this.props.name}</h1>
                    <img src={this.props.image} alt={this.props.name}></img>
                    <p>{this.props.email}</p>
                    <p>{this.props.website}</p>
                    <p>Communitiy: {this.props.about.politigram.community}</p>
                    <div>
            </div>
                </div>
            );
        }
        return (
            <div>
                <h1 className="text-sm sm:text-lg">{this.props.name}</h1>
                <p>No Image Avalible!</p>
                <p>{this.props.email}</p>
                <p>{this.props.website}</p>
            </div>
        );
    }
}