"use client"

import { Election, ElectionProps } from "@/electionComponents/election";
import { EligibleElections, EligibleElectionsProps } from "@/electionComponents/eligibleElections";
import { useEffect, useState } from "react";

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
 * @returns A render of the election based on the JSON file electionFoo.json, but will work for any ClearVote
 * JSON file!
 */
const MyComponent = () => {
  //Why does Typescript have such a weird set-up for fetching JSON files?!
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/data/electionFoo.json')
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error fetching JSON:', error));
  }, []);
  //Loading icon
  if (!data) {
    return <div>Loading...</div>;
  }
  //Converts the JSON so it'll actually work as election props!
  const eligibleElections: EligibleElectionsProps = { elections: data };
  //Simply renders the EligibleElection component!
  return (
    <div>
      <EligibleElections {...eligibleElections} />
    </div>
  );
};