<?php
namespace Ex\Service;

use Ex\Entity\User;

class UserManager
{
    public $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function fetchAll()
    {
        return $this->db->fetchAll('select id, name, email from demo');
    }

    public function findById($id)
    {
        $sql = "select id, name, email from demo where id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue("id", $id);
        $stmt->execute();
        $rs = $stmt->fetch(\PDO::FETCH_ASSOC);
        // TODO: if not match...
        $user = new User($rs['name'], $rs['email']);
        $user->id = $rs['id'];

        return $user;
    }

    public function add(User $user)
    {
        $sql = "insert into demo (name, email) values (:name, :email)";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue("name", $user->name);
        $stmt->bindValue("email", $user->email);
        $stmt->execute();
    }

    public function update(User $user)
    {
        if ($user->isNew()) {
            return false;
        }
        $sql = "update demo set name = :name, email = :email where id = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue("id", $user->id);
        $stmt->bindValue("name", $user->name);
        $stmt->bindValue("email", $user->email);
        $stmt->execute();

        return true;
    }
}