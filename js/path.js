function easyPathFinder(x1, y1, x2, y2) {
    if (((x1 == x2) && (y1 == y2))
    || (globalMap.layers.wall[y2][x2])) { 
        return { 'x' : 0, 'y' : 0 }
    }
    var dX = Math.abs(x2 - x1);
    var dY = Math.abs(y2 - y1);
    var result = false;
    if (dX > dY) {
        var y = y1;
        if (x1 < x2) {
            for (var x = x1; x <= x2; x++) {
                if (x == x2) {
                    if (x == x1 + 1) { return { 'x' : 1, 'y' : Math.round(y - y1) } }
                    return result;
                }
                else if (x != x1) {
                    if ((globalMap.layers.wall[Math.round(y)][x]) 
                    || (globalObjectsMap[Math.round(y)][x])) { return false; }
                    else if (x == x1 + 1) { result = { 'x' : 1, 'y' : Math.round(y - y1) } }
                }
                if (y1 < y2) { y += dY / dX; }
                else if (y1 > y2) { y -= dY / dX; }
            }
        }
        else {
            for (var x = x1; x >= x2; x--) {
                if (x == x2) { 
                    if (x == x1 - 1) { return { 'x' : -1, 'y' : Math.round(y - y1) } }
                    return result; 
                }
                else if (x != x1) {
                    if ((globalMap.layers.wall[Math.round(y)][x]) 
                    || (globalObjectsMap[Math.round(y)][x])) { return false; }
                    else if (x == x1 - 1) { result = { 'x' : -1, 'y' : Math.round(y - y1) } }
                }
                if (y1 < y2) { y += dY / dX; }
                else if (y1 > y2) { y -= dY / dX; }
            }
        }
    }
    else {
        var x = x1;
        if (y1 < y2) {
            for (var y = y1; y <= y2; y++) {
                if (y == y2) { 
                    if (y == y1 + 1) { return { 'x' : Math.round(x - x1), 'y' : 1 } }
                    return result; 
                }
                else if (y != y1) {
                    if ((globalMap.layers.wall[y][Math.round(x)]) 
                    || (globalObjectsMap[y][Math.round(x)])) { return false; }
                    else if (y == y1 + 1) { result = { 'x' : Math.round(x - x1), 'y' : 1 } }
                }
                if (x1 < x2) { x += dX / dY; }
                else if (x1 > x2) { x -= dX / dY; }
            }
        }
        else {
            for (var y = y1; y >= y2; y--) {
                if (y == y2) { 
                    if (y == y1 - 1) { return { 'x' : Math.round(x - x1), 'y' : -1 } }
                    return result; 
                }
                else if (y != y1) {
                    if ((globalMap.layers.wall[y][Math.round(x)]) 
                    || (globalObjectsMap[y][Math.round(x)])) { return false; }
                    else if (y == y1 - 1) { result = { 'x' : Math.round(x - x1), 'y' : -1 } }
                }
                if (x1 < x2) { x += dX / dY; }
                else if (x1 > x2) { x -= dX / dY; }
            }
        }
    }
    return result;
}

