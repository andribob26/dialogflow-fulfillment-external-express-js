const dialogflow = require('dialogflow')
const config = require('../config/config').dialogFlow
const { WebhookClient } = require('dialogflow-fulfillment');

const projectId = config.project_id
const credentials = {
    client_email: config.client_email,
    private_key: config.private_key
}


const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

const resultQuery = async (userText, userId) => {
    const sessionPath = sessionClient.sessionPath(projectId, "testing" + userId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: 'id-ID',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        return responses
    } catch (error) {
        console.log(error);
        return error
    }
}

const textQuery = async (req, res) => {
    const { userText, userId } = req.body
    const query = await resultQuery(userText, userId);
    const queryResult = query[0]
    console.log(queryResult.queryResult.fulfillmentText);
}

const webhook = (req, res) => {
    const _agent = new WebhookClient({request: req, response: res});
    function welcome(agent) {
        agent.add(`Welcome to my agent express!`);
    }
    let intent = new Map();
    intent.set("Default Welcome Intent", welcome)
    _agent.handleRequest(intent);
    
}

module.exports = { textQuery, webhook }