function ready() {
    globalContainer.element = document.querySelector('#container');
    globalGroundContainer.element = document.querySelector('#ground-map');
    globalGroundContainer.context = globalGroundContainer.element.getContext('2d');
    globalObjectsContainer = document.querySelector('#objects-map');
    globalBody = document.querySelector('body');
    globalPlayerPanel = new PlayerPanelClass();
    /* --- */
    loadData(4);
    loadMap(4);
    renderMap();
    hideTop();
    /* --------------------------- */
    /* --- Main Animation Loop --- */
    /* --------------------------- */
    function animation() {
        for (id in globalActive) { globalActive[id].action(); }
        setContainerPosition();
        /* --- */
        setTimeout(function() {
            window.requestAnimationFrame(animation);
        }, 25);
    }
    window.requestAnimationFrame(animation);
    /* -------------------------- */
    /* --- Set Players Tatget --- */
    /* -------------------------- */
    globalContainer.element.addEventListener('click', function(event) {
        var x = Math.round((event.offsetX / globalTileSize.x) - 0.5);
        var y = Math.round((event.offsetY / globalTileSize.y) - 0.5);
        /* --- */
        if (event.target != globalGroundContainer.element) {
            x = Math.round(((event.target.offsetLeft + event.offsetX) / globalTileSize.x) - 0.5);
            y = Math.round(((event.target.offsetTop + event.offsetY) / globalTileSize.y) - 0.5);
        }
        /* --- */
        if (x >= globalMap.size.x) { x = globalMap.size.x - 1; }
        if (y >= globalMap.size.y) { y = globalMap.size.y - 1; }
        /* --- */
        var targetIsGround = true;
        if (event.target != globalGroundContainer.element) {
            for (id in globalActive) {
                var mapOffsetX = Math.round(globalActive[id].settings.offset.x / globalTileSize.x);
                var mapOffsetY = Math.round(globalActive[id].settings.offset.y / globalTileSize.y);
                /* --- */
                if ((x >= globalActive[id].x + mapOffsetX)
                && (y >= globalActive[id].y + mapOffsetY)
                && (x < globalActive[id].x + mapOffsetX + Math.round(globalActive[id].settings.size.x / globalTileSize.x))
                && (y < globalActive[id].y + mapOffsetY + Math.round(globalActive[id].settings.size.y / globalTileSize.y))
                && (id != globalPlayerId)
                && (!globalActive[id].dead)) { 
                    globalActive[globalPlayerId].targetMobId = id;
                    targetIsGround = false;
                }
            }
        }
        /* --- */
        if (targetIsGround) {
            globalActive[globalPlayerId].targetMobId = false;
            globalActive[globalPlayerId].target.x = x;
            globalActive[globalPlayerId].target.y = y;
        }
    });
}