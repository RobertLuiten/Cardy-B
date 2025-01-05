# Welcome to Cardy-B, a voting demo!

Back when I was a young boy, many mnay years ago (Feburary 2024), I had the oppritunity to join Clearvote, a . If you're curious, you can check it out at [clearvote.info](Clearvote.info). Part of my work on the front end of the website was working to determine how we were going to have the user interact with the website. This somewhat interesting looking demo was the first implemented version of what eventually became our pinning functions.

To run, simply ```cd``` to ```next-app```. From here, run the command ```npx next dev```. After that, you can visit ```localhost:3030``` and enjoy the best looking web demo of all time. You can mess with the data by going to ```Cardy-B/next-app/src/app/page.tsx```.

As I said when I intially made this: ```"I know it's bear bones (Candidates are basically only their names), but hopefully it gets the idea across!"```. Did we end up using my implementation exactly as it was in this demo? No. Once again, check out the website to see what these features became, but this was my first time outside of academics working on a real, solid software demo! As such, I'm leaving this repo up for prosperity's sake. Also a special thank you to Joey, David, or Anaya if any of you guys are checking out this repo again!

So, Robert Luiten or Clearvote fans, welcome! Enjoy the original, unedited documentation below! Thanks for visiting! Feel free to use the code as well if you're interested!

# Original documentation

**How does it work?**

Cardy-B works with ClearVote's parsed JSON files: an example of these files can be found at next-app/public/data/electionFoo.json. Taking the parameters from these files (which can be found in the various interfaces), it prints out the elections for all candidates!

**The class heirarchy!**

The heirachy works as follows (you can find all these files in ```Cardy-B/next-app/src/electionComponents```):

```EligibleElections``` (in ```eligibleElections```): ```EligibleElections``` stores all of the elections which is a user is eligible for and allows them to select a specific one to view. It passes ```ElectionProps``` to ```Election``` components

```Elections``` (in ```elections```): ```Elections``` stores the ballot of selected candidate choices for the user, while also rendering it's name, the user's ballot, and all of the ```Contests``` that are a part of that election. It passes down a ```ContestProp``` from the array ```contests``` for each contest. It also passes down the ```addCandidate``` function from ```Elections``` to each ```ContestProp``` so that the ballot can be updated.

```Contest``` (in ```contest```): The ```Contest``` function passes up the ```restoreCandidate``` function to it's election if it's applicable! ```Contest``` prints out the contest name, all of the candidates running, along with giving the user the option to vote for or 'reject' candidates. Once a user selects a candidate or narrows down their choices, the row will collapse until a candidate is deselected. It passes ```CandidateProps``` to ```Candidate``` components.

```Candidate``` (in ```candidate```): Probably the simpliest class in this entire project, ```candidate``` basically renders a candidate card based on it's candidate info for now.

A beautiful flow-chart:
```EligibleElections -> Election -> Contest -> Candidate```

**How it's structured!**

Each class contains it's related interfaces for it's props, state, and themselves in their same file. Each file only has a depency on it's direct children (with the exception of ```elections.tsx``` having a depency on ```candidate.tsx``` as well), so depency issues shouldn't be a problem! Classes are not depenedent on their parents which allows for more flexability.

**How can we implement this into ClearVote Rob?!**

Since each interface and the hierachy is structured the same way that ClearVote's data is structured, implementation will be relatively simple! The main thing to work on will be styling!

Note: For people reading this without context in the future, I hope you appriciate my awesome graphic design!
