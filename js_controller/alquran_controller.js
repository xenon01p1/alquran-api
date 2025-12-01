$(document).ready(function() {
    
    $.ajax({
        url: 'api/api.php?endpoint=daftar_surah',
        method: 'GET',
        success: function(response) {

            const datas = response.data;
            let html_content = '';
        
            datas.forEach(data => {
                html_content += `
                    <a href="surah.html?number=${ data.number }" >
                        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border hover:bg-purple-50 transition-colors duration-200 cursor-pointer">

                            <div class="flex items-center">
                                <div class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-lg text-pink-900 font-semibold">
                                ${ data.number }
                                </div>
                                <div class="ml-4">
                                <h2 class="text-lg font-semibold text-pink-900">${ data.name.transliteration.id }</h2>
                                <p class="text-gray-500">${ data.name.translation.id }</p>
                                </div>
                            </div>

                            <div class="text-right">
                                <p class="text-xl font-arabic text-pink-900">${ data.name.short }</p>
                                <p class="text-gray-500 text-sm">${ data.numberOfVerses } Ayat</p>
                            </div>
                        </div>
                    </a>
                `;

                return;
            });

            $('#alquran_container').html(html_content);
        },
        error: function(xhr) {
            console.error(xhr.responseText);
        }
    });


});