/* ================================================= */
/* === Set Conteiner Position (player in center) === */
/* ================================================= */
function setContainerPosition() {
    globalContainer.x = -1 * ((globalActive[globalPlayerId].x * globalTileSize.x) - (window.innerWidth / 2));
    globalContainer.y = -1 * ((globalActive[globalPlayerId].y * globalTileSize.y) - (window.innerHeight / 2));
    /* --- */
    if (globalContainer.x > 0) { globalContainer.x = 0; }
    if (globalContainer.y > 0) { globalContainer.y = 0; }
    /* --- */
    var minX = (-1 * (globalMap.size.x * globalTileSize.x)) + window.innerWidth;
    var minY = (-1 * (globalMap.size.y * globalTileSize.y)) + window.innerHeight;
    if (globalContainer.x < minX) { globalContainer.x = minX; }
    if (globalContainer.y < minY) { globalContainer.y = minY; }
    /* ---*/
    globalContainer.element.style['left'] = globalContainer.x + 'px';
    globalContainer.element.style['top'] = globalContainer.y + 'px';
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
    for (var id in globalTop) {
        var playerX = globalActive[globalPlayerId].x * globalTileSize.x;
        var playerY = globalActive[globalPlayerId].y * globalTileSize.y;
        /* --- */
        var topX = globalTop[id].x * globalTileSize.x;
        var topY = globalTop[id].y * globalTileSize.y;
        /* --- */
        if ((playerX >= topX)
        && (playerY >= topY + globalTop[id].z)
        && (playerX < topX + globalTop[id].size.x)
        && (playerY < topY + globalTop[id].size.y + globalTop[id].z)) {
            globalTop[id].element.style['display'] = 'none';
        }
        else { globalTop[id].element.style['display'] = 'block'; }
    }
}
/* ================== */
/* === Render Map === */
/* ================== */
function renderMap() {
    globalGroundContainer.element.width = globalMap.size.x * globalTileSize.x;
    globalGroundContainer.element.height = globalMap.size.y * globalTileSize.y;
    globalContainer.element.style['width'] = (globalMap.size.x * globalTileSize.x) + 'px';
    globalContainer.element.style['height'] = (globalMap.size.y * globalTileSize.y) + 'px';
    /* ---------------------------- */
    /* --- Render Ground Images --- */
    /* ---------------------------- */
    var images = [];
    var imagesNeed = 0;
    for (var id in globalData.ground) {
        imagesNeed++;
        images[id] = new Image();
        images[id].src = globalData.ground[id];
        images[id].addEventListener('load', function() { imagesNeed--; });
    }
    var groundImagesLoading = setInterval(function() {
        if (imagesNeed == 0) {
            for (var id in globalMap.layers.ground) {
                    globalGroundContainer.context.drawImage(
                    images[globalMap.layers.ground[id][0]],
                    globalMap.layers.ground[id][1] * globalTileSize.x,
                    globalMap.layers.ground[id][2] * globalTileSize.y
                );
            }
            clearInterval(groundImagesLoading);
            globalMap.layers.ground = false;
        }
    }, 100);
    /* ----------------------------- */
    /* --- Render Active Objects --- */
    /* ----------------------------- */
    for (var id in globalMap.layers.active) {
        var object = globalMap.layers.active[id];
        var settings = JSON.parse(JSON.stringify(globalData.active[object[0]]));
        if (settings.type == 'mob.aggressive') {
            globalActive.push(new AggressiveMobClass(object[1], object[2], settings));
        }
        else if (settings.type == 'mob.friendly') {
            globalActive.push(new FriendlyMobClass(object[1], object[2], settings));
        }
        else if (settings.type == 'mob.player') {
            globalPlayerId = globalActive.length;
            globalActive.push(new PlayerMobClass(object[1], object[2], settings));
        }
    }
    /* ----------------------------- */
    /* --- Render Static Objects --- */
    /* ----------------------------- */
    for (var id in globalMap.layers.static) {
        var object = globalMap.layers.static[id];
        var settings = JSON.parse(JSON.stringify(globalData.static[object[0]]));
        /* --- */
        var element = document.createElement('div');
        element.style['background-image'] = 'url(' + settings.image + ')';
        element.style['left'] = ((object[1] * globalTileSize.x) + settings.offset.x) + 'px';
        element.style['top'] = ((object[2] * globalTileSize.y) + settings.offset.y) + 'px';
        element.style['width'] = settings.size.x + 'px';
        element.style['height'] = settings.size.y + 'px';
        element.style['z-index'] = object[2];
        /* --- */
        globalObjectsContainer.appendChild(element);
    }
    /* -------------------------- */
    /* --- Render Top Objects --- */
    /* -------------------------- */
    for (var id in globalMap.layers.top) {
        var object = globalMap.layers.top[id];
        var settings = JSON.parse(JSON.stringify(globalData.top[object[0]]));
        /* --- */
        var element = document.createElement('img');
        element.src = settings.image;
        element.style['left'] = (object[1] * globalTileSize.x) + 'px';
        element.style['top'] = (object[2] * globalTileSize.y) + 'px';
        element.style['z-index'] = globalMap.size.y;
        /* --- */
        globalTop.push({
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
        globalObjectsContainer.appendChild(element);
    }
    /* --------------------- */
    /* --- Render Events --- */
    /* --------------------- */
    for (var id in globalMap.layers.events) {
        var object = globalMap.layers.events[id];
        var settings = JSON.parse(JSON.stringify(globalData.events[object[0]]));
        /* --- */
        var element = document.createElement('div');
        element.setAttribute('class', 'event');
        element.style['left'] = (object[1] * globalTileSize.x) + 'px';
        element.style['top'] = (object[2] * globalTileSize.y) + 'px';
        element.style['width'] = globalTileSize.x + 'px';
        element.style['height'] = globalTileSize.y + 'px';
        /* --- */
        globalObjectsContainer.appendChild(element);
    }
    /* Set Click Container Z */
    globalClickContainer.style['z-index'] = globalMap.size.y + 1;
}