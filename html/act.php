<?php 
	$file = "data/data.csv";          //file to append to
  	$current = file_get_contents($file);    //open the file
	$data = explode(",", $_POST['locData']);
	$current .= "\n" . implode(",",$data);  //add line-break then comma separated array data
  	file_put_contents($file, $current);     //append new content to file
	
	$filecontent = file($file); // put content in array
	$num_lines = count($filecontent); // determine num of lines
	$fileOut = 'data/data.csv'; // file to write
	$fp = fopen($fileOut, 'w'); // create file pointer
	for($i = 0; $i < $num_lines; $i++) // start loop
	{
		$line = trim($filecontent[$i]); // trim line
		if(!empty($line)) // if not empty
		{
			if($i < count($filecontent) - 1)
			{
				fwrite($fp, $line . "\n"); // add NEW line
			}
			else {
				fwrite($fp, $line);
			}
		 }
	}
	fclose($fp); // close file pointer 
	
	header("Location: index.html?id=1");
	die();
?>