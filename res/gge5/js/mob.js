/* Mob types:
0 - player
1 - aggressive mob
2 - friendly mob
3 - neutral mob
*/

var base = {
    'player' : {
        'type' : 0,
        'image' : {
            'src' : 'images/sprites/h3.png',
            'size' : {'x' : 60, 'y' : 120},
            'offset' : {'x' : 0, 'y' : -2}
        },
        'sprites' : {
            'move' : [0, 0, -120, -120, 0, 0, -60, -60],
            'attack' : [-240, -180, -240, -180, -240, -180, -240, -180]
        },
        'game' : {
            'hp' : 20000,
            'attack' : {
                'damage' : 5,
                'radius' : 5
            }
        }
    },
    'aggressive' : {
        'type' : 1,
        'image' : {
            'src' : 'images/sprites/h2.png',
            'size' : {'x' : 60, 'y' : 120},
            'offset' : {'x' : 0, 'y' : -2}
        },
        'sprites' : {
            'move' : [0, 0, 120, 120, 0, 0, 60, 60],
            'attack' : [0, 120, 0, 60]
        }
    }
}

function Mob(x, y, settings) {
    /* If no settings */
    if (typeof settings != 'undefined') { this.settings = settings; }
    else { this.settings = base.aggressive; }
    /* Start coordinates */
    this.x = x;
    this.y = y;
    objectsMap[this.y][this.x] = true;
    /* Direction */
    this.direction = {
        'x' : 0, 
        'y' : 1
    }
    /* Target */
    this.targetMobId = false;
    this.target = {
        'x' : x, 
        'y' : y
    }
    /* Current move */
    this.move = { 
        'x' : 0, 
        'y' : 0, 
        'first' : true 
    }
    /* Current animatin */
    this.animation = [];
    /* Create html element */
    this.element = document.createElement('div');
    this.element.setAttribute('data-id', mobs.length);
    this.element.style.left = ((this.x + this.settings.image.offset.x) * tile.x) + 'px';
    this.element.style.top = ((this.y + this.settings.image.offset.y) * tile.y) + 'px';
    this.element.style['width'] = this.settings.image.size.x + 'px';
    this.element.style['height'] = this.settings.image.size.y + 'px';
    this.element.style['background-image'] = 'url(' + this.settings.image.src + ')';
    this.element.style['z-index'] = this.y;
    this.element.addEventListener('click', function(event) {
    	mobs[playerId].targetMobId = this.getAttribute('data-id');
    	console.log(mobs[playerId].targetMobId);
    });
    document.querySelector('#objects-map').appendChild(this.element);
    /* Main action method */
    this.action = function() {
        if ((this.move.x == 0)
        && (this.move.y == 0)) {
            if (distance(this.x, this.y, mobs[playerId].x, mobs[playerId].y) < activateDistance) {
                if (this.settings.type == 1) { this.targetMobId = playerId; }
                if (this.targetMobId !== false) {
                	this.target.x = mobs[this.targetMobId].x;
                    this.target.y = mobs[this.targetMobId].y;
                }
                var newMove = easyPathFinder(this.x, this.y, this.target.x, this.target.y);
                if (newMove === false) {
                    newMove = finder({'x' : this.x, 'y' : this.y}, this.target);
                }
                else if ((this.settings.type == 1)
                && (distance(this.x, this.y, this.target.x, this.target.y) < 6)) {
                    newMove = { 'x' : 0, 'y' : 0 }
                }      
                var freePath = true;
                for (id in mobs) {
                    if ((this.x + newMove.x == mobs[id].x)
                    && (this.y + newMove.y == mobs[id].y)) { freePath = false; }
                }
                if (freePath) { this.setMove(newMove.x, newMove.y); }
            }
        }
        if ((this.move.x != 0)
        || (this.move.y != 0)) {
            if (this.move.first) {
                objectsMap[this.y][this.x] = false;
                this.x += this.move.x;
                this.y += this.move.y;
                objectsMap[this.y][this.x] = true;
                this.move.first = false;
                if (this.move.y != 0) { this.element.style['z-index'] = this.y; }
            }
            var visualX = (this.x + this.settings.image.offset.x) * tile.x;
            var visualY = (this.y + this.settings.image.offset.y) * tile.y;
            if (this.animation.length) {
                visualX -= this.move.x * ((tile.x / (this.settings.sprites.move.length)) * (this.animation.length - 1));
                visualY -= this.move.y * ((tile.y / (this.settings.sprites.move.length)) * (this.animation.length - 1));
            }
            this.element.style.left = visualX + 'px';
            this.element.style.top = visualY + 'px';
            this.element.style['background-position-x'] = this.animation.pop() + 'px';
            if (!this.animation.length) {
                this.move.x = 0;
                this.move.y = 0;
                this.move.first = true;
            }
        }
    }
    /* Set move method */
    this.setMove = function(x, y) {
        if ((this.move.x == 0)
        && (this.move.y == 0)) {
            this.setDirection(x, y);
            this.move.x = x;
            this.move.y = y;
            this.animation = this.settings.sprites.move.slice();
        }
    }
    /* Set direction method */
    this.setDirection = function(x, y) {
        this.direction.x = x;
        this.direction.y = y;
        if ((x == 1) && (y == 1)) { this.element.style['background-position-y'] = '600px'; }
        else if ((x == 1) && (y == 0)) { this.element.style['background-position-y'] = '720px'; }
        else if ((x == 0) && (y == 1)) { this.element.style['background-position-y'] = '480px'; }
        else if ((x == -1) && (y == -1)) { this.element.style['background-position-y'] = '120px'; }
        else if ((x == -1) && (y == 0)) { this.element.style['background-position-y'] = '240px'; }
        else if ((x == 0) && (y == -1)) { this.element.style['background-position-y'] = '0px'; }
        else if ((x == 1) && (y == -1)) { this.element.style['background-position-y'] = '840px'; }
        else if ((x == -1) && (y == 1)) { this.element.style['background-position-y'] = '360px'; }
    }
    /* Set start direction */
    this.setDirection(0, 1);
}















