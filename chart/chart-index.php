<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="src/styles/dialogs.css">
</head>

<body>
    <script src="src/js/chart-nav.js?jhfjfjfj" defer></script>

    <img src="#" alt="urChart" usemap="#workmap" class="img-map" />
    <map name="workmap" id="map"></map>
    <dialog id="change_dialog" class="change-dialog">
        <div class="change-dialog-cont">
            <input type="number" class="temp-txt" step="0.01" pattern="[0-9]+([.]{1}[0-9]+)*">
            <button class="save-btn">Zapisz temperature</button>
            <button class="illness-btn">Choroba</button>
            <button class="nodata-btn">Brak pomiaru</button>
            <button class="back-btn">Anuluj</button>
        </div>
    </dialog>
</body>

</html>