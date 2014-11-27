<?php 
include 'header.html';


// switch ($_GET['page']) {
// 		case 'main':
// 			include 'main.html';
// 			break;
// 		case 'banquet':
// 			include 'banquet.html';
// 			break;
// 		case 'wedding':
// 			include 'wedding.html';
// 			break;
// 		case 'celebration':
// 			include 'celebration.html';
// 			break;
// 		case 'catering':
// 			include 'catering.html';
// 			break;
// 		case 'agency':
// 			include 'agency.html';
// 			break;
// 		default:
// 			include 'main.html';
// 			break;
// 	}

if ($_GET['page']) {
	if (is_file('./'.$_GET['page'].'.html')) {
		include $_GET['page'].'.html';
	}}
else {
	include 'main.html';
}

include 'footer.html';
?>