function PlayerMob(x, y, settings) {
    /* If no settings */
    if (typeof settings != 'undefined') { this.settings = settings; }
    else { 
        this.settings = {
            'size' : { 'x' : 60, 'y' : 120 },
            'offset' : { 'x' : 0, 'y' : -80 },
            'image' : 'images/sprites/h4.png',
            'sprites' : {
                'direction' : [0, 0, 120, 120, 0, 0, 60, 60],
                'move' : [0, 0, -120, -120, 0, 0, -60, -60],
                'attack' : [-240, -180, -240, -180, -240, -180, -240, -180]
            },
            'corpse' : {
                'size' : { 'x' : 60, 'y' : 40 },
                'offset' : { 'x' : 0, 'y' : 0 },
                'sprite' : { 'x' : 0, 'y' : -960 }
            },
            'game' : {
                'hp' : 1000,
                'attack' : {
                    'damage' : 40,
                    'radius' : 5
                }
            }
        }
    }
    /* Start coordinates */
    this.x = x;
    this.y = y;
    objectsMap[this.y][this.x] = true;
    /* Direction */
    this.direction = {
        'x' : 0, 
        'y' : 1
    }
    /* Target */
    this.targetMobId = false;
    this.target = {
        'x' : x, 
        'y' : y
    }
    /* Current move */
    this.movement = { 
        'x' : 0, 
        'y' : 0, 
        'first' : true 
    }
    /* Current animatin */
    this.animation = [];
    /* Create html element */
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'player');
    this.element.setAttribute('data-id', mobs.length);
    this.element.style.left = ((this.x * tile.x) + this.settings.offset.x) + 'px';
    this.element.style.top = ((this.y * tile.y) + this.settings.offset.y) + 'px';
    this.element.style['width'] = this.settings.size.x + 'px';
    this.element.style['height'] = this.settings.size.y + 'px';
    this.element.style['background-image'] = 'url(' + this.settings.image + ')';
    this.element.style['z-index'] = this.y;
    document.querySelector('#objects-map').appendChild(this.element);
    /* Main action method */
    this.action = function() {
        if (this.settings.game.hp > 0) {
            var allowAttack = false;
            if ((this.movement.x == 0)
            && (this.movement.y == 0)) {
                if (distance(this.x, this.y, mobs[playerId].x, mobs[playerId].y) < activateDistance) {
                    if (this.targetMobId !== false) {
                        this.target.x = mobs[this.targetMobId].x;
                        this.target.y = mobs[this.targetMobId].y;
                    }
                    var newMove = easyPathFinder(this.x, this.y, this.target.x, this.target.y);
                    if (newMove === false) {
                        newMove = finder({'x' : this.x, 'y' : this.y}, this.target);
                    }
                    else if ((this.targetMobId !== false)
                    && (distance(this.x, this.y, this.target.x, this.target.y) <= this.settings.game.attack.radius)) {
                        if (mobs[this.targetMobId].settings.game.hp > 0) {
                            this.setDirection(newMove.x, newMove.y);
                            allowAttack = true;
                        }
                        else { 
                            this.targetMobId = false;
                            this.target.x = this.x;
                            this.target.y = this.y;
                            this.element.style['background-position-x'] = '0px';
                        }
                        newMove = { 'x' : 0, 'y' : 0 }
                    }
                    if (allowAttack) { this.attack(); }
                    else if (!objectsMap[this.y + newMove.y][this.x + newMove.x]) { 
                        this.setMovement(newMove.x, newMove.y); 
                    }
                }
            }
            this.move();
        }
        else if (!this.dead) {
            objectsMap[this.y][this.x] = false;
            this.element.style.left = ((this.x * tile.x) + this.settings.corpse.offset.x) + 'px';
            this.element.style.top = ((this.y * tile.y) + this.settings.corpse.offset.y) + 'px';
            this.element.style['width'] = this.settings.corpse.size.x + 'px';
            this.element.style['height'] = this.settings.corpse.size.y + 'px';
            this.element.style['background-position-x'] = this.settings.corpse.sprite.x + 'px';
            this.element.style['background-position-y'] = this.settings.corpse.sprite.y + 'px';
            this.element.style['z-index'] = 0;
            this.dead = true;
        }
    }
    /* Move method */
    this.move = function() {
        if ((this.movement.x != 0)
        || (this.movement.y != 0)) {
            if (this.movement.first) {
                objectsMap[this.y][this.x] = false;
                this.x += this.movement.x;
                this.y += this.movement.y;
                objectsMap[this.y][this.x] = true;
                this.movement.first = false;
                if (this.movement.y != 0) { this.element.style['z-index'] = this.y; }
                hideTop();
            }
            var visualX = (this.x * tile.x) + this.settings.offset.x;
            var visualY = (this.y * tile.y) + this.settings.offset.y;
            if (this.animation.length) {
                visualX -= this.movement.x * ((tile.x / (this.settings.sprites.move.length)) * (this.animation.length - 1));
                visualY -= this.movement.y * ((tile.y / (this.settings.sprites.move.length)) * (this.animation.length - 1));
            }
            this.element.style.left = visualX + 'px';
            this.element.style.top = visualY + 'px';
            this.element.style['background-position-x'] = this.animation.pop() + 'px';
            if (!this.animation.length) {
                this.movement.x = 0;
                this.movement.y = 0;
                this.movement.first = true;
            }
        }
    }
    /* Attack method */
    this.attack = function() {
        /* First step */
        if (this.attack.first) {
            this.animation = this.settings.sprites.attack.slice();
            this.attack.first = false;
        }
        /* All steps */
        this.element.style['background-position-x'] = this.animation.pop() + 'px';
        /* Last step */
        if (!this.animation.length) {
            mobs[this.targetMobId].settings.game.hp -= this.settings.game.attack.damage;
            this.attack.first = true;
        }
    }
    /* Set move method */
    this.setMovement = function(x, y) {
        if ((this.movement.x == 0)
        && (this.movement.y == 0)) {
            this.setDirection(x, y);
            this.movement.x = x;
            this.movement.y = y;
            this.animation = this.settings.sprites.move.slice();
        }
    }
    /* Set direction method */
    this.setDirection = function(x, y) {
        this.direction.x = x;
        this.direction.y = y;
        if ((x == 1) && (y == 1)) { this.element.style['background-position-y'] = '-360px'; }
        else if ((x == 1) && (y == 0)) { this.element.style['background-position-y'] = '-240px'; }
        else if ((x == 0) && (y == 1)) { this.element.style['background-position-y'] = '-480px'; }
        else if ((x == -1) && (y == -1)) { this.element.style['background-position-y'] = '-840px'; }
        else if ((x == -1) && (y == 0)) { this.element.style['background-position-y'] = '-720px'; }
        else if ((x == 0) && (y == -1)) { this.element.style['background-position-y'] = '-0px'; }
        else if ((x == 1) && (y == -1)) { this.element.style['background-position-y'] = '-120px'; }
        else if ((x == -1) && (y == 1)) { this.element.style['background-position-y'] = '-600px'; }
    }
    /* Set start direction */
    this.setDirection(0, 1);
}






























