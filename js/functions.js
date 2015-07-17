/* ================================================= */
/* === Set Conteiner Position (player in center) === */
/* ================================================= */
function setContainerPosition() {
    container.x = -1 * ((active[playerId].x * tile.x) - (window.innerWidth / 2));
    container.y = -1 * ((active[playerId].y * tile.y) - (window.innerHeight / 2));
    /* --- */
    if (container.x > 0) { container.x = 0; }
    if (container.y > 0) { container.y = 0; }
    /* --- */
    var minX = (-1 * (map.size.x * tile.x)) + window.innerWidth;
    var minY = (-1 * (map.size.y * tile.y)) + window.innerHeight;
    if (container.x < minX) { container.x = minX; }
    if (container.y < minY) { container.y = minY; }
    /* ---*/
    container.element.style['left'] = container.x + 'px';
    container.element.style['top'] = container.y + 'px';
}
/* ==================== */
/* === Get Distance === */
/* ==================== */
function distance(x1, y1, x2, y2) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    /* --- */
    return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
}
/* ================ */
/* === Hide Top === */
/* ================ */
function hideTop() {
    for (var id in topObjects) {
        var playerX = active[playerId].x * tile.x;
        var playerY = active[playerId].y * tile.y;
        /* --- */
        var topX = topObjects[id].x * tile.x;
        var topY = topObjects[id].y * tile.y;
        /* --- */
        if ((playerX >= topX)
        && (playerY >= topY + topObjects[id].z)
        && (playerX < topX + topObjects[id].size.x)
        && (playerY < topY + topObjects[id].size.y + topObjects[id].z)) {
            topObjects[id].element.style['display'] = 'none';
        }
        else { topObjects[id].element.style['display'] = 'block'; }
    }
}
/* ================== */
/* === Render Map === */
/* ================== */
function renderMap() {
    ground.element.width = map.size.x * tile.x;
    ground.element.height = map.size.y * tile.y;
    container.element.style['width'] = (map.size.x * tile.x) + 'px';
    container.element.style['height'] = (map.size.y * tile.y) + 'px';
    /* ---------------------------- */
    /* --- Render Ground Images --- */
    /* ---------------------------- */
    var images = [];
    var imagesNeed = 0;
    for (var id in data.ground) {
        imagesNeed++;
        images[id] = new Image();
        images[id].src = data.ground[id];
        images[id].addEventListener('load', function() { imagesNeed--; });
    }
    var groundImagesLoading = setInterval(function() {
        if (imagesNeed == 0) {
            for (var id in map.layers.ground) {
                    ground.context.drawImage(
                    images[map.layers.ground[id][0]],
                    map.layers.ground[id][1] * tile.x,
                    map.layers.ground[id][2] * tile.y
                );
            }
            clearInterval(groundImagesLoading);
            map.layers.ground = false;
        }
    }, 100);
    /* ----------------------------- */
    /* --- Render Active Objects --- */
    /* ----------------------------- */
    for (var id in map.layers.active) {
        var object = map.layers.active[id];
        var settings = JSON.parse(JSON.stringify(data.active[object[0]]));
        if (settings.type == 'aggressive-mob') {
            active.push(new AggressiveMob(object[1], object[2], settings));
        }
        else if (settings.type == 'player') {
            playerId = active.length;
            active.push(new PlayerMob(object[1], object[2], settings));
        }
    }
    /* ----------------------------- */
    /* --- Render Static Objects --- */
    /* ----------------------------- */
    for (var id in map.layers.static) {
        var object = map.layers.static[id];
        var settings = JSON.parse(JSON.stringify(data.static[object[0]]));
        /* --- */
        var element = document.createElement('div');
        element.style['background-image'] = 'url(' + settings.image + ')';
        element.style['left'] = ((object[1] * tile.x) + settings.offset.x) + 'px';
        element.style['top'] = ((object[2] * tile.y) + settings.offset.y) + 'px';
        element.style['width'] = settings.size.x + 'px';
        element.style['height'] = settings.size.y + 'px';
        element.style['z-index'] = object[2];
        /* --- */
        objects.appendChild(element);
    }
    /* ----------------------------- */
    /* --- Render Static Objects --- */
    /* ----------------------------- */
    for (var id in map.layers.static) {
        var object = map.layers.static[id];
        var settings = JSON.parse(JSON.stringify(data.static[object[0]]));
        /* --- */
        var element = document.createElement('div');
        element.style['background-image'] = 'url(' + settings.image + ')';
        element.style['left'] = ((object[1] * tile.x) + settings.offset.x) + 'px';
        element.style['top'] = ((object[2] * tile.y) + settings.offset.y) + 'px';
        element.style['width'] = settings.size.x + 'px';
        element.style['height'] = settings.size.y + 'px';
        element.style['z-index'] = object[2];
        /* --- */
        objects.appendChild(element);
    }
    /* -------------------------- */
    /* --- Render Top Objects --- */
    /* -------------------------- */
    for (var id in map.layers.top) {
        var object = map.layers.top[id];
        var settings = JSON.parse(JSON.stringify(data.top[object[0]]));
        /* --- */
        var element = document.createElement('img');
        element.src = settings.image;
        element.style['left'] = (object[1] * tile.x) + 'px';
        element.style['top'] = (object[2] * tile.y) + 'px';
        element.style['z-index'] = map.size.y;
        /* --- */
        topObjects.push({
            'element' : element,
            'x' : object[1],
            'y' : object[2],
            'z' : settings.z,
            'size' : {
                'x' : settings.size.x,
                'y' : settings.size.y
            }
        });
        /* --- */
        objects.appendChild(element);
    }
    /* --------------------- */
    /* --- Render Events --- */
    /* --------------------- */
    for (var id in map.layers.events) {
        var object = map.layers.events[id];
        var settings = JSON.parse(JSON.stringify(data.events[object[0]]));
        /* --- */
        var element = document.createElement('div');
        element.setAttribute('class', 'event');
        element.style['left'] = (object[1] * tile.x) + 'px';
        element.style['top'] = (object[2] * tile.y) + 'px';
        element.style['width'] = tile.x + 'px';
        element.style['height'] = tile.y + 'px';
        /* --- */
        objects.appendChild(element);
    }
}