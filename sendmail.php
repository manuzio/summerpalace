<?php
	if(!isset($_POST) || empty($_POST)) die('NO DIRECT ACCESS ALLOWED');
	require 'phpmailer/PHPMailerAutoload.php';
	$mail = new PHPMailer;
	//print_r($_POST);
	$input = array();
	foreach ($_POST as $k => $v) {
		$input[$k] = htmlspecialchars(trim($v));
	}
	switch ($_GET['type']) {
		case 'ORDER_CALL':
			$mail->From = 'service@summerpalace.ru';
			$mail->FromName = 'Summerpalace Mailer Bot';
			$mail->addAddress('sincerely.manny@gmail.com', 'Joe User'); 
			$mail->isHTML(true); 
			$mail->Subject = 'Call request';
			$mail->Body    = 'Запрос звонка от пользователя <b>'.$input['name'].'</b> по номеру <b>'.$input['phone'].'</b>';
			$mail->AltBody = 'Запрос звонка от пользователя '.$input['name'].' по номеру '.$input['phone'];
			break;
	}
	if(!$mail->send()) {
	    echo 'Message could not be sent.';
	    echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
	    echo 'ok';
	}
?>