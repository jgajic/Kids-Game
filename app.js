function loadNewAnimal(animalsData, languageType, animalIndex) {
    let animalData = animalsData[languageType][animalIndex];

    $('.js-slika').attr('src', animalData.imageUrl);
    $('.js-slika-text').text(animalData.name);
    let animalLetters = '';
    for (let i = 0; i < animalData.name.length; i++) {
        let waviyIndex = i + 1;
        animalLetters +=
            '<div class="word js-animal" style="--i:' + waviyIndex + '"></div>';
    }
    $('.js-animal-letters').html(animalLetters);
}

function differentLetters(languageType) {
    let letters = cirilica;
    if (languageType == 'cirilica') {
        letters = cirilica;
    } else {
        letters = alfabet;
    }

    let letter = '';
    let allLetters = $('.slovo');
    for (let i = 0; i < allLetters.length; i++) {
        if (letters[i]) {
            letter = letters[i];
        } else {
            letter = '';
        }
        allLetters.eq(i).text(letter);
    }
}

$(document).ready(function () {
    var currentAnimalIndex = 0;
    var languageType = 'cirilica';

    loadNewAnimal(animalsData, languageType, currentAnimalIndex);

    $('.js-letter').click(function () {
        var text = $(this).html();
        var letterCell = $('.js-animal');
        var slikaText = $('.js-slika-text').html();

        for (let i = 0; i < letterCell.length; i++) {
            if (letterCell.eq(i).html() == '') {
                letterCell.eq(i).html(text);
                if (letterCell.eq(i).html() == slikaText[i]) {
                    letterCell.eq(i).css('background-color', '#00FF00');
                } else {
                    letterCell.eq(i).css('background-color', 'red');
                }
                break;
            }
        }

        let correctLetters = 0;

        for (let i = 0; i < letterCell.length; i++) {
            if (letterCell.eq(i).text() == slikaText[i]) {
                correctLetters++;
            }
        }
        if (correctLetters == slikaText.length) {
            console.log('ucitaj novu zivotinju');
            letterCell.addClass('waviy');

            setTimeout(function () {
                currentAnimalIndex++;

                if (currentAnimalIndex == animalsData[languageType].length) {
                    currentAnimalIndex = 0;
                }
                letterCell.removeClass('waviy');
                loadNewAnimal(animalsData, languageType, currentAnimalIndex);
            }, 3000);
        }
    });

    $('.js-animal-letters').on('click', '.js-animal', function () {
        $(this).text('').css('background-color', 'white');
    });

    $('.js-language').on('click', function () {
        $('.js-language').removeClass('button-active');
        $(this).addClass('button-active');
        languageType = $(this).attr('data-type');
        currentAnimalIndex = 0;
        differentLetters(languageType);
        loadNewAnimal(animalsData, languageType, currentAnimalIndex);
    });
});