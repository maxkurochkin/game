function ready() {
    globalContainer.element = document.querySelector('#container');
    globalGroundContainer.element = document.querySelector('#ground-map');
    globalGroundContainer.context = globalGroundContainer.element.getContext('2d');
    globalObjectsContainer = document.querySelector('#objects-map');
    globalClickContainer = document.querySelector('#click-map');
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
    var lastAnimationTime = 0;
    function animation() {
        var currentAnimationTime = Date.now();
        /* --- */
        if (currentAnimationTime - lastAnimationTime >= 1000 / TARGET_FPS) {
            for (id in globalActive) { globalActive[id].action(); }
            setContainerPosition();
            lastAnimationTime = currentAnimationTime;
        }
        /* --- */
        window.requestAnimationFrame(animation);
    }
    window.requestAnimationFrame(animation);
    /* -------------------------- */
    /* --- Set Players Tatget --- */
    /* -------------------------- */
    globalClickContainer.addEventListener('click', function(event) {
        var x = Math.round((event.offsetX / globalTileSize.x) - 0.5);
        var y = Math.round((event.offsetY / globalTileSize.y) - 0.5);
        /* --- */
        if (x >= globalMap.size.x) { x = globalMap.size.x - 1; }
        if (y >= globalMap.size.y) { y = globalMap.size.y - 1; }
        /* --- */
        var targetIsGround = true;
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
                globalActive[id].click();
                targetIsGround = false;
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