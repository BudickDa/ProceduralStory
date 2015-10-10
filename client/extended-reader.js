Text = new ReactiveVar([]);

Template.registerHelper('text', function () {
    var textArray = Text.get();
    var readerText = Reader.parseGameObjectText(textArray);
    return parse(readerText);
});


function goTemplate(tagname, text) {
    var method = false;
    if (tagname === 'goback') {
        method = 'goBack()'
    }
    if (tagname === 'gonorth') {
        method = 'goNorth()'
    }
    if (tagname === 'goeast') {
        method = 'goEast()'
    }
    if (tagname === 'gosouth') {
        method = 'goSouth()'
    }
    if (tagname === 'gowest') {
        method = 'goWest()'
    }

    if (method) {
        return `<a href="#" onclick="
            var player = Spielebuch.player.get();
            player.${method};
            " >${text}</a>
        `
    } else {
        return text;
    }
}


var tagObject = function (name, template) {
    this.name = name.toLowerCase();
    this.template = template;
};
var tags = [
    new tagObject('goBack', goTemplate),
    new tagObject('goNorth', goTemplate),
    new tagObject('goEast', goTemplate),
    new tagObject('goSouth', goTemplate),
    new tagObject('goWest', goTemplate),
];

function parse(input) {
    var tmpElement = document.createElement('html');
    tmpElement.innerHTML = `${input}`;
    _.forEach(tags, (tag)=> {
        _.forEach(tmpElement.getElementsByTagName(tag.name), (element)=> {
            element.outerHTML = tag.template(tag.name, element.innerHTML);
        });
    });

    return tmpElement.innerHTML;
}


Template.body.events({
    'click .restart-story': function (event) {
        event.preventDefault();
        Session.set('spielebuchReady', false);
        Meteor.call('startStory', initBook);
    }
});