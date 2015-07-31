/* ================= */
/* === Inventory === */
/* ================= */
function InventoryClass() {
    this.items = [];
    /* ----------------------- */
    /* --- Add Item Method --- */
    /* ----------------------- */
    this.addItem = function() {
        this.items.push(false);
    }
}
/* ============== */
/* === Dialog === */
/* ============== */
function DialogClass(dialog) {
    this.dialog = dialog;
    this.page = 'start';
    /* --- */
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'dialog-panel');
    globalBody.appendChild(this.element);
    /* --- */
    this.text = document.createElement('div');
    this.text.setAttribute('class', 'dialog-text');
    this.element.appendChild(this.text);
    /* --- */
    this.answers = document.createElement('div');
    this.answers.setAttribute('class', 'dialog-answers');
    this.element.appendChild(this.answers);
    /* ------------------- */
    /* --- Show Method --- */
    /* ------------------- */
    this.show = function(page) {
        this.page = page;
        this.text.innerHTML = this.dialog[this.page].text;
        var answers = this.answers.querySelectorAll('span');
        /* --- */
        for (var id = 0; id < answers.length; id++) { this.answers.removeChild(answers[id]); }
        /* --- */
        for (var id in this.dialog[this.page].answers) {
            var answer = document.createElement('span');
            answer.setAttribute('data-id', id);
            answer.innerHTML = this.dialog[this.page].answers[id].text;
            answer.addEventListener('click', function() { globalCurrentDialog.answer(this.getAttribute('data-id')); });
            this.answers.appendChild(answer);
        }
    }
    /* --------------------- */
    /* --- Answer Method --- */
    /* --------------------- */
    this.answer = function(id) {
        var action = this.dialog[this.page].answers[id].action.split('.');
        if (action[0] == 'dialog') {
            if (action[1] == 'page') { this.show(action[2]); }
            else if (action[1] == 'close') { this.delete(); }
        }
        else { script(this.dialog[this.page].answers[id].action); }
    }
    /* --------------------- */
    /* --- Delete Method --- */
    /* --------------------- */
    this.delete = function() {
        globalBody.removeChild(this.element);
        globalAllowInterface = true;
        globalCurrentDialog = false;
        globalActive[globalPlayerId].targetMobId = false;
        delete this;
    }
    /* -------------------- */
    /* --- Start Dialog --- */
    /* -------------------- */
    this.show(this.page);
}
/* ==================== */
/* === Player Panel === */
/* ==================== */
function PlayerPanelClass() {
    this.element = document.createElement('div');
    this.element.setAttribute('class', 'player-panel');
    globalBody.appendChild(this.element);
    /* --- */
    this.hpContainer = document.createElement('div');
    this.hpContainer.setAttribute('class', 'player-hp-container');
    this.element.appendChild(this.hpContainer);
    /* --- */
    this.hpValue = document.createElement('div');
    this.hpValue.setAttribute('class', 'player-hp-value');
    this.hpContainer.appendChild(this.hpValue);
    /* --- */
    this.information = document.createElement('div');
    this.information.setAttribute('class', 'player-information');
    this.element.appendChild(this.information);
    /* --------------------- */
    /* --- Set HP Method --- */
    /* --------------------- */
    this.setHP = function(value) { this.hpValue.style['width'] = value + '%'; }
    /* ------------------------------ */
    /* --- Set Information Method --- */
    /* ------------------------------ */
    this.setInformation = function(text) { this.information.innerHTML = text; }
}