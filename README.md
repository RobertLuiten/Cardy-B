**Welcome to Cardy-B, a voting demo!**

To run, simply cd to next-app, run the command "npx next dev", visit localhost:3030, and enjoy the best looking web demo of all time. You can mess with the data by going to Cardy-B/next-app/src/app/page.tsx... I know it's bear bones (Candidates are basically only their names), but hopefully it gets the idea across!

**How does it work?**

I tried to make Cardy-B as general as possible, so that's why everything's really simple! Also, tailwind was freaking out in this project file for some reason, so I appologize for how ugly it works. I'm treating this more as a proof of concept than anything.

**The class heirarchy!**

The heirachy works as follows (you can find all these files in Cardy-B/next-app/src/electionComponents):

EligibleElections (in eligibleElections): EligibleElections takes in the props for all of the Elections that the user is eligible for and provides a pop-up menu where the user can choose the election which they want to see the data for (note that this part isn't done yet for the demo right now). It passes down the ElectionProps to the selected election

Elections (in elections): Elections stores the ballot of selected candidate choices for the user, while also rendering it's name, the user's ballot, and all of the Contests that are a part of that election. It passes down a ContestProp from the array "contests" for each contest. It also passes down the "addCandidate" function from Elections to each ContestProp so that the ballot can be updated.

Contest (in contest): An indivual contest simpy prints out the currently selected pinned candidate for that contest for the user (passing it back to it's Election parent as well), while also rendering the list of candidates that the user is still interested in and not interested in. The buttons & cards for the candidates are also rendered here as well: that way, calling render() on a candidate will only give general formating for more flexability. I dunno if this is the best way to do it, but I'd love feedback! Also, I know this is the messiest and most confusing part of the project, so it might need a bit more work here as well.

Candidate (in candidate): Probably the simpliest class in this entire project, candidate simply renders information about itself. Joey suggested connecting it to the Pokedex API for this demo, but I ran out of time. Either way, it should be relative easy to implement more information for Candidates, as we'd simply have to change the Candidate Interface to the one that ClearVote utilizes!

A beautiful flow-chart:
EligibleElections -> Election -> Contest -> Candidate

**How it's structured!**

Each class contains it's related interfaces for it's props, state, and themselves in their same file. Each file only has a depency on it's direct children (with the exception of elections.tsx having a depency on candidate.tsx as well), so depency issues shouldn't be a problem!

**How can we implement this into ClearVote Rob?!**

I tried to keep each interface and class as minimalistic, general, and basic as possible, so for the most part refactoring (I think I'm using that word right) shouldn't be too difficult as long as the interfaces are replaced and the render() functions as rewritten. Also, this way on the /ballot page on Clearvote, we'll only need to call a new instance of EligibleElections and we can build it from the ground up. I've been looking at the ClearVote code and I think it wouldn't take long to implement.

**Other things I want to add**

First I want to actually implement EligibleElection, and also I want to implement undo/redo buttons, which shouldn't be that hard!


Note: For people reading this without context for some reason, I created this simple voting demo for an open source project called Clearvote. This demo is very bear bones, so please excuse my awesome graphic design!
