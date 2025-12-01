$(document).ready(function() {
    
    $.ajax({
        url: 'api/api.php?endpoint=bacaan_solat',
        method: 'GET',
        success: function(response) {

            const datas = response.data;
            let html_content = '';
        
            datas.forEach(data => {
                html_content += `
                    <div class="border border-pink-900 bg-white p-4 rounded-lg shadow-md text-center mb-6">
                        <p class="text-slate-800 text-lg font-bold mb-2">
                            ${ data.name }
                        </p>
                        <p class="mb-4 text-2xl">${ data.arabic }</p>
                        <p class="mb-4 text-slate-700 italic">${ data.latin }</p>
                        <p class="text-slate-700">${ data.terjemahan }</p>
                    </div>
                `;

                return;
            });

            $('#bacaan_salat_container').html(html_content);
        },
        error: function(xhr) {
            console.error(xhr.responseText);
        }
    });


});