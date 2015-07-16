<?php
if ((!empty($_POST['id']))
&& (!empty($_POST['map']))) { file_put_contents('data/'.$_POST['id'].'/map.json', $_POST['map']); }
?>