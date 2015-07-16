var activateDistance = 12;
var maxPathDistance = 32;

var playerId = 0;

var tile = {
    'x' : 60,
    'y' : 40
};

var folders = {
    'map' : 'map/',
    'images' : 'images/'
};

var map = false;

var objects = false;

var ground = {
    'element' : false, 
    'context' : false 
}

var topObjects = [];

var mobs = [];

var container = {
    'element' : false,
    'x' : 0,
    'y' : 0
}

var data = {
    'ground' : false,
    'active' : false,
    'static' : false,
    'top' : false,
    'events' : false
}

var objectsMap = [];
