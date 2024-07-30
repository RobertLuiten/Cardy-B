**Welcome to Cardy-B, a voting demo!**

To run, simply cd to next-app, run the command "npx next dev", visit localhost:3030, and enjoy the best looking web demo of all time. You can mess with the data by going to Cardy-B/next-app/src/app/page.tsx... I know it's bear bones (Candidates are basically only their names), but hopefully it gets the idea across!

**How does it work?**

Cardy-B works with ClearVote's parsed JSON files: an example of these files can be found at next-app/public/data/electionFoo.json. Taking the parameters from these files (which can be found in the various interfaces), it prints out the elections for all candidates!

**The class heirarchy!**

The heirachy works as follows (you can find all these files in Cardy-B/next-app/src/electionComponents):

EligibleElections (in eligibleElections): EligibleElections stores all of the elections which is a user is eligible for and allows them to select a specific one to view. It passes ElectionProps to Election components

Elections (in elections): Elections stores the ballot of selected candidate choices for the user, while also rendering it's name, the user's ballot, and all of the Contests that are a part of that election. It passes down a ContestProp from the array "contests" for each contest. It also passes down the "addCandidate" function from Elections to each ContestProp so that the ballot can be updated.

Contest (in contest): The Contest function passes up the "restoreCandidate" function to it's election if it's applicable! Contest prints out the contest name, all of the candidates running, along with giving the user the option to vote for or 'reject' candidates. Once a user selects a candidate or narrows down their choices, the row will collapse until a candidate is deselected. It passes CandidateProps to Candidate components.

Candidate (in candidate): Probably the simpliest class in this entire project, candidate basically renders a candidate card based on it's candidate info for now.

A beautiful flow-chart:
EligibleElections -> Election -> Contest -> Candidate

**How it's structured!**

Each class contains it's related interfaces for it's props, state, and themselves in their same file. Each file only has a depency on it's direct children (with the exception of elections.tsx having a depency on candidate.tsx as well), so depency issues shouldn't be a problem! Classes are not depenedent on their parents which allows for more flexability.

**How can we implement this into ClearVote Rob?!**

Since each interface and the hierachy is structured the same way that ClearVote's data is structured, implementation will be relatively simple! The main thing to work on will be styling!

**TODOS**

Besides styling which isn't a major issue at the moment for the scope of this project, but also making it so that the EligibleElection components doesn't delete the user's selections when they switch between elections along with showing the most recent election.


Note: For people reading this without context in the future, I hope you appriciate my awesome graphic design!