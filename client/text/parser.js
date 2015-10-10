/**
 * Templates for the replacement of tags.
 * @param tagname
 * @param text
 * @returns {*}
 */
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

/**
 * Tags that will be parsed and replaced by hyperlinks
 * @param name
 * @param template
 */
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

parseCustomTags = function(input) {
    var tmpElement = document.createElement('html');
    tmpElement.innerHTML = `${input}`;
    _.forEach(tags, (tag)=> {
        var elements = tmpElement.getElementsByTagName(tag.name);
        _.forEach(elements, (element)=> {
            element.outerHTML = tag.template(tag.name, element.innerHTML);
        });
    });
    return tmpElement.querySelector('body').innerHTML;
};
