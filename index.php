<?php 
// print_r($_GET);

$page = isset($_GET['page'])?$_GET['page']:false;

$breadcrumbs = '';
$breadcrumbs_arr = [['href' => '/summerpalace', 'text' => 'Главная']];
$title = '';

switch ($page) {
	case 'banquet':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/banquet', 'text' => 'Банкеты'];
		$title = 'Бакеты';
		break;
	case 'backery':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/banquet', 'text' => 'Банкеты'];
		$breadcrumbs_arr[] = ['href' => '/summerpalace/backery', 'text' => 'Кондитерская'];
		break;
	case 'weddings':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/weddings', 'text' => 'Свадьбы'];
		break;
	case 'holiday':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/holiday', 'text' => 'Праздники'];
		break;
	case 'catering':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/catering', 'text' => 'Кейтринг'];
		break;
	case 'corporate':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/corporate', 'text' => 'Организация мероприятий'];
		break;
	case 'live':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/live', 'text' => 'Летний дворец LIVE'];
		break;
	case 'restaurant':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/restaurant', 'text' => 'Ресторан'];
		break;
	case 'story':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/story', 'text' => 'История'];
		break;
	case 'team':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/team', 'text' => 'Команда'];
		break;
	case 'contact':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/contact', 'text' => 'Контакты'];
		break;
	case 'pricelist':
		$breadcrumbs_arr[] = ['href' => '/summerpalace/pricelist', 'text' => 'Услуги и цены'];
		break;
}

foreach ($breadcrumbs_arr as $bc) {
	$breadcrumbs .= '<a href="'.$bc['href'].'">'.$bc['text'].'</a>';
}

include 'header.html';

if ($page) {
	if (is_file('./'.$page.'.html')) {
		include $page.'.html';
	}}
else {
	include 'indexpage.html';
}

include 'footer.html';
?>