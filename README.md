# expunge-colorado-screener

Welcome to the Code for Denver - Expunge Colorado - Screener Tool team!

## Prerequisites 📚
- Node
- Yarn

## Local development 👩‍💻
### Install dependencies
`yarn`

### Run app
`yarn start`

The environment variable `REACT_APP_DYNAMO_STORE` is `'false'` by default, which means survey results are not sent to Dynamo DB during local development. You can change it to `'true'` in the `.env` file if needed, but this should never be committed.

## Deploy

To [Github Pages site](https://codefordenver.github.io/expunge-colorado-screener/)

`yarn run deploy`

This uses the `.env.production` file where `REACT_APP_DYNAMO_STORE` is set to `'true'`, so survey results are sent to Dynamo DB from the deployed website.

## Project Background 📋

[Expunge Colorado](https://expungecolorado.org/) is a non-profit that provides support for record sealing and expungement. Prior to this new project with Code for Denver, Expunge Colorado was using a Google Form to intake potential candidates for their resourcing. The screener project was created as a way to help Expunge Colorado manage the volume of ineligible support requests that fell outside the scope of their work. Through a series of questions, the screener tool will help determine basic ineligibility criteria for an interested party and intake additional data for those that may be eligible for the services that Expunge Colorado can provide.

## Key Milestones 📅

* 11/2020: Project kicked off and team meets with client.
* 12/2020: First version of screener available on Github Pages.

## Resources 📝

If you have any issues accessing the following resources, please reach out to the team in the next Code for Denver meetup or via the Code for Denver Discord Server if you've already joined!

* [Team Breakdown Spreadsheet](https://docs.google.com/spreadsheets/d/1sRmbKy57FP0S1sxnlKFd1VcHheZmPQGAEolfxxS4bR8/edit#gid=0)
* The [Project Google Drive](https://drive.google.com/drive/folders/1YvS1t_eT5cvXDFMqwlO3DZDO0tSjBcNI) contains important project documents such as:
    * Expunge Colorado Question Logic: Flow chart of question logic
    * Expunge CO Screener - Questions and Logic: Detailed breakdown of questions and logic.

## Tech Stack 💻

The Expunge Colorado Screener Tool uses the following tools and processes:

* yarn

    * This project uses yarn as the package manager for this application.

* Serverless (the architecture):

    * This screener tool uses a serverless backend architecture due to the low cost of AWS services for the projected usage rates and the simplicity of the backend model (survey record storage).

* serverless (the service):

    * This screener tool uses serverless (see serverless.com) to deploy AWS configuration changes to an AWS account.
    * serverless allows AWS configurations to be deployed through a serverless.yml file.
    * You must install serverless and AWS CLI on your machine in order for the command `serverless deploy` to work.
    * Running the command `serverless deploy` from inside the folder containing the serverless.yml file will attempt to deploy any changes into AWS.
    * The handler.js file accompanying the serverless.yml file is the lambda handler function (referenced in the functions property of serverless.yml)

* API gateway:

    * AWS API gateway is being used as a web server to create HTTP endpoints for survey record storage (backend) and outcome page content retrieval (frontend).
    * The reached HTTP endpoints upon survey completion will then trigger the associated Lambda functions through a direct integration in the AWS console.

* AWS Lambda functions:

    * AWS Lambda functions are event-driven functions that perform operations without having to manage/provision servers.
    * This application uses AWS Lambda to process the HTTP requests from API gateway.
        * For the backend survey record storage, the expunge lambda function will check the appropriate httpMethod and update DynamoDB accordingly.
        * For the frontend content rendering, the contentful lambda function will then make an API call to the expunge contentful account and send the rich text content as JSON back to the front-end application.

* DynamoDB:

    * DynamoDB allows for a simple document-based nosql database.
    * DynamoDB is being used for survey results storage;
    * Any new or updated survey will create a new entry in the db

* Headless CMS

    * A Headless CMS provides the ability for the content of a website or page to be created and stored in a location that does not directly update a website's UI, but instead can be accessed via an API to then render in customizable ways.
    * This tool uses a Headless CMS for the survey outcome page in order to provide the Expunge Colorado team with the ability to customize this page easily.

* contentful

    * contentful was the Headless CMS service chosen for this project due to its low cost, ease of rich text formatting/updating for non-dev users and integration capabilities with react.
    * Front-end administrative users from Expunge Colorado will sign into the Contentful platform to update the outcome page.
    * This project has a Screener Outcomes space composed of content entries for each outcome.
        * A *space* in contentful is a collection of content for achieving a particular goal. 
        * An *entry* in contentful is a particular page of content whose structure is based on a content model. 
            * The Screener Outcome content model for this app was created to contain a Title, Body and ID.

* @contentful/rich-text-react-renderer

    * Once the front-end application receives the contentful response, the npm package @contentful/rich-text-react-renderer will be used to process the JSON message and display the rich text to the user.

* Additional notes:

    * In order to see the content in AWS, you will need to be in the region in which it is deployed. Please use `us-west-2`.
## Process 🔄

* Please reach out to the team in order to express interest in this work.
* Review both the tech stack used and the Github Issues section for the latest tasks needing support.
* Once you're a part of the Discord server and have found Github issues that you would like to support, please create a dedicated branch for your work and upon completion, create a pull request for another team member to review. 
* Upon review of the pull request by another team member, address any issues surfaced before merging the branch to main.
