<?php
$app->mount('/', include __DIR__ . '/controller/front/home.php');
$app->mount('/user', include __DIR__ . '/controller/front/user.php');
$app->mount('/api/users', include __DIR__ . '/controller/api/user.php');