<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Ex\Entity\User;

$user = $app['controllers_factory'];
$user->get('/', function (Application $app) {
        $users = $app['user_manager']->fetchAll();
        return new JsonResponse($users);
    })
->bind('api_users')
;

$user->post('/', function (Application $app, Request $request) {
        $name = $request->request->get('name');
        $email = $request->request->get('email');
        $user = new User($name, $email);
        // todo: validate
        $app['user_manager']->add($user);
        
        return new JsonResponse([]);
    })
->bind('api_user_new')
;

$user->put('/{id}', function (Application $app, Request $request, $id) {
        $user = $app['user_manager']->findById($id);
        $user->name = $request->request->get('name');
        $user->email = $request->request->get('email');
        // todo: validate
        // todo: check return value
        $app['user_manager']->update($user);
        return new JsonResponse([]);
    })
->assert('id', '\d+')
->bind('api_user_edit')
;

return $user;
