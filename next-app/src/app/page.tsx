"use client"

import { Candidate } from "@/electionComponents/candidate";
import { Contest, ContestProps } from "@/electionComponents/contest";
import { Election, ElectionProps } from "@/electionComponents/election";
import { EligibleElections, EligibleElectionsProps } from "@/electionComponents/eligibleElections";
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";

/**
 * This is a simple proof of concept I set up, feel free to mess with it as needed!
 * @returns A render of the simple demo I set up!
 */
export default function Home() {

  //Hard coded candidates for the demo
  const can1 = new Candidate({candidate_name : "Blinky"});
  const can2 = new Candidate({candidate_name : "Evil Robot Bear"});
  const can3 = new Candidate({candidate_name : "Owen Varang"});
  const can4 = new Candidate({candidate_name : "Snorky"});
  const can5 = new Candidate({candidate_name : "Blinky"});
  const can6 = new Candidate({candidate_name : "Good Robot Bear"});
  const can7 = new Candidate({candidate_name : "Aaron Harris"});
  const can8 = new Candidate({candidate_name : "Robert Luiten"});
  const can9 = new Candidate({candidate_name : "Jack"});
  const can10 = new Candidate({candidate_name : "Saul Coolman"});
  const can11 = new Candidate({candidate_name : "Zeus"});
  const can12 = new Candidate({candidate_name : "Joey"});

  //As you can see, candidates are placed into array for Contests (hard-coded for demo)
  const candidates1 = [can1, can2, can3, can4];
  const candidates2 = [can5, can6, can7, can8];
  const candidates3 = [can9, can10, can11, can12];
  const contestinfo1 : ContestProps = {contest_name : "Robland Mayor", candidates : candidates1};
  const contestinfo2 : ContestProps = {contest_name : "Robland Sewer Cleaner", candidates : candidates2};
  const contestinfo3 : ContestProps = {contest_name : "Brownieland Police Guy", candidates : candidates3};

  //Election props are basically collections of Contests
  const electioninfo1 : ElectionProps = {election_type : "General Election", contests : [contestinfo1, contestinfo2, contestinfo3]};
  const electioninfo2 : ElectionProps = {election_type : "Primary Election", contests : [contestinfo1, contestinfo2]};

  //And once again, EligibleElectionProps are basically collections of elections
  const eligibleElectionProps : EligibleElectionsProps = {electionList : [electioninfo1, electioninfo2]};

  //Hopefully this gives you a bit of an idea of how the hierarchy works!

  return (
    <div>
      <p className="font-bold"></p>
      <EligibleElections {...eligibleElectionProps} />
    </div>
  );
}