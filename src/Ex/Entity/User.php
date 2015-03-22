<?php
namespace Ex\Entity;

class User
{
    public $id;
    public $name;
    public $email;

    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }

    public function isValid()
    {
        return true;
    }

    public function isNew()
    {
        return $this->id ? false: true;
    }
}