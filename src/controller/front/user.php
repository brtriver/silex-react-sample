<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

$user = $app['controllers_factory'];
$user->get('/', function (Application $app) {
        return $app['twig']->render('user/list.html', []);
    })
->bind('user_list')
;

return $user;




