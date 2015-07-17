function ready() {
    container.element = document.querySelector('#container');
    ground.element = document.querySelector('#ground-map');
    ground.context = ground.element.getContext('2d');
    objects = document.querySelector('#objects-map');
    /* --- */
    loadData(4);
    loadMap(4);
    renderMap();
    hideTop();
    /* --------------------------- */
    /* --- Main Animation Loop --- */
    /* --------------------------- */
    function animation() {
        for (id in active) { active[id].action(); }
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
    container.element.addEventListener('click', function(event) {
        var x = Math.round((event.offsetX / tile.x) - 0.5);
        var y = Math.round((event.offsetY / tile.y) - 0.5);
        /* --- */
        if (event.target != ground.element) {
            x = Math.round(((event.target.offsetLeft + event.offsetX) / tile.x) - 0.5);
            y = Math.round(((event.target.offsetTop + event.offsetY) / tile.y) - 0.5);
        }
        /* --- */
        if (x >= map.size.x) { x = map.size.x - 1; }
        if (y >= map.size.y) { y = map.size.y - 1; }
        /* --- */
        if (event.target != ground.element) {
            for (id in active) {
                var mapOffsetX = Math.round(active[id].settings.offset.x / tile.x);
                var mapOffsetY = Math.round(active[id].settings.offset.y / tile.y);
                /* --- */
                if ((x >= active[id].x + mapOffsetX)
                && (y >= active[id].y + mapOffsetY)
                && (x < active[id].x + mapOffsetX + Math.round(active[id].settings.size.x / tile.x))
                && (y < active[id].y + mapOffsetY + Math.round(active[id].settings.size.y / tile.y))
                && (id != playerId)) { active[playerId].targetMobId = id; }
            }
        }
        else {
            active[playerId].targetMobId = false;
            active[playerId].target.x = x;
            active[playerId].target.y = y;
        }
    });
}