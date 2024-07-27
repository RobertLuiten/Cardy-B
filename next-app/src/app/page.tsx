"use client"

import { Candidate, PolitigramProps } from "@/electionComponents/candidate";
import { ContestProps } from "@/electionComponents/contest";
import { Election, ElectionProps } from "@/electionComponents/election";
import { EligibleElections } from "@/electionComponents/eligibleElections";
import { useEffect, useState } from "react";
//import { EligibleElections, EligibleElectionsProps } from "@/electionComponents/eligibleElections";

/**
 * This is a simple demo using the provided electionFoo.JSON file provided to me
 * @returns A render of the simple demo I set up!
 */
export default function Home() {
  return (
    <div>
      {MyComponent()}
    </div>
  );
}

/**
 * Gets the election info file for the purpose of this demo!
 * @returns A render of the election based on the JSON file electionFoo
 */
const MyComponent = () => {
  const [data, setData] = useState(null);

  //JavaScript makes me want to go insane sometimes
  useEffect(() => {
    fetch('/data/electionFoo.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const electionInfo : ElectionProps = data[1];

  return (
    <div>
      <Election {...electionInfo} />
    </div>
  );
};