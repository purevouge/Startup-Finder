<?php 
	//this code to remove the blank rows
	
	/*$filecontent = file($file); // put content in array
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
	fclose($fp);*/ // close file pointer */
	
	// add row to csv
	/*$file = "data/data.csv";  	
	$file = fopen($file,"a");*/
	$count = count(file('data/data.csv')); 
	$formData = $_POST['locData'];
	$fh = fopen("data/data.csv", "a");
	$sn = $count - 1;
	$data = "$sn, $formData\n";
	fwrite($fh, $data);
	
	fclose($fh);
	
	/*$line = explode(",", $_POST['locData']);
  	fputcsv($file,$line);
	fclose($file);*/
	
	//header("Location: index.html?id=1");
	die();
?>