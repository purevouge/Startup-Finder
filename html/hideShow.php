<?php 
echo htmlspecialchars($_GET["id"]);
	$row = htmlspecialchars($_GET["id"]);
	if (($handle = fopen("data/data.csv", "r")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
			$num = count($data);
			echo "<p> $num fields in line $row: <br /></p>\n";
			$row++;
			for ($c=0; $c < $num; $c++) {
				echo $data[$c] . "<br />\n";
			}
		}
		fclose($handle);
	}
	
	$mpn = htmlspecialchars($_GET["id"]);
	$handle = fopen("data/data.csv", "r");
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
		if ($mpn == rtrim($data[0]))
		echo '<a href="' . $data[19] . '" target="_blank">' . rtrim($data[3]) . '</a>' . ' - ' . $data[15];
	else
		$row++;
	}
	fclose($handle);
	
	//header("Location: index.html?id=1");
	die();
?>