function finder(start, end) {

    var finderMap = [];

    for (var y = 0; y < globalMap.size.y; y++) {
        finderMap[y] = [];
        for (var x = 0; x < globalMap.size.x; x++) {
            finderMap[y][x] = 0;
        }           
    }

    var loop = {
        'start' : { 'x' : start.x, 'y' : start.y },
        'end' : { 'x' : start.x, 'y' : start.y }
    }

    finderMap[start.y][start.x] = 1;

    var endPath = false;
    var success = false;
    while (!success) {
        if (loop.start.x < 0) { loop.start.x = 0; }
        if (loop.start.y < 0) { loop.start.y = 0; }
        if (loop.end.x >= globalMap.size.x) { loop.end.x = globalMap.size.x - 1; }
        if (loop.end.y >= globalMap.size.y) { loop.end.y = globalMap.size.y - 1; }
        if (endPath) { success = true; }
        var noPath = true;
        for (var y = loop.start.y; y <= loop.end.y; y++) {
            for (var x = loop.start.x; x <= loop.end.x; x++) {
                if ((finderMap[y][x] != 0) && (!globalMap.layers.wall[y][x])) {
                    if ((x - 1 >= 0)
                    && (!globalMap.layers.wall[y][x - 1])
                    && ((!globalObjectsMap[y][x - 1])
                    || ((x - 1 == end.x) && (y == end.y)))
                    && ((finderMap[y][x - 1] == 0)
                    || (finderMap[y][x - 1] > finderMap[y][x] + 1))) {
                        finderMap[y][x - 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((y - 1 >= 0)
                    && (!globalMap.layers.wall[y - 1][x])
                    && ((!globalObjectsMap[y - 1][x])
                    || ((x == end.x) && (y - 1 == end.y)))
                    && ((finderMap[y - 1][x] == 0)
                    || (finderMap[y - 1][x] > finderMap[y][x] + 1))) {
                        finderMap[y - 1][x] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((x + 1 < globalMap.size.x)
                    && (!globalMap.layers.wall[y][x + 1])
                    && ((!globalObjectsMap[y][x + 1])
                    || ((x + 1 == end.x) && (y == end.y)))
                    && ((finderMap[y][x + 1] == 0)
                    || (finderMap[y][x + 1] > finderMap[y][x] + 1))) {
                        finderMap[y][x + 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((y + 1 < globalMap.size.y) 
                    && (!globalMap.layers.wall[y + 1][x])
                    && ((!globalObjectsMap[y + 1][x])
                    || ((x == end.x) && (y + 1 == end.y)))
                    && ((finderMap[y + 1][x] == 0)
                    || (finderMap[y + 1][x] > finderMap[y][x] + 1))) {
                        finderMap[y + 1][x] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((x - 1 >= 0)
                    && (y - 1 >= 0)
                    && (!globalMap.layers.wall[y - 1][x - 1])
                    && ((!globalObjectsMap[y - 1][x - 1])
                    || ((x - 1 == end.x) && (y - 1 == end.y)))
                    && ((finderMap[y - 1][x - 1] == 0)
                    || (finderMap[y - 1][x - 1] > finderMap[y][x] + 1))) {
                        finderMap[y - 1][x - 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((x + 1 < globalMap.size.x)
                    && (y + 1 < globalMap.size.y)
                    && (!globalMap.layers.wall[y + 1][x + 1])
                    && ((!globalObjectsMap[y + 1][x + 1])
                    || ((x + 1 == end.x) && (y + 1 == end.y)))
                    && ((finderMap[y + 1][x + 1] == 0)
                    || (finderMap[y + 1][x + 1] > finderMap[y][x] + 1))) {
                        finderMap[y + 1][x + 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((x - 1 >= 0)
                    && (y + 1 < globalMap.size.y)
                    && (!globalMap.layers.wall[y + 1][x - 1])
                    && ((!globalObjectsMap[y + 1][x - 1])
                    || ((x - 1 == end.x) && (y + 1 == end.y)))
                    && ((finderMap[y + 1][x - 1] == 0)
                    || (finderMap[y + 1][x - 1] > finderMap[y][x] + 1))) {
                        finderMap[y + 1][x - 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }

                    if ((x + 1 < globalMap.size.x)
                    && (y - 1 >= 0)
                    && (!globalMap.layers.wall[y - 1][x + 1])
                    && ((!globalObjectsMap[y - 1][x + 1])
                    || ((x + 1 == end.x) && (y - 1 == end.y)))
                    && ((finderMap[y - 1][x + 1] == 0)
                    || (finderMap[y - 1][x + 1] > finderMap[y][x] + 1))) {
                        finderMap[y - 1][x + 1] = finderMap[y][x] + 1;
                        noPath = false;
                    }
                    if (finderMap[y][x] > MAX_PATH_DISTANCE) { noPath = true; } 
                    if ((x == end.x) && (y == end.y)) { endPath = true; }
                }
            }
        }

        if (noPath) {
            return {'x' : 0, 'y' : 0}
        }

        loop.start.x--;
        loop.start.y--;
        loop.end.x++;
        loop.end.y++;
    }
    
    var current = { 'x' : end.x, 'y' : end.y };
    var last = { 'x' : end.x, 'y' : end.y };

    while (true) {
        
        if ((current.y - 1 >= 0)
        && (finderMap[current.y - 1][current.x] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y - 1;
        }
        else if ((current.x - 1 >= 0)
        && (finderMap[current.y][current.x - 1] == finderMap[current.y][current.x] - 1)) {
            current.x = current.x - 1;
        }
        else if ((current.y + 1 < globalMap.size.y)
        && (finderMap[current.y + 1][current.x] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y + 1;
        }
        else if ((current.x + 1 < globalMap.size.x)
        && (finderMap[current.y][current.x + 1] == finderMap[current.y][current.x] - 1)) {
            current.x = current.x + 1;
        }
        else if ((current.y - 1 >= 0)
        && (current.x - 1 >= 0)
        && (finderMap[current.y - 1][current.x - 1] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y - 1;
            current.x = current.x - 1;
        }
        else if ((current.y + 1 < globalMap.size.y)
        && (current.x + 1 < globalMap.size.x)
        && (finderMap[current.y + 1][current.x + 1] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y + 1;
            current.x = current.x + 1;
        }
        else if ((current.y - 1 >= 0)
        && (current.x + 1 < globalMap.size.x)
        && (finderMap[current.y - 1][current.x + 1] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y - 1;
            current.x = current.x + 1;
        }
        else if ((current.y + 1 < globalMap.size.y)
        && (current.x - 1 >= 0)
        && (finderMap[current.y + 1][current.x - 1] == finderMap[current.y][current.x] - 1)) {
            current.y = current.y + 1;
            current.x = current.x - 1;
        }
        else {
            return {'x' : 0, 'y' : 0}
        }

        if ((current.x == start.x)
        && (current.y == start.y)) {
            return {'x' : last.x - start.x, 'y' : last.y - start.y}
        }

        last.x = current.x;
        last.y = current.y;
    }
}