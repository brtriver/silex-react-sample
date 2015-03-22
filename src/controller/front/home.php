<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
$home = $app['controllers_factory'];
$home->get('/', function (Application $app) {
        return $app['twig']->render('index.html', []);
    })
->bind('homepage')
;

return $home;
