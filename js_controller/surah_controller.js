function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

$(document).ready(function() {
    const number = getParam('number');
    
    $.ajax({
        url: `api/api.php?endpoint=get_surah&number=${ number }`,
        method: 'GET',
        success: function(response) {
            const datas = response.data;
            const recitations = datas.recitations;
            const verses = datas.verses;
            let html_content = '';
            console.log(datas);

            $('#surah_title').text(datas.name.transliteration.id);
            $('#surah_arabic').text(datas.name.long);
            $('#surah_translation').text(datas.name.translation.id);
            $('#number_of_surah').text(datas.number);
            $('#number_of_ayat').text(datas.numberOfVerses);
            $('#surah_type').text(datas.revelation.id);
            $('#surahAudio')[0].src = recitations[0]['audio_url'];

            console.log(recitations[0]['audio_url']);
        
            verses.forEach((verse, index) => {
                
                html_content += `
                    <div class="flex items-start gap-4">
                        <!-- Play Button -->
                        <!-- <img src="src/img/play_icon_grey.png" class="w-8 h-8 mt-2 cursor-pointer" alt="Play Ayah">  -->

                        <!-- Ayah Content -->
                        <div class="text-right flex-1 cursor-pointer group" onclick="toggleTafsir(this)">
                            <p class="text-sm text-slate-500 mb-1">Ayat ${ verse.number.inSurah }</p>
                            <p class="text-3xl mb-2 transition-all duration-200 group-hover:text-pink-800">
                                ${ verse.text.arab }
                            </p>
                            <p class="text-slate-700 italic text-right mb-2">
                                ${ verse.text.transliteration.en }
                            </p>
                            <p class="text-slate-700 text-right mb-2">
                                ${ verse.translation.id }
                            </p>

                            <!-- Tafsir section (hidden by default) -->
                            <div class="tafsir mt-3 hidden bg-slate-50 border border-slate-200 p-4 rounded-lg text-left">
                                <p class="text-sm text-slate-600">
                                <span class="font-bold">Tafsir </span>: ${ verse.tafsir.id.long }
                                </p>
                            </div>
                        </div>
                    </div>
                `;

                return;
            });

            $('#surah_container').html(html_content);
        },
        error: function(xhr) {
            console.error(xhr.responseText);
        }
    });


});