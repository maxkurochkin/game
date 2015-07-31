/* ================= */
/* === Load Data === */
/* ================= */
function loadData(dataId) {
    var request = new XMLHttpRequest();
    /* -------------------------- */
    /* --- Load Ground Images --- */
    /* -------------------------- */
    request.open('GET', 'data/' + dataId + '/ground.json', false);
    request.send();
    if (request.status == 200) {
        globalData.ground = JSON.parse(request.responseText);
    }
    /* --------------------------- */
    /* --- Load Active Objects --- */
    /* --------------------------- */
    request.open('GET', 'data/' + dataId + '/active.json', false);
    request.send();
    if (request.status == 200) { 
        globalData.active = JSON.parse(request.responseText);
    }
    /* --------------------------- */
    /* --- Load Static Objects --- */
    /* --------------------------- */
    request.open('GET', 'data/' + dataId + '/static.json', false);
    request.send();
    if (request.status == 200) { 
        globalData.static = JSON.parse(request.responseText);
    }
    /* ------------------------ */
    /* --- Load Top Objects --- */
    /* ------------------------ */
    request.open('GET', 'data/' + dataId + '/top.json', false);
    request.send();
    if (request.status == 200) {
        globalData.top = JSON.parse(request.responseText);
    }
    /* ------------------- */
    /* --- Load Events --- */
    /* ------------------- */
    request.open('GET', 'data/' + dataId + '/events.json', false);
    request.send();
    if (request.status == 200) {
        globalData.events = JSON.parse(request.responseText);
    }
    /* ------------------- */
    /* --- Load Dialogs --- */
    /* ------------------- */
    request.open('GET', 'data/' + dataId + '/dialogs.json', false);
    request.send();
    if (request.status == 200) {
        globalData.dialogs = JSON.parse(request.responseText);
    }
}
/* ================ */
/* === Load Map === */
/* ================ */
function loadMap(dataId) {
    var request = new XMLHttpRequest();
    request.open('GET', 'data/' + dataId + '/map.json', false);
    request.send();

    if (request.status == 200) {
        globalMap = JSON.parse(request.responseText);

        globalObjectsMap = [];
        for (var y = 0; y < globalMap.size.y; y++) {
            globalObjectsMap[y] = [];
            for (var x = 0; x < globalMap.size.x; x++) {
                if (globalMap.layers.wall[y][x] == 1) { globalMap.layers.wall[y][x] = true; }
                else { globalMap.layers.wall[y][x] = false; }
                globalObjectsMap[y][x] = false;
            }           
        }
    }
}