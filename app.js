'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.9c376d24-a2aa-471a-9b65-cec03b6bb99b';

const languageStrings = {
    'en-US': {
        translation: {
            DINNERS: [
                'Little Mexico',
                'Barefoot Burger',
                'Creekside Lodge',
                'Brother\'s Pizza',
                'Yamato',
                'Beijing Chinese',
                'Allen\'s Country Kitchen',
                'Wings Etc',
                'The Forum',
                'Blondie\'s BBQ',
                'China Inn',
                'Jimmy John\'s',
                'Culver\'s',
                'Mama Fazio\'s Pizza',
                'Steak \'n Shake',
                'Applebee\'s',
                'Marco\'s Pizza',
                'Pizza Hut',
                'Dominos',
                'Cracker Barrel',
                'Buffalo Wild Wings',
                'Arby\'s',
                'Taco Bell',
                'Burger King',
                'Subway',
                'Wendy\'s',
                'Dairy Queen',
                'Long John Silver',
                'McDonald\'s',
                'KFC'
            ],
            SKILL_NAME: 'Chef',
            GET_DINNER_MESSAGE: 'What about ',
            HELP_MESSAGE: 'You can say what is for dinner, or, you can say exit, What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Enjoy your meal!',
        }
    }
};
const handlers = {
    'LaunchRequest': function () {
        this.emit('AMAZON.HelpIntent');
    },
    'NewSession': function () {
        this.emit('GetDinnerIntent');
    },
    'GetDinnerIntent': function () {
        if (this.attributes['dinnerOptions'] === undefined) {
            this.attributes['dinnerOptions'] = [];
        }
        const dinnerOptions = this.t('DINNERS');
        const optionIndex = Math.floor(Math.random() * dinnerOptions.length);
        const dinnerOption =  dinnerOptions[optionIndex];
        this.attributes['dinnerOptions'].push(dinnerOption);
        console.log(this.attributes['dinnerOptions']);
        console.log(this.attributes['dinnerOptions'].length);
        const speechOutput = this.t('GET_DINNER_MESSAGE') + dinnerOption;
        this.emit(':ask', speechOutput);
    },
    'AMAZON.YesIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.NoIntent': function () {
        const dinnerOptions = this.t('DINNERS');
        const optionIndex = Math.floor(Math.random() * dinnerOptions.length);
        const speechOutput =  dinnerOptions[optionIndex];
        this.emit(':ask', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};