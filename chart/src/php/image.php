<?php
$conn = new mysqli("localhost", "root", "", "charts");
$result = mysqli_query($conn, "SELECT * FROM chart_vals");

$dataVer = [37.2, 37, 36.8, 36.6, 36.4, 36.2, 36];

$data = [];

while ($row = $result->fetch_assoc()) {
    array_push($data, $row);
}
$amount = count($data);

//width 1000
//height 400
//margin 60
//text-margin 10
$chartSizing = [
    "w" => $_GET['width'],
    "h" => $_GET['height'],
    "m" => 60,
    "tm" => 10
];


foreach ($chartSizing as $key => $value) {
    if (isset($_GET[$key])) {
        $chartSizing[$key] = intval($_GET[$key]);
    }
}

// Tab values
$chartWidth = $chartSizing["w"];
$chartHeight = $chartSizing["h"];
$margin = $chartSizing["m"];
$textMargin = $chartSizing["tm"];


//new image
$image = imagecreatetruecolor($chartWidth, $chartHeight);


//setting colours
$white = imagecolorallocate($image, 255, 255, 255);
$black = imagecolorallocate($image, 0, 0, 0);
//dots:
$grey = imagecolorallocate($image, 70, 70, 70);
$red = imagecolorallocate($image, 255, 0, 0);
$blue = imagecolorallocate($image, 0, 0, 255);


//setting background
imagefilledrectangle($image, 0, 0, $chartWidth, $chartHeight, $white);


//adding left and bottom text
imagestringup($image, 8, $textMargin, ($chartHeight / 2) + 50, "temperatura", $black);
imagestring($image, 8, $chartWidth / 2.5, $chartHeight - $textMargin * 2, "dzien miesiaca", $black);


//getting placing & sizing data
$chartPlace = [$margin, $margin, $chartWidth - $margin, $chartHeight - $margin];
$chartSize = [$chartPlace[2] - $chartPlace[0], $chartPlace[3] - $chartPlace[1]];
//get ,,cell"
$areaSize = [floor($chartSize[0] / $amount), floor($chartSize[1] / count($dataVer))];


//chart border (left & bottom)
imageline($image, $chartPlace[0], $chartPlace[1], $chartPlace[0], $chartPlace[3], $black);
imageline($image, $chartPlace[0], $chartPlace[3], $chartPlace[2], $chartPlace[3], $black);


//sub data for generating dashed lines
$xCheck = $chartPlace[0] + $areaSize[0];
$yCheck = $chartPlace[1] + $areaSize[1];

//generating dashed lines
$i = 0;
while ($xCheck <= $chartPlace[2] && isset($data[$i])) {
    //dashed lines
    imagesetstyle($image, [$grey, $grey, $grey, $grey, $white, $white, $white, $white]);
    imageline($image, $xCheck, $chartPlace[1], $xCheck, $chartPlace[3], IMG_COLOR_STYLED);
    //numbers on the bottom
    imagestring($image, 2, $xCheck - 5, $chartPlace[3] + 10, $data[$i]["day"], $black);
    $xCheck += $areaSize[0];
    $i += 1;
}




$i = 0;

while ($yCheck <= $chartPlace[3]) {
    if ($yCheck != $chartPlace[3]) {
        imagesetstyle($image, [$grey, $grey, $grey, $grey, $white, $white, $white, $white]);
        imageline($image, $chartPlace[0], $yCheck, $chartPlace[2], $yCheck, IMG_COLOR_STYLED);
    }

    imagestring($image, 2, $chartPlace[0] - 30, $yCheck - 6, $dataVer[$i], $black);
    $yCheck += $areaSize[1];
    $i += 1;
}



//generating dots (visualization based on the data from db)
$last = NULL;
$x = $chartPlace[0] + $areaSize[0];

$dots = [];

for ($i = 0; $i < $amount; $i++) {
    if ($data[$i]["value"] == 0) {
        imagefilledellipse($image, $x, $chartPlace[3], 7, 7, $data[$i]["illness"] == 1 ? $red : $grey);
        array_push($dots, [$x, $chartPlace[3], $data[$i]["value"]]);
        $last = NULL;
        $x += $areaSize[0];
        continue;
    }

    $y = $chartPlace[1] + floor(($dataVer[0] - ($data[$i]["value"] - 0.2)) / 0.2 * $areaSize[1]);
    imagefilledellipse($image, $x, $y, 7, 7, $blue);

    if ($last != NULL) imageline($image, $last[0], $last[1], $x, $y, $blue);

    $last = [$x, $y];
    array_push($dots, [$x, $y, $data[$i]["value"]]);
    $x += $areaSize[0];
}

//data for chart-nav.js (dif values basing on requested type)
if (isset($_GET['type'])) {

    if ($_GET['type'] == 'image') {
        header('Content-type: image/png');
        imagepng($image);
        imagedestroy($image);
    } else if ($_GET['type'] == 'json') {
        header('Content-type: application/json');
        echo json_encode(["dots" => $dots]);
    }
}
