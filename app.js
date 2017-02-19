'use strict';

module.change_code = 1;

const alexa = require('alexa-app');

const app = new alexa.app('chef');

const model = {
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
};

function getDinnerOption(suggestions) {
    const dinnerOptions = model.DINNERS;
    const optionIndex = Math.floor(Math.random() * dinnerOptions.length);
    const dinnerOption =  dinnerOptions[optionIndex];
    dinnerOptions.splice(optionIndex, 1);
    return dinnerOption;
}

app.launch(function(req, res) {
  res.session('suggestions', []);

  const prompt = model.HELP_MESSAGE;
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('GetDinnerIntent', {
  "slots": {
    "YES_ACTION": "LITERAL",
    "NO_ACTION": "LITERAL"
  },
  "utterances": [
    "{yes|yeah|yep|sure|ok|YES_ACTION}",
    "{no|nope|NO_ACTION}"
  ]
},
  function(req, res) {
    const yesAction = req.slot('YES_ACTION');

    if (yesAction) {
      res.say(model.STOP_MESSAGE);
      return;
    }

    const noAction = req.slot('NO_ACTION');
    const suggestions = req.session('suggestions');

    if (!noAction && suggestions.length >= 0) {
      res.reprompt("Sorry, I didn't understand. Try again.").shouldEndSession(false);
      return;
    }
    var dinnerOption = getDinnerOption(suggestions);

    if (dinnerOption === null) {
      res.say("Sorry, I'm out of suggestions.");
      return;
    }

    suggestions.push(dinnerOption);
    res.session('suggestions', suggestions);

    const prompt = (suggestions.length == 0 ? model.GET_DINNER_MESSAGE : '') + dinnerOption;
    res.say(prompt).shouldEndSession(false);
  }
);

module.exports = app;
