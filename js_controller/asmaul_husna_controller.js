$(document).ready(function() {
    
    $.ajax({
        url: 'api/api.php?endpoint=asmaul_husna',
        method: 'GET',
        success: function(response) {
            
            const datas = response.data;
            let html_content = '';
        
            datas.forEach(data => {
                html_content += `
                    <div class="border border-pink-900 bg-white p-4 rounded-lg shadow-md text-center">
                        <p class="mb-2 text-xl">${ data.arabic }</p>
                        <p class="text-slate-800 text-lg font-bold mb-1">
                            ${ data.latin }
                        </p>
                        <p>${ data.translation_id }</p>
                    </div>
                `;

                return;
            });

            $('#asmaul_husna_container').html(html_content);
        },
        error: function(xhr) {
            console.error(xhr.responseText);
        }
    });


});