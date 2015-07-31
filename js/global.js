/* ================= */
/* === Constants === */
/* ================= */
var MAX_ACTIVATE_DISTANCE = 12;
var MAX_PATH_DISTANCE = 32;
var MAX_INTERACTION_DISTANCE = 2;
/* ================= */
/* === Player Id === */
/* ================= */
var globalPlayerId = 0;
/* ====================== */
/* === Alow Interface === */
/* ====================== */
var globalAllowInterface = true;
/* ====================== */
/* === Current Dialog === */
/* ====================== */
var globalCurrentDialog = false;
/* ================= */
/* === Tile Size === */
/* ================= */
var globalTileSize = {
    "x" : 60,
    "y" : 40
}
/* ============ */
/* === Data === */
/* ============ */
var globalData = {
    "ground" : false,
    "active" : false,
    "static" : false,
    "top" : false,
    "events" : false,
    "dialogs" : false
}
/* =========== */
/* === Map === */
/* =========== */
var globalMap = false;
/* =================== */
/* === Objects Map === */
/* =================== */
var globalObjectsMap = [];
/* ==================== */
/* === Body Element === */
/* ==================== */
var globalBody = false;
/* ========================= */
/* === Objects Container === */
/* ========================= */
var globalObjectsContainer = false;
/* ======================== */
/* === Ground Container === */
/* ======================== */
var globalGroundContainer = {
    "element" : false, 
    "context" : false 
}
/* ================= */
/* === Container === */
/* ================= */
var globalPlayerPanel = false;
/* =================== */
/* === Top Objects === */
/* =================== */
var globalTop = [];
/* ====================== */
/* === Active Objects === */
/* ====================== */
var globalActive = [];
/* ================= */
/* === Container === */
/* ================= */
var globalContainer = {
    "element" : false,
    "x" : 0,
    "y" : 0
}