# Weekday Assignment
### Steps to run in local
1. clone the repo using `https://github.com/deekshithmd/weekday-assignment.git`;
2. navigate to weekday-assignment directory
3. run `npm install` to install dependencies
4. Then run `npm start` to run local server
5. Application will start running at `localhost:3000`

## Functionalities
Tried to replicate the exact functionalities of weekday website
1. Implemented filters to filter jobs based on
  1. Company name search : user can search for required company
  2. Minimum base salary : user can search the salary dropdown will filter based on search and show result
  3. Job locations : user can search so job locations get filtered and added click, mulitple locations can be selected, backspace/delete will delete the locations
  4. Minimum experience required : user can search for experience based jobs, on clicking 'x' it will get cleared
  5. Job roles :  user can search so job roles get filtered and added on click, mulitple roles can be selected, backspace/delete will delete the locations.
2. Implemented infinite scroll using intersection observer
3. Used redux toolkit for state management
4. Implemented mobile responsive UI

## Planned improvements
1. Implementing virtual scroll to improve performance
2. Improving the filter functionality
