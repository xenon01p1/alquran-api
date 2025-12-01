$(document).ready(function() { 
    const date = getFormattedDate();
    const currentDate = new Date();
    const tahun = currentDate.getFullYear();
    const bulan = currentDate.getMonth() + 1;

    request_display_daily_schedule (1632, date);
    request_display_monthly_schedule (1632, tahun, bulan);
    
    // GET LIST KOTA
    $('#kota').on('input', function() {
        
        let kota = $(this).val();
        console.log(kota.length);

        if (kota.length > 2) {
            $.ajax({
                url: `https://api.myquran.com/v2/sholat/kota/cari/${ kota }`,
                method: 'GET',
                success: function(response) { 
                    let status = response.status;
                    let datas = response.data;

                    if (status) {
                        let html_content = ``;

                        datas.forEach(data => {
                            html_content += `<li class="px-6 py-4 hover:bg-gray-100 cursor-pointer location" data-id-lokasi="${ data.id }">${ data.lokasi }</li>`;
                        });

                        $('#list-location').html(`
                            <div class="w-full max-w-xl bg-white rounded-lg mx-auto shadow mb-10">
                                <ul class="divide-y divide-gray-200">
                                
                                ${ html_content }

                                </ul>
                            </div>
                        `);
                    }
                    
                
                },
                error: function(xhr) {
                    console.error(xhr.responseText);
                }
            });
        }
    });
    
    
    // GET SALAT SCHEDULE
    $(document).on('click', '.location', function() {
        const id_lokasi = $(this).data('id-lokasi');
        request_display_daily_schedule (id_lokasi, date);
        request_display_monthly_schedule (id_lokasi, tahun, bulan);
    });



    function getFormattedDate(date = new Date()) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');    

        return `${year}-${month}-${day}`;
    }


    function request_display_daily_schedule (kota, date) {
        $.ajax({
            url: `https://api.myquran.com/v2/sholat/jadwal/${ kota }/${ date }/`,
            method: 'GET',
            success: function(response) { 
                let status = response.status;
                let datas = response.data;
                let schedules = datas.jadwal;

                console.log(response);

                if (status) {
                    $('#list-location').html(''); // reset list location

                    $('#daily_title').text(`Jadwal Sholat Harian - ${ datas.lokasi }`);
                    $('#imsak_time').html(schedules.imsak);
                    $('#subuh_time').html(schedules.subuh);
                    $('#zuhur_time').html(schedules.dzuhur);
                    $('#asar_time').html(schedules.ashar);
                    $('#maghrib_time').html(schedules.maghrib);
                    $('#isya_time').html(schedules.isya);
                }
                    
                
            },
            error: function(xhr) {
                console.error(xhr.responseText);
            }
        });
    }


    function request_display_monthly_schedule (kota, tahun, bulan) {
        $.ajax({
            url: `https://api.myquran.com/v2/sholat/jadwal/${ kota }/${ tahun }/${ bulan }`,
            method: 'GET',
            success: function(response) { 
                let status = response.status;
                let datas = response.data;
                let schedules = datas.jadwal;
                let html_content = ``;

                console.log(response);

                if (status) {
                    $('#monthly_title').text(`Jadwal Sholat - ${ datas.lokasi }`);

                    schedules.forEach(schedule => {
                        html_content += `
                            <tr class="border-t">
                                <td class="px-4 py-2">${ schedule.tanggal }</td>
                                <td class="px-4 py-2">${ schedule.imsak }</td>
                                <td class="px-4 py-2">${ schedule.subuh }</td>
                                <td class="px-4 py-2">${ schedule.dzuhur }</td>
                                <td class="px-4 py-2">${ schedule.ashar }</td>
                                <td class="px-4 py-2">${ schedule.maghrib }</td>
                                <td class="px-4 py-2">${ schedule.isya }</td>
                            </tr>
                        `;
                    });

                    $('#container_monthly_schedule').html(html_content);
                }
                    
                
            },
            error: function(xhr) {
                console.error(xhr.responseText);
            }
        });
    }

});

