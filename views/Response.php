<?php
class Response {
    public static function json($status, $message, $data = []) {
        http_response_code($status);
        echo json_encode(["message" => $message, "data" => $data]);
        exit();
    }
}
?>
