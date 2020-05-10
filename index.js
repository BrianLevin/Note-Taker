const inquirer = require('inquirer'); // The npm package used to list the prompts for the questions
const fs = require('fs') // the npm package used to read files
const path = require('path') // the npm package used to link file paths
const generateMarkdown = require('./generateMarkdown') //the created file that the generateMarkdown will go through to execute the code.

const questions = [ // the variable that will hold the questions
    {
        type: 'input', // the user will input information
        name: 'github', // the name of the question
        message: 'what is your github username?' // the message prompt




    },
    {
        type: 'input',
        name: 'email',
        message: 'what is your email address?'



    },

    {
        type: 'input',
        name: 'title',
        message: 'What is  the name of your project?'


    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of the project?'



    },

    {
        type: 'input',
        name: 'install',
        message: 'How do you install the dependencies?'


    },
    {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about this repo?'

    },
    {
        type: 'input',
        name: 'tests',
        message: ' How do you install the tests?'


    },
    {
        type: 'input',
        name: 'contributing',
        message: ' What does the user need to know about  contributing to the repo?'




    },

    {
        type: 'list', // This will display the list of licenses
        name: 'license',
        message: 'What is the license type?',
        choices: ['MIT', 'BSD', 'Apache', 'None'], // the choices for the differant license types


    },





];

function init() { // function to list the questions
    inquirer.prompt(questions).then(function (answers) {
        fs.writeFileSync('./README.md', generateMarkdown(answers)); // the function then executes a call back function after getting the answers.
    });                                                             // then answers are then written down and generated in the README file 


}

init(); // This will execute the  init function