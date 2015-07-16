function ready() {
    container.element = document.querySelector('#container');
    ground.element = document.querySelector('#ground-map');
    ground.context = ground.element.getContext('2d');
    objects = document.querySelector('#objects-map');
    /* --- */
    loadData(3);
    loadMap(3);
    renderMap();
    hideTop();
    /* --------------------------- */
    /* --- Main Animation Loop --- */
    /* --------------------------- */
    function animation() {
        for (id in mobs) { mobs[id].action(); }
        setContainerPosition();
        /* --- */
        setTimeout(function() {
            window.requestAnimationFrame(animation);
        }, 25);
    }
    window.requestAnimationFrame(animation);
    /* ------------------------ */
    /* --- Set Players Path --- */
    /* ------------------------ */
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
        mobs[playerId].targetMobId = false;
        mobs[playerId].target.x = x;
        mobs[playerId].target.y = y;
    });
}