function AggressiveMob(x, y, settings) {
    /* If no settings */
    if (typeof settings != 'undefined') { this.settings = settings; }
    else { 
        this.settings = {
            'size' : { 'x' : 60, 'y' : 120 },
            'offset' : { 'x' : 0, 'y' : -80 },
            'image' : 'images/sprites/h5.png',
            'sprites' : {
                'direction' : [0, 0, 120, 120, 0, 0, 60, 60],
                'move' : [0, 0, -120, -120, 0, 0, -60, -60],
                'attack' : [-240, -180, -240, -180, -240, -180, -240, -180]
            },
            'corpse' : {
                'size' : { 'x' : 60, 'y' : 40 },
                'offset' : { 'x' : 0, 'y' : 0 },
                'sprite' : { 'x' : 0, 'y' : -960 }
            },
            'game' : {
                'hp' : 200,
                'attack' : {
                    'damage' : 5,
                    'radius' : 5
                }
            }
        }
    }
    /* Start coordinates */
    this.x = x;
    this.y = y;
    objectsMap[this.y][this.x] = true;
    /* Dead */
    this.dead = false;
    /* Direction */
    this.direction = {
        'x' : 0, 
        'y' : 1
    }
    /* Target */
    this.targetMobId = false;
    this.target = {
        'x' : x, 
        'y' : y
    }
    /* Current move */
    this.movement = { 
        'x' : 0, 
        'y' : 0, 
        'first' : true 
    }
    /* Current animatin */
    this.animation = [];
    /* Create html element */
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'aggressive-mob');
    this.element.setAttribute('data-id', mobs.length);
    this.element.style.left = ((this.x * tile.x) + this.settings.offset.x) + 'px';
    this.element.style.top = ((this.y * tile.y) + this.settings.offset.y) + 'px';
    this.element.style['width'] = this.settings.size.x + 'px';
    this.element.style['height'] = this.settings.size.y + 'px';
    this.element.style['background-image'] = 'url(' + this.settings.image + ')';
    this.element.style['z-index'] = this.y;
    this.element.addEventListener('click', function(event) {
        mobs[playerId].targetMobId = this.getAttribute('data-id');
        event.stopPropagation();
    });
    document.querySelector('#objects-map').appendChild(this.element);
    /* Main action method */
    this.action = function() {
        if (this.settings.game.hp > 0) {
            this.element.innerHTML = this.settings.game.hp;
            var allowAttack = false;
            if ((this.movement.x == 0)
            && (this.movement.y == 0)) {
                if (distance(this.x, this.y, mobs[playerId].x, mobs[playerId].y) < activateDistance) {
                    this.targetMobId = playerId;
                    if (this.targetMobId !== false) {
                        this.target.x = mobs[this.targetMobId].x;
                        this.target.y = mobs[this.targetMobId].y;
                    }
                    var newMove = easyPathFinder(this.x, this.y, this.target.x, this.target.y);
                    if (newMove === false) {
                        newMove = finder({'x' : this.x, 'y' : this.y}, this.target);
                    }
                    else if ((this.targetMobId !== false)
                    && (distance(this.x, this.y, this.target.x, this.target.y) <= this.settings.game.attack.radius)) {
                        if (mobs[this.targetMobId].settings.game.hp > 0) {
                            this.setDirection(newMove.x, newMove.y);
                            allowAttack = true;
                        }
                        else { 
                            this.targetMobId = false;
                            this.target.x = this.x;
                            this.target.y = this.y;
                            this.element.style['background-position-x'] = '0px';
                        }
                        newMove = { 'x' : 0, 'y' : 0 }
                    }
                    var allowMovement = true;
                    if (allowAttack) { this.attack(); }
                    else if (!objectsMap[this.y + newMove.y][this.x + newMove.x]) { 
                        this.setMovement(newMove.x, newMove.y); 
                    }
                }
            }
            this.move();
        }
        else if (!this.dead) {
            objectsMap[this.y][this.x] = false;
            this.element.innerHTML = this.settings.game.hp;
            this.element.style.left = ((this.x * tile.x) + this.settings.corpse.offset.x) + 'px';
            this.element.style.top = ((this.y * tile.y) + this.settings.corpse.offset.y) + 'px';
            this.element.style['width'] = this.settings.corpse.size.x + 'px';
            this.element.style['height'] = this.settings.corpse.size.y + 'px';
            this.element.style['background-position-x'] = this.settings.corpse.sprite.x + 'px';
            this.element.style['background-position-y'] = this.settings.corpse.sprite.y + 'px';
            this.element.style['z-index'] = 0;
            this.dead = true;
        }
    }
    /* Move method */
    this.move = function() {
        if ((this.movement.x != 0)
        || (this.movement.y != 0)) {
            if (this.movement.first) {
                objectsMap[this.y][this.x] = false;
                this.x += this.movement.x;
                this.y += this.movement.y;
                objectsMap[this.y][this.x] = true;
                this.movement.first = false;
                if (this.movement.y != 0) { this.element.style['z-index'] = this.y; }
            }
            var visualX = (this.x * tile.x) + this.settings.offset.x;
            var visualY = (this.y * tile.y) + this.settings.offset.y;
            if (this.animation.length) {
                visualX -= this.movement.x * ((tile.x / (this.settings.sprites.move.length)) * (this.animation.length - 1));
                visualY -= this.movement.y * ((tile.y / (this.settings.sprites.move.length)) * (this.animation.length - 1));
            }
            this.element.style.left = visualX + 'px';
            this.element.style.top = visualY + 'px';
            this.element.style['background-position-x'] = this.animation.pop() + 'px';
            if (!this.animation.length) {
                this.movement.x = 0;
                this.movement.y = 0;
                this.movement.first = true;
            }
        }
    }
    /* Attack method */
    this.attack = function() {
        /* First step */
        if (this.attack.first) {
            this.animation = this.settings.sprites.attack.slice();
            this.attack.first = false;
        }
        /* All steps */
        this.element.style['background-position-x'] = this.animation.pop() + 'px';
        /* Last step */
        if (!this.animation.length) {
            mobs[this.targetMobId].settings.game.hp -= this.settings.game.attack.damage;
            this.attack.first = true;
        }
    }
    /* Set move method */
    this.setMovement = function(x, y) {
        if ((this.movement.x == 0)
        && (this.movement.y == 0)) {
            this.setDirection(x, y);
            this.movement.x = x;
            this.movement.y = y;
            this.animation = this.settings.sprites.move.slice();
        }
    }
    /* Set direction method */
    this.setDirection = function(x, y) {
        this.direction.x = x;
        this.direction.y = y;
        if ((x == 1) && (y == 1)) { this.element.style['background-position-y'] = '-360px'; }
        else if ((x == 1) && (y == 0)) { this.element.style['background-position-y'] = '-240px'; }
        else if ((x == 0) && (y == 1)) { this.element.style['background-position-y'] = '-480px'; }
        else if ((x == -1) && (y == -1)) { this.element.style['background-position-y'] = '-840px'; }
        else if ((x == -1) && (y == 0)) { this.element.style['background-position-y'] = '-720px'; }
        else if ((x == 0) && (y == -1)) { this.element.style['background-position-y'] = '-0px'; }
        else if ((x == 1) && (y == -1)) { this.element.style['background-position-y'] = '-120px'; }
        else if ((x == -1) && (y == 1)) { this.element.style['background-position-y'] = '-600px'; }
    }
    /* Set start direction */
    this.setDirection(0, 1);
}