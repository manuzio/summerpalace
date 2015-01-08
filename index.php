<?php 
$breadcrumbs = '';
$breadcrumbs_arr = [['href' => '?page', 'text' => 'Главная']];

switch ($_GET['page']) {
	case 'banquet':
		$breadcrumbs_arr[] = ['href' => '?page=banquet', 'text' => 'Банкеты'];
		break;
	case 'backery':
		$breadcrumbs_arr[] = ['href' => '?page=banquet', 'text' => 'Банкеты'];
		$breadcrumbs_arr[] = ['href' => '?page=backery', 'text' => 'Кондитерская'];
		break;
	case 'weddings':
		$breadcrumbs_arr[] = ['href' => '?page=weddings', 'text' => 'Свадьбы'];
		break;
	case 'holiday':
		$breadcrumbs_arr[] = ['href' => '?page=holiday', 'text' => 'Праздники'];
		break;
	case 'catering':
		$breadcrumbs_arr[] = ['href' => '?page=catering', 'text' => 'Кейтринг'];
		break;
	case 'corporate':
		$breadcrumbs_arr[] = ['href' => '?page=corporate', 'text' => 'Организация мероприятий'];
		break;
	case 'live':
		$breadcrumbs_arr[] = ['href' => '?page=live', 'text' => 'Летний дворец LIVE'];
		break;
	case 'restaurant':
		$breadcrumbs_arr[] = ['href' => '?page=restaurant', 'text' => 'Ресторан'];
		break;
	case 'story':
		$breadcrumbs_arr[] = ['href' => '?page=story', 'text' => 'История'];
		break;
	case 'team':
		$breadcrumbs_arr[] = ['href' => '?page=team', 'text' => 'Команда'];
		break;
	case 'contact':
		$breadcrumbs_arr[] = ['href' => '?page=contact', 'text' => 'Контакты'];
		break;
	case 'pricelist':
		$breadcrumbs_arr[] = ['href' => '?page=pricelist', 'text' => 'Услуги и цены'];
		break;
}

foreach ($breadcrumbs_arr as $bc) {
	$breadcrumbs .= '<a href="'.$bc['href'].'">'.$bc['text'].'</a>';
}

include 'header.html';

if ($_GET['page']) {
	if (is_file('./'.$_GET['page'].'.html')) {
		include $_GET['page'].'.html';
	}}
else {
	include 'indexpage.html';
}

include 'footer.html';
?>