"use client"

import { Candidate } from "@/electionComponents/candidate";
import { ContestProps } from "@/electionComponents/contest";
import { ElectionProps } from "@/electionComponents/election";
import { EligibleElections, EligibleElectionsProps } from "@/electionComponents/eligibleElections";

/**
 * This is a simple proof of concept I set up, feel free to mess with it as needed!
 * @returns A render of the simple demo I set up!
 */
export default function Home() {

  //Hard coded candidates for the demo
  const can1 = new Candidate({candidate_name : "Rob"});
  const can2 = new Candidate({candidate_name : "David"});
  const can3 = new Candidate({candidate_name : "Owen Varang"});
  const can4 = new Candidate({candidate_name : "Anaya"});
  const can5 = new Candidate({candidate_name : "Blinky"});
  const can6 = new Candidate({candidate_name : "The Robot Bear"});
  const can7 = new Candidate({candidate_name : "Jeff Bezos"});
  const can8 = new Candidate({candidate_name : "Ana Mari Cauce"});
  const can9 = new Candidate({candidate_name : "Penix"});
  const can10 = new Candidate({candidate_name : "VeeBee"});
  const can11 = new Candidate({candidate_name : "Zeus"});
  const can12 = new Candidate({candidate_name : "Joey"});

  //As you can see, candidates are placed into array for Contests (hard-coded for demo)
  const candidates1 = [can1, can2, can3, can4];
  const candidates2 = [can5, can6, can7, can8];
  const candidates3 = [can9, can10, can11, can12];
  const contestinfo1 : ContestProps = {contest_name : "Seattle Mayor", candidates : candidates1};
  const contestinfo2 : ContestProps = {contest_name : "Robville Mayor", candidates : candidates2};
  const contestinfo3 : ContestProps = {contest_name : "The Sherrif", candidates : candidates3};

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