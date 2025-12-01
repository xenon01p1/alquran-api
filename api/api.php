<?php
header('Content-Type: application/json');

function request_get_tp_api($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    return json_decode($response, true);
}

function simpleApiResponse($status, $message, $data) {
    return json_encode([
        'status' => $status,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

// Get endpoint and optional id
$endpoint = $_GET['endpoint'] ?? '';
$id = $_GET['id'] ?? null;

// Base path for your JSON files
$dataPath = dirname(__DIR__) . '/data';

switch ($endpoint) {
    // ==================== Daftar Surah Al-Quran ====================
    case 'daftar_surah':
        $alquran = file_get_contents("$dataPath/quran.json");
        $parsed_quran = json_decode($alquran, true);
        $datas = $parsed_quran['data'];
        $daftar_surah =  [];

        foreach ($datas as $data) {
            $daftar_surah[] = [
                'number' => $data['number'],
                'sequence' => $data['sequence'],
                'numberOfVerses' => $data['numberOfVerses'],
                'name' => $data['name'],
                'revelation' => $data['revelation'],
                'tafsir' => $data['tafsir'],
                'preBismillah' => $data['preBismillah'],
            ];
        }

        echo json_encode([
            "status" => true,
            "message" => "Berhasil mendapatkan data",
            "data" => $daftar_surah
        ]);
        break;

    // ==================== Daftar Ayat ====================
    case 'get_surah':
        if (!isset($_GET['number']) || $_GET['number'] === '') { // Use isset and check for empty string
            echo json_encode([
                'status' => false,
                'message' => 'Tidak ada parameter GET "number"'
            ]);
            exit;
        }

        $number = $_GET['number'];
        $alquran = file_get_contents("$dataPath/quran.json");
        $other_quran = file_get_contents("$dataPath/surah/$number.json");

        // --- IMPORTANT: Add error checking for file_get_contents ---
        if ($alquran === false) {
            header('Content-Type: application/json'); // Ensure header is set for error response
            echo json_encode([
                'status' => false,
                'message' => 'Failed to read quran.json file.'
            ]);
            exit;
        }

        $parsed_quran = json_decode($alquran, true);
        $parsed_other_quran = json_decode($other_quran, true);

        // --- IMPORTANT: Add error checking for json_decode ---
        if (json_last_error() !== JSON_ERROR_NONE) {
            header('Content-Type: application/json'); // Ensure header is set for error response
            echo json_encode([
                'status' => false,
                'message' => 'Error decoding JSON from quran.json: ' . json_last_error_msg()
            ]);
            exit;
        }

        // Ensure 'data' key exists
        if (!isset($parsed_quran['data']) || !is_array($parsed_quran['data'])) {
            header('Content-Type: application/json');
            echo json_encode([
                'status' => false,
                'message' => 'Invalid JSON structure: "data" key not found or not an array.'
            ]);
            exit;
        }

        $datas = $parsed_quran['data'];
        $found_data = null; 

        foreach ($datas as $data) {
            if (isset($data['number']) && $data['number'] == $number) {
                $found_data = [
                    'recitations' => $parsed_other_quran['recitations'],
                    'number' => $data['number'],
                    'sequence' => $data['sequence'],
                    'numberOfVerses' => $data['numberOfVerses'],
                    'name' => $data['name'],
                    'revelation' => $data['revelation'],
                    'tafsir' => $data['tafsir'],
                    'preBismillah' => $data['preBismillah'],
                    'verses' => $data['verses'],
                ];
                break; 
            }
        }

        if ($found_data) {
            echo json_encode([
                'status' => true,
                'message' => 'Surah found',
                'data' => $found_data
            ]);
        } else {
            echo json_encode([
                'status' => false,
                'message' => 'Surah not found for the given number.'
            ]);
        }
        exit;

    // ==================== Asmaul Husna ====================
    case 'asmaul_husna':
        $json = file_get_contents("$dataPath/asmaul_husna.json");
        $data = json_decode($json, true);

        // If the JSON file itself already contains a top-level 'data' key, extract it:
        if (isset($data['data'])) {
            echo simpleApiResponse(true, 'success', $data['data']);
        } else {
            echo simpleApiResponse(true, 'success', $data);
        }
        
        break;

    // ==================== Doa Harian ====================
    case 'doa_harian':
        $json = file_get_contents("$dataPath/doa_harian.json");
        $data = json_decode($json, true);
        
        if (isset($data['data'])) {
            echo simpleApiResponse(true, 'success', $data['data']);
        } else {
            echo simpleApiResponse(true, 'success', $data);
        }
        
        break;

    // ==================== Niat Solat ====================
    case 'niat_solat':
        $json = file_get_contents("$dataPath/niat_solat.json");
        $data = json_decode($json, true);
        
        if (isset($data['data'])) {
            echo simpleApiResponse(true, 'success', $data['data']);
        } else {
            echo simpleApiResponse(true, 'success', $data);
        }
        
        break;

    // ==================== Bacaan Sholat ====================
    case 'bacaan_solat':
        $json = file_get_contents("$dataPath/bacaan_solat.json");
        $data = json_decode($json, true);
        
        if (isset($data['data'])) {
            echo simpleApiResponse(true, 'success', $data['data']);
        } else {
            echo simpleApiResponse(true, 'success', $data);
        }
        
        break;

    // ==================== Tahlil ====================
    case 'tahlil':
        $json = file_get_contents("$dataPath/tahlil.json");
        $data = json_decode($json, true);
        
        if (isset($data['data'])) {
            echo simpleApiResponse(true, 'success', $data['data']);
        } else {
            echo simpleApiResponse(true, 'success', $data);
        }
        
        break;
    // ==================== Pencarian Kota ====================
    case 'pencarian_kota':
        $kota = $_GET['kota'] ?? '';

        if (!isset($_GET['kota']) || $_GET['kota'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'kota'"
            ]);
            exit;
        }

        $result = request_get_tp_api("https://api.myquran.com/v2/sholat/kota/cari/" . $kota);
        echo json_encode([
            "status" => true,
            "message" => "Data berhasil diambil",
            "data" => $result
        ]);
        break;

    // ==================== Jadwal Sholat Harian ====================
    case 'jadwal_harian':
        $kota = $_GET['kota'] ?? '';
        $date = $_GET['date'] ?? '';

        if (!isset($_GET['kota']) || $_GET['kota'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'kota'"
            ]);
            exit;
        }

        if (!isset($_GET['date']) || $_GET['date'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'date'"
            ]);
            exit;
        }

        $result = request_get_tp_api("https://api.myquran.com/v2/sholat/jadwal/$kota/$date");
        echo json_encode([
            "status" => true,
            "message" => "Data berhasil diambil",
            "data" => $result
        ]);
        break;

    // ==================== Jadwal Sholat Bulanan  ====================
    case 'jadwal_bulanan':
        $kota = $_GET['kota'] ?? '';
        $tahun = $_GET['tahun'] ?? '';
        $bulan = $_GET['bulan'] ?? '';

        if (!isset($_GET['kota']) || $_GET['kota'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'kota'"
            ]);
            exit;
        }

        if (!isset($_GET['tahun']) || $_GET['tahun'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'tahun'"
            ]);
            exit;
        }

        if (!isset($_GET['bulan']) || $_GET['bulan'] === '') {
            echo json_encode([
                "status" => false,
                "message" => "Tidak ada parameter GET 'bulan'"
            ]);
            exit;
        }

        $result = request_get_tp_api("https://api.myquran.com/v2/sholat/jadwal/$kota/$tahun/$bulan");
        echo json_encode([
            "status" => true,
            "message" => "Data berhasil diambil",
            "data" => $result
        ]);
        break;

    // ==================== Not Found ====================
    default:
        http_response_code(404);
        echo json_encode(["error" => "Endpoint not found"]);
        break;
}
