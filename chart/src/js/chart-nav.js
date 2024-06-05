const imgMap = document.querySelector('.img-map');
const map = document.querySelector('#map');
const changeDialog = document.querySelector('#change_dialog');
const inputTempBtn = changeDialog.querySelector('.temp-txt');
const saveBtn = changeDialog.querySelector('.save-btn');
const illnessBtn = changeDialog.querySelector('.illness-btn');
const blankBtn = changeDialog.querySelector('.nodata-btn');
const retryBtn = changeDialog.querySelector('.back-btn');

let selInd = -1;

const setImage = () => {

    //fetching image from image.php
    const params = location.search.length > 0 ? "&" + location.search.replace("?", "") : "";
    console.log('src/php/image.php?type=image' + params);

    fetch('src/php/image.php?type=image' + params)
        .then(res => res.blob())
        .then(blob => imgMap.src = URL.createObjectURL(blob))


    //resolving json data also image.php
    fetch('src/php/image.php?type=json' + params)
        .then(res => res.json())
        .then(snap => {
            //console.log("dots", snap);
            const dots = snap.dots;
            map.innerHTML = "";

            //,,pasting" areas on the dots
            dots.forEach((dot, ind) => {
                const area = document.createElement('area');
                area.shape = "circle";
                area.coords = `${dot[0]},${dot[1]},10`;
                //console.log(area.coords);

                area.onclick = () => {
                    inputTempBtn.value = dot[2];
                    selInd = ind;
                    changeDialog.showModal();
                }

                map.appendChild(area);
            })
        })
}

const close = () => changeDialog.close();
const update = (day, value, illness) => {

    let _value = parseFloat(value);

    if(_value != 0){
        if(_value > 37.2)_value = 37.2
        else if(_value < 36) _value = 36;
    }


    close();



    let formData = new FormData();
    formData.append('day', `${day + 1}`);
    formData.append('value', `${_value}`);
    formData.append('illness', `${illness}`);

    fetch('src/php/update.php', {method: "POST", body: formData})
        .then(res => res.json())
        .then(snap => {
            console.log(snap);
            setImage();
        })
}
retryBtn.onclick = close;
saveBtn.onclick = () => update(selInd, inputTempBtn.value, 0);
illnessBtn.onclick = () => update(selInd, 0, 1);
blankBtn.onclick = () => update(selInd, 0, 0);

setImage();