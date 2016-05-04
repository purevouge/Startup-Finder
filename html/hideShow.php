<?php 	
	$filename = "data/data.csv";
	$id = htmlspecialchars($_GET["id"]);
	$filename_tmp = "data/data_tmp.csv";

	$handle = fopen($filename,'r');
	$handle_writer = fopen($filename_tmp,'w');

	while ( ($cell = fgetcsv($handle) ) !== FALSE ) {
    
    	if($cell[0] == $id){
        	$cell[11] = "no";
    	}
    
    fputcsv($handle_writer, $cell);
	}

	fclose($handle);
	fclose($handle_writer);

	rename($filename_tmp, $filename);
	
	header("Location: index.html?id=1");
	die();
?>