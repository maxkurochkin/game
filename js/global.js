/* ================= */
/* === Constants === */
/* ================= */
var activateDistance = 12;
var maxPathDistance = 32;
/* ================= */
/* === Player Id === */
/* ================= */
var playerId = 0;
/* ============ */
/* === Tile === */
/* ============ */
var tile = {
    'x' : 60,
    'y' : 40
}
/* ============ */
/* === Data === */
/* ============ */
var data = {
    'ground' : false,
    'active' : false,
    'static' : false,
    'top' : false,
    'events' : false
}
/* =========== */
/* === Map === */
/* =========== */
var map = false;
/* =================== */
/* === Objects Map === */
/* =================== */
var objectsMap = [];
/* ==================== */
/* === Body Element === */
/* ==================== */
var globalBody = false;
/* ========================= */
/* === Objects Container === */
/* ========================= */
var objects = false;
/* ============== */
/* === Ground === */
/* ============== */
var ground = {
    'element' : false, 
    'context' : false 
}
/* =================== */
/* === Top Objects === */
/* =================== */
var topObjects = [];
/* ====================== */
/* === Active Objects === */
/* ====================== */
var active = [];
/* ================= */
/* === Container === */
/* ================= */
var container = {
    'element' : false,
    'x' : 0,
    'y' : 0
}