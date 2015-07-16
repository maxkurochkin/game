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
        data.ground = JSON.parse(request.responseText);
    }
    /* --------------------------- */
    /* --- Load Active Objects --- */
    /* --------------------------- */
    request.open('GET', 'data/' + dataId + '/active.json', false);
    request.send();
    if (request.status == 200) { 
        data.active = JSON.parse(request.responseText);
    }
    /* --------------------------- */
    /* --- Load Static Objects --- */
    /* --------------------------- */
    request.open('GET', 'data/' + dataId + '/static.json', false);
    request.send();
    if (request.status == 200) { 
        data.static = JSON.parse(request.responseText);
    }
    /* ------------------------ */
    /* --- Load Top Objects --- */
    /* ------------------------ */
    request.open('GET', 'data/' + dataId + '/top.json', false);
    request.send();
    if (request.status == 200) {
        data.top = JSON.parse(request.responseText);
    }
    /* ------------------- */
    /* --- Load Events --- */
    /* ------------------- */
    request.open('GET', 'data/' + dataId + '/events.json', false);
    request.send();
    if (request.status == 200) {
        data.events = JSON.parse(request.responseText);
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
        map = JSON.parse(request.responseText);

        objectsMap = [];
        for (var y = 0; y < map.size.y; y++) {
            objectsMap[y] = [];
            for (var x = 0; x < map.size.x; x++) {
                if (map.layers.wall[y][x] == 1) { map.layers.wall[y][x] = true; }
                else { map.layers.wall[y][x] = false; }
                objectsMap[y][x] = false;
            }           
        }
    }
}