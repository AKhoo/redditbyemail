# Project Title

The code that powers redditbyemail.com -- A daily digest of trending articles for topics that matter.

## Getting Started

This app is designed to run on an AWS Serverless stack. To run it locally, install the Serverless framework: https://serverless.com/framework/
* "npm run build-dev": bundles files using webpack for deployment
* "npm run build-prod":  bundles files using webpack for production
* "npm run server-dev": deploys a local web server for testing
* "npm run reddit": runs pollReddit.js which gets posts from Reddit and updates the database with latest posts
* "npm run email": runs email.js" which sends out emails to all subscribers in the database
* "sls deploy --stage dev": deploys code to a serverless dev environment
* "sls deploy --stage prod": deploys code to a serverless production environment

## Built With

* ReactJS: Front-end framework
* Material-UI: Front-end components
* Amazon Lambda: Serverless compute
* MongoDB / mLab: Serverless database
* Amazon SES: For emailing
* [Juice](https://github.com/Automattic/juice): Inlines CSS stylesheets; helps stylize emails
* Amazon S3: For hosting static files
* Amazon Route 53: For DNS service
* Amazon Cloudwatch: For triggering cron jobs and collecting metrics

## Authors

* **Adrian Khoo** - *Principal Engineer* - [Github](https://github.com/AKhoo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
