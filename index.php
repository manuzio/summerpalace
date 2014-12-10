<?php 
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